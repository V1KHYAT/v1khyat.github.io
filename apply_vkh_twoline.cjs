const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

const oldBand = "  .vkh_hero_webgl{top:auto;bottom:0;height:16%;transform:translateY(42%)}";
const newBand = "  .vkh_hero_webgl{top:auto;bottom:calc(var(--site--margin)*-1 + 16px);height:auto;aspect-ratio:2.45/1;transform:none}\n  .vkh_hero_contain{padding-bottom:20%}";
if (!css.includes(oldBand)) { console.error("FAIL: band rule not found"); process.exit(1); }
css = css.replace(oldBand, newBand);

fs.writeFileSync("site/css/styles.css", css);
let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=18");
h = h.replace(/js\/vik-hero-distortion\.js\?v=[^"]+/, "js/vik-hero-distortion.js?v=20260824i");
fs.writeFileSync("site/index.html", h);
console.log("v18: two-line mobile wordmark + bottom margin + lifted paras");
