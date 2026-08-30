const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

// revert to 30ch (keeps 3 lines) and balance the lines so no widow rows
css = css.split(".vkh_nav_tagline{position:absolute;left:0;top:0;opacity:0;max-width:34ch;").join(".vkh_nav_tagline{position:absolute;left:0;top:0;opacity:0;max-width:30ch;");
css = css.split(".vkh_hero_para2{max-width:32ch;").join(".vkh_hero_para2{max-width:30ch;");
css = css.split("max-width:30ch;padding:0;margin:3.5rem 0 0;font-size:1rem}").join("max-width:32ch;padding:0;margin:3.5rem 0 0;font-size:1rem}");
css = css.split(".vkh_hero_para2{max-width:32ch;text-align:center;").join(".vkh_hero_para2{max-width:30ch;text-align:center;");

// add balance to both paragraph rules
const oldT = "font-size:clamp(1.1rem,1.13rem + .72vw,2rem);line-height:1.15;font-weight:500;letter-spacing:-.01em;pointer-events:none;margin:0;";
if (!css.includes(oldT)) { console.error("FAIL: tagline rule for balance"); process.exit(1); }
css = css.replace(oldT, "font-size:clamp(1.1rem,1.13rem + .72vw,2rem);line-height:1.15;font-weight:500;letter-spacing:-.01em;pointer-events:none;margin:0;text-wrap:balance;");
const oldP = ".vkh_hero_para2{max-width:30ch;color:var(--swatch--black-400);font-family:var(--_typography---font--primary-family);font-size:clamp(1.1rem,1.13rem + .72vw,2rem);line-height:1.15;font-weight:500;letter-spacing:-.01em}";
if (!css.includes(oldP)) { console.error("FAIL: para2 rule for balance"); process.exit(1); }
css = css.replace(oldP, ".vkh_hero_para2{max-width:30ch;color:var(--swatch--black-400);font-family:var(--_typography---font--primary-family);font-size:clamp(1.1rem,1.13rem + .72vw,2rem);line-height:1.15;font-weight:500;letter-spacing:-.01em;text-wrap:balance}");

fs.writeFileSync("site/css/styles.css", css);
let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=24");
fs.writeFileSync("site/index.html", h);
console.log("v24: text-wrap balance on both paragraphs");
