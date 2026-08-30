const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

const oldBand = "  .vkh_hero_webgl{top:auto;bottom:calc(var(--site--margin)*-1 + 16px);height:auto;aspect-ratio:2.45/1;transform:none}";
const newBand = "  .vkh_hero_webgl{top:auto;bottom:calc(var(--site--margin)*-1 + 22px);width:86%;height:auto;aspect-ratio:2.45/1;transform:none}";
if (!css.includes(oldBand)) { console.error("FAIL: band rule not found"); process.exit(1); }
css = css.replace(oldBand, newBand);
fs.writeFileSync("site/css/styles.css", css);

let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=19");
h = h.replace(/js\/vik-hero-distortion\.js\?v=[^"]+/, "js/vik-hero-distortion.js?v=20260824j");
fs.writeFileSync("site/index.html", h);
console.log("v19: counter fixed, wordmark 86% width, tighter leading, more bottom margin");
