const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const SITE = path.join(__dirname, "site");
const PORT = 4179;
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".woff2": "font/woff2", ".png": "image/png", ".avif": "image/avif" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(SITE, p);
  if (!fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--use-gl=angle", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "domcontentloaded" });
  // sample the counter every 100ms until boot done, record max value seen
  const maxCount = await page.evaluate(() => new Promise((resolve) => {
    let max = "00";
    const iv = setInterval(() => {
      const el = document.querySelector(".vkh_preloader_count");
      if (el) { const v = el.textContent; if (parseInt(v) > parseInt(max)) max = v; }
      else { clearInterval(iv); resolve("removed (max seen: " + max + ")"); }
    }, 60);
    setTimeout(() => { clearInterval(iv); resolve("timeout (max seen: " + max + ")"); }, 9000);
  }));
  console.log("counter result:", maxCount);
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
