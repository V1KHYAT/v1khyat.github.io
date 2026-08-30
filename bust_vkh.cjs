const fs = require("fs");
let c = fs.readFileSync("site/index.html", "utf8");
const before = c;
c = c.replace('<script src="js/vik-hero-distortion.js"></script>', '<script src="js/vik-hero-distortion.js?v=20260824b"></script>');
if (c === before) { console.log("pattern not found - no change"); process.exit(1); }
fs.writeFileSync("site/index.html", c);
console.log("cache-bust written OK");
