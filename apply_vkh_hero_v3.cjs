const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");
fs.copyFileSync("site/index.html", "site/index.html.bak-vkh3-" + new Date().toISOString().slice(0, 19).replace(/[:.]/g, "-"));

// 1. Remove the hero top heading block (paragraph moves to navbar)
const topBlock = `          <div class="vkh_hero_contain">
            <div class="vkh_hero_top">
              <h1 class="vkh_hero_heading">I pair intelligent workflows with deep user research to architect precise digital products.</h1>
            </div>
`;
if (!html.includes(topBlock)) { console.error("FAIL: hero top block not found"); process.exit(1); }
html = html.replace(topBlock, "          <div class=\"vkh_hero_contain\">\n");
console.log("hero top heading removed");

// 2. Remove the dark bottom gradient strip (readability for bottom-right para)
const grad = `          <div class="hero_home_gradient"></div>\n`;
if (!html.includes(grad)) { console.error("FAIL: gradient div not found"); process.exit(1); }
html = html.replace(grad, "");
console.log("hero_home_gradient removed");

// 3. Navbar tagline: div -> h1, drop aria-hidden
const oldTag = '<div class="vkh_nav_tagline" aria-hidden="true">I pair intelligent workflows with deep user research to architect precise digital products.</div>';
const newTag = '<h1 class="vkh_nav_tagline">I pair intelligent workflows with deep user research to architect precise digital products.</h1>';
if (!html.includes(oldTag)) { console.error("FAIL: tagline div not found"); process.exit(1); }
html = html.replace(oldTag, newTag);
console.log("navbar tagline promoted to h1");

// 4. Cache bumps
html = html.replace(/js\/vik-hero-distortion\.js\?v=[^"]+/, "js/vik-hero-distortion.js?v=20260824e");
html = html.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=12");

fs.writeFileSync("site/index.html", html);
console.log("index.html v3 patched OK");
