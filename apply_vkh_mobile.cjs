const fs = require("fs");
let css = fs.readFileSync("site/css/styles.css", "utf8");

const oldM = `@media screen and (max-width:767px){
  .vkh_nav_tagline{top:3.75rem;max-width:100%;padding-right:1rem;font-size:1.05rem}
  .vkh_hero_para2{max-width:26ch}
}`;

const newM = `/* tablet: keep desktop layout, ease the type down */
@media screen and (max-width:991px){
  .vkh_nav_tagline,.vkh_hero_para2{font-size:clamp(1.1rem,.85rem + 1.2vw,1.7rem)}
}
/* mobile: statement + para centered as a stack, wordmark pinned to the bottom */
@media screen and (max-width:767px){
  .vkh_hero_contain{justify-content:center;align-items:center}
  .vkh_nav_tagline{position:static;order:1;text-align:center;max-width:100%;padding:0;margin:3.5rem 0 0;font-size:1rem}
  .vkh_hero_sub{order:2;align-self:center;margin-top:1.1rem;padding-bottom:0}
  .vkh_hero_para2{max-width:28ch;text-align:center;font-size:1rem}
  .vkh_hero_webgl{top:auto;bottom:0;height:42%}
  /* nothing replaces the Hindi logo on mobile - keep it visible */
  body.vkh-nav-inhero .navbar_home{opacity:1 !important}
}`;

if (!css.includes(oldM)) { console.error("FAIL: mobile block not found"); process.exit(1); }
css = css.replace(oldM, newM);
fs.writeFileSync("site/css/styles.css", css);

let h = fs.readFileSync("site/index.html", "utf8");
h = h.replace(/css\/styles\.css\?v=[^"]+/, "css/styles.css?v=16");
fs.writeFileSync("site/index.html", h);
console.log("mobile layout v16 written");
