const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const SITE = path.join(process.cwd(), "site");
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(SITE, p);
  if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200); fs.createReadStream(f).pipe(res);
});

(async () => {
  await new Promise((r) => srv.listen(4183, r));
  const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 1920, height: 1080 });
  await pg.goto("http://localhost:4183/index.html", { waitUntil: "networkidle2", timeout: 60000 });
  await pg.waitForSelector(".vkh_nav_tagline").catch(() => {});
  const out = await pg.evaluate(() => {
    const results = [];
    for (const w of [30, 31, 32, 33]) {
      const t = document.querySelector(".vkh_nav_tagline");
      const p = document.querySelector(".vkh_hero_para2");
      t.style.maxWidth = w + "ch"; p.style.maxWidth = w + "ch";
      const probe = (el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter((x) => x.width > 4);
        const tops = [];
        rects.forEach((r) => { if (!tops.some((tp) => Math.abs(tp - r.top) < 4)) tops.push(r.top); });
        const lastTop = Math.max(...tops);
        const lastW = Math.max(...rects.filter((r) => Math.abs(r.top - lastTop) < 4).map((r) => r.width));
        const elW = el.getBoundingClientRect().width;
        return { lines: tops.length, lastLinePct: Math.round((lastW / elW) * 100) };
      };
      results.push({ ch: w, tagline: probe(t), para2: probe(p) });
    }
    return results;
  });
  console.log(JSON.stringify(out, null, 1));
  await b.close(); srv.close();
})().catch((e) => { console.error(e); process.exit(1); });
