const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");
const oldM = "@media screen and (max-width:767px){\n  .vkh_nav_tagline{max-width:100%;padding-right:5rem}\n  .vkh_hero_para2{max-width:26ch}\n}";
const newM = "@media screen and (max-width:767px){\n  .vkh_nav_tagline{top:3.75rem;max-width:100%;padding-right:1rem;font-size:1.05rem}\n  .vkh_hero_para2{max-width:26ch}\n}";
if (!css.includes(oldM)) { console.error("FAIL: mobile block not found"); process.exit(1); }
css = css.replace(oldM, newM);
fs.writeFileSync("site/css/styles.css", css);

let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=14");
fs.writeFileSync("site/index.html", h);
console.log("mobile tagline fixed, css v14");
