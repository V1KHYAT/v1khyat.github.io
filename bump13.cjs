const fs = require("fs");
let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=13");
fs.writeFileSync("site/index.html", h);
console.log("css bumped to v13");
