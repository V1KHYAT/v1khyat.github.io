const fs = require("fs");

const indexPath = "site/index.html";
let html = fs.readFileSync(indexPath, "utf8");

// ---- backup ----
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
fs.copyFileSync(indexPath, indexPath + ".bak-vkh2-" + stamp);

// ---- 1. Replace hero section ----
const heroStart = html.indexOf('<section data-theme-section="light" data-scroll-container="" class="hero_home_wrap vkh_hero">');
if (heroStart < 0) { console.error("FAIL: hero opener not found"); process.exit(1); }
const nextSection = html.indexOf('<section data-theme-section="light" data-stacking-cards-item="" class="gap_home_wrap">', heroStart);
if (nextSection < 0) { console.error("FAIL: gap section not found"); process.exit(1); }

const newHero = `<section data-animate="" data-theme-section="light" data-scroll-container="" data-target-translate="100" data-overlay-container="" class="hero_home_wrap vkh_hero">
          <div class="hero_home_gradient"></div>
          <div data-hero-canvas-container="" class="hero_home_cover">
            <div class="hero_home_fade"></div>
            <div data-overlay-scroll="" class="hero_home_overlay"></div>
            <img src="69d51282c6041349788c8177_Key%20Visual-2.avif" loading="eager" width="1967" height="1311" alt="" fetchpriority="high" data-translate-hero="true" class="hero_home_img" style="height: 130%;"><canvas data-hero-canvas="" class="hero_canvas_item"></canvas>
          </div>
          <div class="vkh_hero_contain">
            <div class="vkh_hero_top">
              <h1 class="vkh_hero_heading">I pair intelligent workflows with deep user research to architect precise digital products.</h1>
            </div>
            <div data-vkh-webgl="" class="vkh_hero_webgl">
              <div class="vkh_hero_wordmark">VIKHYATKAUSHIK</div>
              <canvas class="vkh_canvas_distortion"></canvas>
            </div>
            <div class="vkh_hero_sub">
              <p class="vkh_hero_para2">For modern teams who demand rapid product velocity without sacrificing core UX logic.</p>
            </div>
          </div>
        </section>
        `;

html = html.slice(0, heroStart) + newHero + html.slice(nextSection);
console.log("hero section replaced");

// ---- 2. Navbar tagline (insert after the Hindi logo link) ----
if (!html.includes("vkh_nav_tagline")) {
  const logoIdx = html.indexOf('id="navbar_logo_link"');
  if (logoIdx < 0) { console.error("FAIL: navbar logo not found"); process.exit(1); }
  const aEnd = html.indexOf("</a>", logoIdx);
  if (aEnd < 0) { console.error("FAIL: navbar logo closing tag not found"); process.exit(1); }
  const insertAt = aEnd + "</a>".length;
  const tagline = '<div class="vkh_nav_tagline" aria-hidden="true">I pair intelligent workflows with deep user research to architect precise digital products.</div>';
  html = html.slice(0, insertAt) + tagline + html.slice(insertAt);
  console.log("navbar tagline inserted");
}

// ---- 3. Preloader right after <body ...> ----
if (!html.includes("vkh_preloader")) {
  const bodyOpen = html.indexOf("<body");
  if (bodyOpen < 0) { console.error("FAIL: body tag not found"); process.exit(1); }
  const bodyTagEnd = html.indexOf(">", bodyOpen);
  const preloader = `
    <div class="vkh_preloader" id="vkh_preloader" aria-hidden="true">
      <div class="vkh_preloader_logo">विख्यात</div>
      <div class="vkh_preloader_line"><span></span></div>
      <div class="vkh_preloader_meta"><span class="vkh_preloader_name">VIKHYATKAUSHIK</span><span class="vkh_preloader_count">00</span></div>
    </div>`;
  html = html.slice(0, bodyTagEnd + 1) + preloader + html.slice(bodyTagEnd + 1);
  console.log("preloader inserted");
}

// ---- 4. Cache bumps ----
html = html.replace(/js\/vik-hero-distortion\.js\?v=[^"]+/, 'js/vik-hero-distortion.js?v=20260824d');
html = html.replace(/css\/styles\.css\?v=[^"]+/, 'css/styles.css?v=10');

fs.writeFileSync(indexPath, html);
console.log("index.html patched OK (v2)");
