const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

// 1. Mobile first (unique full-line strings)
const oldM1 = "  .vkh_hero_para2{max-width:30ch;text-align:center;font-size:1rem}";
if (!css.includes(oldM1)) { console.error("FAIL: mobile para2 rule"); process.exit(1); }
css = css.replace(oldM1, "  .vkh_hero_para2{max-width:32ch;text-align:center;font-size:1rem}");
const oldM2 = "  .vkh_nav_tagline{position:static;order:1;text-align:center;max-width:30ch;padding:0;margin:3.5rem 0 0;font-size:1rem}";
if (!css.includes(oldM2)) { console.error("FAIL: mobile tagline rule"); process.exit(1); }
css = css.replace(oldM2, "  .vkh_nav_tagline{position:static;order:1;text-align:center;max-width:32ch;padding:0;margin:3.5rem 0 0;font-size:1rem}");

// 2. Desktop (whatever 30ch occurrences remain)
const oldTag = ".vkh_nav_tagline{position:absolute;left:0;top:0;opacity:0;max-width:30ch;";
if (!css.includes(oldTag)) { console.error("FAIL: tagline rule"); process.exit(1); }
css = css.replace(oldTag, ".vkh_nav_tagline{position:absolute;left:0;top:0;opacity:0;max-width:34ch;");
css = css.split(".vkh_hero_para2{max-width:30ch;").join(".vkh_hero_para2{max-width:34ch;");

fs.writeFileSync("site/css/styles.css", css);
let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=22");
fs.writeFileSync("site/index.html", h);
console.log("v22: widths widened to kill widows");
