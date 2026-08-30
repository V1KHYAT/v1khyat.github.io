const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

// curve tuned: 32px at >=1800px, ~28px at 1366px laptop, ~27px at 1280px
const oldSize = "clamp(1.05rem,.78rem + 1.42vw,2rem)";
const newSize = "clamp(1.1rem,1.13rem + .72vw,2rem)";
if (!css.includes(oldSize)) { console.error("FAIL: size rule not found"); process.exit(1); }
css = css.split(oldSize).join(newSize);

fs.writeFileSync("site/css/styles.css", css);
let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=21");
fs.writeFileSync("site/index.html", h);
console.log("v21: retuned type scale");
