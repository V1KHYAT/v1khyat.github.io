const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");
css = css.split(".vkh_hero_para2{max-width:34ch;").join(".vkh_hero_para2{max-width:32ch;");
fs.writeFileSync("site/css/styles.css", css);
let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=23");
fs.writeFileSync("site/index.html", h);
console.log("v23: para2 32ch desktop");
