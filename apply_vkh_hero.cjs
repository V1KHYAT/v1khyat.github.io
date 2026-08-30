const fs = require("fs");
const path = require("path");

const siteDir = path.join(__dirname, "site");
const indexPath = path.join(siteDir, "index.html");
const cssPath = path.join(siteDir, "css", "styles.css");

// ---- backup ----
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
fs.copyFileSync(indexPath, indexPath + ".bak-vkh-" + stamp);
fs.copyFileSync(cssPath, cssPath + ".bak-vkh-" + stamp);

let html = fs.readFileSync(indexPath, "utf8");

// ---- 1. Replace hero section ----
const heroStart = html.indexOf('<section data-animate="" data-theme-section="light" data-scroll-container="" data-target-translate="100" data-overlay-container="" class="hero_home_wrap">');
if (heroStart < 0) {
  console.error("FAIL: hero section opener not found");
  process.exit(1);
}
const nextSection = html.indexOf('<section data-theme-section="light" data-stacking-cards-item="" class="gap_home_wrap">', heroStart);
if (nextSection < 0) {
  console.error("FAIL: gap_home_wrap section after hero not found");
  process.exit(1);
}

const newHero = `<section data-theme-section="light" data-scroll-container="" class="hero_home_wrap vkh_hero">
          <div class="vkh_hero_contain">
            <div class="vkh_hero_top">
              <h1 class="vkh_hero_heading">I pair intelligent workflows with deep user research to architect precise digital products.</h1>
            </div>
            <div data-vkh-webgl="" class="vkh_hero_webgl">
              <div class="vkh_hero_wordmark">VIKHYATKAUSHIK</div>
              <canvas class="vkh_canvas_distortion"></canvas>
            </div>
            <div class="vkh_hero_bottom">
              <span class="vkh_hero_dot"></span>
              <span class="vkh_hero_scrolltext">Scroll to explore</span>
              <span class="vkh_hero_dot"></span>
            </div>
          </div>
        </section>
        `;

html = html.slice(0, heroStart) + newHero + html.slice(nextSection);

// ---- 2. Add script tag right after three.min.js ----
if (!html.includes("js/vik-hero-distortion.js")) {
  const threeTag = '<script src="js/three.min.js"></script>';
  if (!html.includes(threeTag)) {
    console.error("FAIL: three.min.js script tag not found");
    process.exit(1);
  }
  html = html.replace(
    threeTag,
    threeTag + '\n    <script src="js/vik-hero-distortion.js"></script>'
  );
}

fs.writeFileSync(indexPath, html);
console.log("index.html patched OK");

// ---- 3. Append scoped CSS ----
let css = fs.readFileSync(cssPath, "utf8");
if (!css.includes(".vkh_hero_contain")) {
  const cssBlock = `
/* ===== VIKHYATKAUSHIK hero - supersolid-style WebGL distortion wordmark ===== */
.vkh_hero{cursor:default}
.vkh_hero_contain{z-index:2;height:100%;flex-flow:column;justify-content:space-between;align-items:flex-start;display:flex;position:relative}
.vkh_hero_top{padding-top:calc(var(--site--margin)*1.25)}
.vkh_hero_heading{max-width:22ch;color:var(--swatch--black-400);font-family:var(--_typography---font--primary-family);font-size:clamp(1.25rem,.9rem + 1.75vw,2.125rem);line-height:1.15;font-weight:500;letter-spacing:-.01em}
.vkh_hero_webgl{z-index:1;width:100%;height:100%;justify-content:center;align-items:center;margin:auto;display:flex;position:absolute;inset:0%}
.vkh_canvas_distortion{z-index:2;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .9s ease}
.vkh_canvas_distortion.is-ready{opacity:1}
.vkh_hero_wordmark{font-family:Animo,Arial,sans-serif;font-weight:400;text-transform:uppercase;color:var(--swatch--black-400);font-size:clamp(2rem,10.5vw,10.5rem);line-height:1;white-space:nowrap;user-select:none}
.vkh_no_webgl .vkh_canvas_distortion{display:none}
.vkh_no_webgl .vkh_hero_wordmark{display:block}
.vkh_webgl_ready .vkh_hero_wordmark{display:none}
.vkh_hero_bottom{z-index:2;grid-column-gap:.5rem;justify-content:space-between;align-self:center;align-items:center;width:100%;display:flex;padding-bottom:calc(var(--site--margin)*.35)}
.vkh_hero_dot{width:.25rem;height:.25rem;border-radius:9999px;background-color:var(--swatch--black-400)}
.vkh_hero_scrolltext{color:var(--swatch--black-400);font-family:Suisse Mono,Arial,sans-serif;font-size:.7rem;line-height:1.4;text-transform:uppercase;letter-spacing:.08em}
@media screen and (max-width:767px){
  .vkh_hero_wordmark{font-size:clamp(1.6rem,12.5vw,4rem)}
  .vkh_hero_heading{max-width:100%}
}
/* ===== end VIKHYATKAUSHIK hero ===== */
`;
  fs.appendFileSync(cssPath, cssBlock);
  console.log("styles.css appended OK");
} else {
  console.log("CSS already present, skipped");
}
