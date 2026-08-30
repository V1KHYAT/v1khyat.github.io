const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const SITE = path.join(__dirname, "site");
const PORT = 4174;
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".woff2": "font/woff2", ".png": "image/png" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(SITE, p);
  if (!file.startsWith(SITE) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--use-gl=angle", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 300)));
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.waitForSelector(".vkh_webgl_ready", { timeout: 10000 }).catch(() => console.log("no ready"));
  await new Promise((r) => setTimeout(r, 800));

  // 1. Geometry audit
  const geo = await page.evaluate(() => {
    const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), cx: Math.round(b.x + b.width / 2), cy: Math.round(b.y + b.height / 2) }; };
    const canvas = document.querySelector(".vkh_canvas_distortion");
    return {
      viewport: { w: innerWidth, h: innerHeight, dpr: devicePixelRatio },
      section: r(document.querySelector(".vkh_hero")),
      contain: r(document.querySelector(".vkh_hero_contain")),
      webgl: r(document.querySelector(".vkh_hero_webgl")),
      canvas: r(canvas),
      canvasStyleW: canvas && canvas.style.width,
      classes: document.querySelector(".vkh_hero").className,
      fontCheck: document.fonts.check('400 100px "Animo"')
    };
  });
  console.log("GEO:", JSON.stringify(geo, null, 1));

  // 2. What element is on top at key points?
  const hits = await page.evaluate(() => {
    const pts = [[960, 540], [960, 300], [960, 1000], [400, 540], [1500, 540]];
    return pts.map(([x, y]) => { const el = document.elementFromPoint(x, y); return `${x},${y}: ` + (el ? el.className.toString().slice(0, 60) || el.tagName : "NONE"); });
  });
  console.log("HIT TEST:"); hits.forEach((h) => console.log("  " + h));

  // 3. Realistic mouse movement (normal human speed ~600px/s) + pixel diff
  await page.screenshot({ path: "qa_diag_before.png" });
  for (let i = 0; i <= 40; i++) {
    await page.mouse.move(500 + i * 22, 520 + Math.sin(i / 4) * 60);  // ~22px per 16ms tick ≈ 1400px/s
    await new Promise((r) => setTimeout(r, 16));
  }
  await page.screenshot({ path: "qa_diag_slowmove.png" });

  // 4. Debug state exposed?
  const dbg = await page.evaluate(() => (window.__vkhDebug ? JSON.stringify(window.__vkhDebug()) : "no debug hook"));
  console.log("DEBUG:", dbg);

  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
