const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const SITE = path.join(__dirname, "site");
const PORT = 4177;
const PAGES = ["index.html", "work.html", "play.html", "contact.html", "project-1.html", "project-2.html", "project-3.html"];
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".avif": "image/avif", ".webp": "image/webp", ".webm": "video/webm", ".mp4": "video/mp4", ".pdf": "application/pdf", ".gif": "image/gif" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(SITE, p);
  if (!file.startsWith(SITE) || !fs.existsSync(file)) { res.writeHead(404); res.end("nf"); return; }
  res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--use-gl=angle", "--enable-unsafe-swiftshader"] });

  for (const pagePath of PAGES) {
    const page = await browser.newPage();
    const report = { consoleErrors: [], pageErrors: [], failed: [], totalBytes: 0, requests: 0, largest: [] };
    page.on("console", (m) => { if (m.type() === "error") report.consoleErrors.push(m.text().slice(0, 120)); });
    page.on("pageerror", (e) => report.pageErrors.push(String(e).slice(0, 150)));
    page.on("response", async (resp) => {
      try {
        if (resp.status() >= 400) report.failed.push(resp.status() + " " + resp.url().split("/").pop().slice(0, 60));
        const len = parseInt(resp.headers()["content-length"] || "0", 10);
        report.totalBytes += len;
        if (len > 200000) report.largest.push(Math.round(len / 1024) + "KB " + resp.url().split("/").pop().slice(0, 70));
      } catch (e) {}
    });

    try {
      // block videos from actually downloading fully to keep audit fast; still count headers
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        report.requests++;
        if (/\.(mp4|webm)(\?|$)/.test(req.url()) && !req.url().includes("HISS")) {
          // abort large video transfer but record it
          const h = req.headers();
          req.respond({ status: 200, headers: { "content-length": h["range"] ? "1000000" : "100000" }, body: "" }).catch(() => req.abort().catch(() => {}));
        } else req.continue();
      });
      await page.goto(`http://localhost:${PORT}/${pagePath}`, { waitUntil: "networkidle2", timeout: 45000, timeout_1: 0 });
    } catch (e) { report.pageErrors.push("NAV: " + String(e).slice(0, 100)); }

    const dom = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll("img")];
      return {
        title: document.title.slice(0, 70),
        hasMetaDesc: !!document.querySelector('meta[name="description"]'),
        h1Count: document.querySelectorAll("h1").length,
        imgNoAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
        imgNoDims: imgs.filter((i) => !(i.hasAttribute("width") && i.hasAttribute("height")) && !i.style.width).length,
        imgCount: imgs.length,
        imgEager: imgs.filter((i) => i.loading === "eager").length,
        lazyOk: imgs.filter((i) => i.loading === "lazy").length,
        videos: [...document.querySelectorAll("video")].map((v) => ({ auto: v.hasAttribute("autoplay"), preload: v.getAttribute("preload"), src: (v.currentSrc || v.src || "").split("/").pop().slice(0, 40) })),
        bgVideos: [...document.querySelectorAll("[data-poster-url], [data-video-urls]")].length,
        fontPreload: performance.getEntriesByType("resource").filter((r) => r.name.includes("woff2")).length,
        docHeight: document.documentElement.scrollHeight
      };
    }).catch(() => null);

    console.log("\n======== " + pagePath + " ========");
    console.log(JSON.stringify({ ...report, ...dom }, null, 1));
    await page.close();
  }

  await browser.close();
  server.close();
  console.log("\nAUDIT COMPLETE");
})().catch((e) => { console.error(e); process.exit(1); });
