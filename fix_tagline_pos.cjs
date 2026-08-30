const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

// Retarget the tagline: absolute top-left inside the hero contain
const oldRule = ".vkh_nav_tagline{position:absolute;left:0;top:.35rem;opacity:0;max-width:22ch;";
const newRule = ".vkh_nav_tagline{position:absolute;left:0;top:calc(var(--site--margin)*1.1);opacity:0;max-width:22ch;";
if (!css.includes(oldRule)) { console.error("FAIL: tagline rule not found"); process.exit(1); }
css = css.replace(oldRule, newRule);
fs.writeFileSync(cssPathSafe(css), css);
console.log("tagline repositioned OK");

function cssPathSafe(p) { return "site/css/styles.css"; }
