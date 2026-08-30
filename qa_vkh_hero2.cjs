const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const SITE = path.join(__dirname, "site");
const PORT = 4175;
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".woff2": "font/woff2", ".png": "image/png", ".avif": "image/avif", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp" };

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
  page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 250)));
  await page.setViewport({ width: 1920, height: 1080 });

  // capture preloader visible right after navigation commit
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "domcontentloaded" });
  const preEarly = await page.evaluate(() => {
    const el = document.getElementById("vkh_preloader");
    return el ? getComputedStyle(el).visibility + "/z" + getComputedStyle(el).zIndex : "MISSING";
  });
  console.log("preloader early:", preEarly);

  await page.waitForFunction(() => document.body.classList.contains("vkh-boot-done"), { timeout: 8000 })
    .then(() => console.log("OK: boot-done class set"))
    .catch(() => console.log("WARN: boot-done never set"));
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: "qa2_desktop_idle.png" });

  // state checks
  const state = await page.evaluate(() => {
    const hero = document.querySelector(".vkh_hero");
    const meshCanvas = document.querySelector("[data-hero-canvas]");
    const tag = document.querySelector(".vkh_nav_tagline");
    const logo = document.querySelector(".navbar_home_svg");
    const para2 = document.querySelector(".vkh_hero_para2");
    const r = (el) => el ? el.getBoundingClientRect() : null;
    return {
      bootDone: document.body.classList.contains("vkh-boot-done"),
      preloaderGone: !document.getElementById("vkh_preloader"),
      navInHero: document.body.classList.contains("vkh-nav-inhero"),
      logoOpacity: getComputedStyle(logo).opacity,
      taglineOpacity: tag ? getComputedStyle(tag).opacity : "missing",
      meshCanvas: meshCanvas ? meshCanvas.width + "x" + meshCanvas.height : "MISSING",
      heroImg: !!document.querySelector(".hero_home_img"),
      para2: para2 ? para2.innerText.slice(0, 30) : "MISSING",
      para2Lines: para2 ? Math.round(para2.getBoundingClientRect().height / parseFloat(getComputedStyle(para2).lineHeight)) : 0,
      webglReady: hero.classList.contains("vkh_webgl_ready"),
      scrollTextGone: !document.querySelector(".vkh_hero_scrolltext"),
      debug: window.__vkhDebug ? window.__vkhDebug().ready : "no hook"
    };
  });
  console.log("STATE:", JSON.stringify(state, null, 1));

  // effect sweep
  for (let i = 0; i <= 30; i++) {
    await page.mouse.move(300 + i * 45, 540 - Math.sin(i / 3) * 130);
    await new Promise((r) => setTimeout(r, 12));
  }
  await page.screenshot({ path: "qa2_desktop_motion.png" });

  // scroll away: nav swap back + RAF pause
  await page.evaluate(() => window.scrollTo(0, innerHeight * 1.2));
  await new Promise((r) => setTimeout(r, 900));
  const scrolled = await page.evaluate(() => ({
    navInHero: document.body.classList.contains("vkh-nav-inhero"),
    logoOpacity: getComputedStyle(document.querySelector(".navbar_home_svg")).opacity,
    inView: window.__vkhDebug ? window.__vkhDebug().inView : "?"
  }));
  console.log("SCROLLED:", JSON.stringify(scrolled));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 700));
  const backTop = await page.evaluate(() => ({
    navInHero: document.body.classList.contains("vkh-nav-inhero"),
    taglineOpacity: getComputedStyle(document.querySelector(".vkh_nav_tagline")).opacity
  }));
  console.log("BACK TO TOP:", JSON.stringify(backTop));

  // mobile
  const m = await browser.newPage();
  await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await m.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "domcontentloaded" });
  await m.waitForFunction(() => document.body.classList.contains("vkh-boot-done"), { timeout: 8000 }).catch(() => console.log("mobile boot warn"));
  await new Promise((r) => setTimeout(r, 1100));
  await m.screenshot({ path: "qa2_mobile.png" });

  await browser.close();
  server.close();
  console.log("QA2 done");
})().catch((e) => { console.error(e); process.exit(1); });
