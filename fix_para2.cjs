const fs = require("fs");
let c = fs.readFileSync("site/css/styles.css", "utf8");
const oldP = ".vkh_hero_para2{max-width:33ch;color:var(--swatch--black-400);";
const newP = ".vkh_hero_para2{max-width:26ch;color:var(--swatch--beige-100);";
if (!c.includes(oldP)) { console.log("FAIL: para2 rule not found"); process.exit(1); }
c = c.replace(oldP, newP);
fs.writeFileSync("site/css/styles.css", c);
console.log("para2 updated: light color + 26ch");

let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=11");
fs.writeFileSync("site/index.html", h);
console.log("css bumped to v11");
