const fs = require("fs");
const js = fs.readFileSync("site/js/vik-hero-distortion.js", "utf8");
new Function(js);
console.log("syntax OK");
let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/js\/vik-hero-distortion\.js\?v=[^"]+/, "js/vik-hero-distortion.js?v=20260824f");
fs.writeFileSync("site/index.html", h);
console.log("js bumped to 20260824f");
