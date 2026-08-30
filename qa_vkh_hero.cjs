const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const SITE = path.join(__dirname, "site");
const PORT = 4173;
const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "application/javascript",
  ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg",
  ".svg": "image/svg+xml", ".avif": "image/avif", ".webp": "image/webp",
  ".webm": "video/webm", ".mp4": "video/mp4", ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(SITE, p);
  if (!file.startsWith(SITE) || !fs.existsSync(file)) {
    res.writeHead(404); res.end("nf"); return;
  }
  res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--use-gl=angle", "--enable-unsafe-swiftshader", "--window-size=1920,1080"]
  });
  const page = await browser.newPage();
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") console.log("[console]", m.type(), m.text().slice(0, 200)); });
  page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 300)));

  // Desktop
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "networkidle2", timeout: 60000 });

  try {
    await page.waitForSelector(".vkh_webgl_ready", { timeout: 10000 });
    console.log("OK: webgl canvas is ready");
  } catch {
    console.log("WARN: vkh_webgl_ready never appeared");
  }
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: "qa_vkh_desktop_idle.png" });

  // Sweep mouse across the wordmark to build flowmap
  for (let i = 0; i <= 30; i++) {
    await page.mouse.move(400 + i * 38, 560 - Math.sin(i / 3) * 120);
    await new Promise((r) => setTimeout(r, 12));
  }
  await page.screenshot({ path: "qa_vkh_desktop_motion.png" });
  await new Promise((r) => setTimeout(r, 150));
  await page.screenshot({ path: "qa_vkh_desktop_afterglow.png" });

  // Scroll indicator visible?
  const bottom = await page.$eval(".vkh_hero_bottom", (el) => el.innerText.trim()).catch(() => "MISSING");
  console.log("bottom row text:", JSON.stringify(bottom));

  // Barba round-trip: leave home, come back, verify re-init
  await page.evaluate(() => {
    const l = [...document.querySelectorAll("a")].find((a) => /work\.html/.test(a.href));
    if (l) l.click();
  });
  await new Promise((r) => setTimeout(r, 3500));
  await page.evaluate(() => {
    const l = [...document.querySelectorAll("a")].find((a) => a.getAttribute("href") === "/");
    if (l) l.click();
  });
  await new Promise((r) => setTimeout(r, 3500));
  const rebound = await page.evaluate(() => {
    const s = document.querySelector(".vkh_hero");
    return { exists: !!s, bound: !!(s && s.hasAttribute("data-vkh-bound")), ready: !!(s && s.classList.contains("vkh_webgl_ready")) };
  });
  console.log("barba return-to-home:", JSON.stringify(rebound));
  await page.screenshot({ path: "qa_vkh_desktop_return.png" });

  // Mobile
  const m = await browser.newPage();
  m.on("pageerror", (e) => console.log("[mobile pageerror]", String(e).slice(0, 300)));
  await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await m.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "networkidle2", timeout: 60000 });
  try { await m.waitForSelector(".vkh_webgl_ready", { timeout: 10000 }); } catch { console.log("WARN mobile: no webgl ready"); }
  await new Promise((r) => setTimeout(r, 1000));
  await m.screenshot({ path: "qa_vkh_mobile.png" });

  await browser.close();
  server.close();
  console.log("QA done");
})().catch((e) => { console.error(e); process.exit(1); });
