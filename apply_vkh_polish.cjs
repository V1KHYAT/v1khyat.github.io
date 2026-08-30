const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

// 1. Fluid nav link sizing (overrides Webflow's fixed text-small var; appended last = wins ties)
const navCss = `
/* ===== vkh: responsive navbar type ===== */
.navbar_link .footer_nav_span{font-size:clamp(.72rem,.62rem + .4vw,.95rem)}
.navbar_home_svg{font-size:clamp(1.05rem,.9rem + .4vw,1.5rem) !important}
`;
if (!css.includes("vkh: responsive navbar type")) css += navCss;

// 2. Wordmark band: literal bottom of the viewport on mobile
const oldBand = "  .vkh_hero_webgl{top:auto;bottom:0;height:42%}";
const newBand = "  .vkh_hero_webgl{top:auto;bottom:0;height:16%;transform:translateY(42%)}";
if (!css.includes(oldBand)) { console.error("FAIL: mobile band rule not found"); process.exit(1); }
css = css.replace(oldBand, newBand);

// 3. Matching paragraph widths (30ch -> 3 lines each)
const oldTag = ".vkh_nav_tagline{position:absolute;left:0;top:0;opacity:0;max-width:22ch;";
const newTag = ".vkh_nav_tagline{position:absolute;left:0;top:0;opacity:0;max-width:30ch;";
if (!css.includes(oldTag)) { console.error("FAIL: tagline rule not found"); process.exit(1); }
css = css.replace(oldTag, newTag);

const oldP2d = ".vkh_hero_para2{max-width:26ch;color:var(--swatch--beige-100);";
if (css.includes(oldP2d)) {
  // desktop rule (older light-color version may have been replaced; handle both)
}
const oldP2 = ".vkh_hero_para2{max-width:26ch;";
css = css.split(oldP2).join(".vkh_hero_para2{max-width:30ch;");

// mobile widths
const oldMw = "  .vkh_hero_para2{max-width:28ch;text-align:center;font-size:1rem}";
if (!css.includes(oldMw)) { console.error("FAIL: mobile para2 rule not found (28ch)"); process.exit(1); }
css = css.replace(oldMw, "  .vkh_hero_para2{max-width:30ch;text-align:center;font-size:1rem}");
const oldMt = "  .vkh_nav_tagline{position:static;order:1;text-align:center;max-width:100%;padding:0;margin:3.5rem 0 0;font-size:1rem}";
if (!css.includes(oldMt)) { console.error("FAIL: mobile tagline rule not found"); process.exit(1); }
css = css.replace(oldMt, "  .vkh_nav_tagline{position:static;order:1;text-align:center;max-width:30ch;padding:0;margin:3.5rem 0 0;font-size:1rem}");

fs.writeFileSync("site/css/styles.css", css);

let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=17");
fs.writeFileSync("site/index.html", h);
console.log("v17 written: nav type fluid, wordmark literal-bottom, paras 30ch");
