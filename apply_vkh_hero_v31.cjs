const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

// 1. Remove tagline from navbar (clipped by navbar height)
const tagRe = /<h1 class="vkh_nav_tagline">[^<]*<\/h1>/;
if (!tagRe.test(html)) { console.error("FAIL: navbar tagline not found"); process.exit(1); }
html = html.replace(tagRe, "");
console.log("navbar tagline removed from navbar");

// 2. Insert it into the hero contain, top-left (below navbar line)
const containOpen = '          <div class="vkh_hero_contain">\n';
if (!html.includes(containOpen)) { console.error("FAIL: hero contain not found"); process.exit(1); }
const taglineH1 = '            <h1 class="vkh_nav_tagline">I pair intelligent workflows with deep user research to architect precise digital products.</h1>\n';
html = html.replace(containOpen, containOpen + taglineH1);
console.log("tagline placed in hero top-left");

fs.writeFileSync("site/index.html", html);
console.log("index.html v3.1 OK");
