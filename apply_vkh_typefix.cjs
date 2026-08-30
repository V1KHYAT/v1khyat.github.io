const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

// old curve hits the 34px cap at ~1280px -> laptops looked like big monitors
const oldSize = "clamp(1.25rem,.9rem + 1.75vw,2.125rem)";
const newSize = "clamp(1.05rem,.78rem + 1.42vw,2rem)";

let n = 0;
css = css.split(oldSize).join(newSize); // replaces tagline + para2 desktop rules
n++;

// tablet easing block: soften too
const oldT = ".vkh_nav_tagline,.vkh_hero_para2{font-size:clamp(1.1rem,.85rem + 1.2vw,1.7rem)}";
const newT = ".vkh_nav_tagline,.vkh_hero_para2{font-size:clamp(1rem,.82rem + 1vw,1.55rem)}";
if (!css.includes(oldT)) { console.error("FAIL: tablet rule not found"); process.exit(1); }
css = css.replace(oldT, newT);

fs.writeFileSync("site/css/styles.css", css);
console.log("replaced " + n + " size rule group(s)");

let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=20");
fs.writeFileSync("site/index.html", h);
console.log("css v20");
