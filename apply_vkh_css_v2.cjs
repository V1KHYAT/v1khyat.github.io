const fs = require("fs");

const cssPath = "site/css/styles.css";
let css = fs.readFileSync(cssPath, "utf8");
fs.copyFileSync(cssPath, cssPath + ".bak-vkh2-" + new Date().toISOString().slice(0, 19).replace(/[:.]/g, "-"));

const startMark = "/* ===== VIKHYATKAUSHIK hero";
const endMark = "/* ===== end VIKHYATKAUSHIK hero ===== */";
const s = css.indexOf(startMark);
const e = css.indexOf(endMark);
if (s < 0 || e < 0) { console.error("FAIL: vkh css block not found"); process.exit(1); }

const block = `/* ===== VIKHYATKAUSHIK hero v2 - supersolid-style wordmark + preloader ===== */
:root{--vkh-ease:cubic-bezier(.16,1,.3,1)}
.vkh_hero{cursor:default}
.vkh_hero_contain{z-index:2;height:100%;flex-flow:column;justify-content:space-between;align-items:flex-start;display:flex;position:relative}
.vkh_hero_top{padding-top:calc(var(--site--margin)*1.25)}
.vkh_hero_heading{max-width:22ch;color:var(--swatch--black-400);font-family:var(--_typography---font--primary-family);font-size:clamp(1.25rem,.9rem + 1.75vw,2.125rem);line-height:1.15;font-weight:500;letter-spacing:-.01em}
.vkh_hero_webgl{z-index:1;width:100%;height:100%;justify-content:center;align-items:center;margin:auto;display:flex;position:absolute;inset:0%}
.vkh_canvas_distortion{z-index:2;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity 1.1s ease,filter 1.1s ease}
.vkh_canvas_distortion.is-ready{opacity:1}
.vkh_hero_wordmark{font-family:Animo,Arial,sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:-.045em;color:var(--swatch--black-400);font-size:calc((100vw - var(--site--margin)*2)/8.15);line-height:1;white-space:nowrap;user-select:none}
.vkh_no_webgl .vkh_canvas_distortion{display:none}
.vkh_no_webgl .vkh_hero_wordmark{display:block}
.vkh_webgl_ready .vkh_hero_wordmark{display:none}
.vkh_hero_sub{z-index:2;align-self:flex-end;display:flex;position:relative;padding-bottom:calc(var(--site--margin)*.2)}
.vkh_hero_para2{max-width:33ch;color:var(--swatch--black-400);font-family:var(--_typography---font--primary-family);font-size:clamp(1rem,.85rem + .8vw,1.45rem);line-height:1.25;font-weight:500;letter-spacing:-.01em}
/* entrance states - hidden until preloader lifts */
body:not(.vkh-boot-done) .vkh_hero_heading,body:not(.vkh-boot-done) .vkh_hero_para2{opacity:0;transform:translateY(26px)}
.vkh_hero_heading,.vkh_hero_para2{transition:opacity .9s var(--vkh-ease),transform .9s var(--vkh-ease)}
.vkh_hero_para2{transition-delay:.12s}
body:not(.vkh-boot-done) .vkh_canvas_distortion{opacity:0 !important;filter:blur(12px)}
/* navbar tagline swap */
.navbar_left_contain{position:relative}
.vkh_nav_tagline{position:absolute;left:0;top:50%;transform:translateY(calc(-50% + 10px));opacity:0;max-width:250px;font-family:var(--_typography---font--primary-family);font-size:.72rem;line-height:1.35;color:var(--swatch--black-400);pointer-events:none;transition:opacity .5s ease,transform .6s var(--vkh-ease)}
body.vkh-nav-inhero .navbar_home{opacity:0 !important}
body.vkh-nav-inhero .vkh_nav_tagline{opacity:1;transform:translateY(-50%)}
/* preloader */
.vkh_preloader{position:fixed;inset:0;z-index:99999;background-color:var(--swatch--beige-100);flex-flow:column;justify-content:center;align-items:center;display:flex;transition:transform .75s cubic-bezier(.76,0,.24,1),visibility 0s linear .75s}
body.vkh-boot-done .vkh_preloader{transform:translateY(-101%);visibility:hidden;pointer-events:none}
.vkh_preloader_logo{font-family:'Mukta',sans-serif;font-weight:300;font-size:2rem;line-height:1;letter-spacing:.05em;color:var(--swatch--black-400);transition:opacity .4s ease,transform .5s var(--vkh-ease)}
.vkh_preloader_line{width:180px;height:1px;background-color:rgba(8,8,7,.12);margin-top:1.4rem;overflow:hidden;transition:opacity .35s ease}
.vkh_preloader_line span{display:block;width:100%;height:100%;background-color:var(--swatch--black-400);transform:scaleX(0);transform-origin:0 50%}
.vkh_preloader_meta{width:180px;justify-content:space-between;margin-top:.6rem;font-family:'Suisse Mono',Arial,sans-serif;font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;color:var(--swatch--black-400);display:flex;transition:opacity .35s ease}
body.vkh-boot-done .vkh_preloader_logo{opacity:0;transform:translateY(-14px)}
body.vkh-boot-done .vkh_preloader_line,body.vkh-boot-done .vkh_preloader_meta{opacity:0}
@keyframes vkhFailsafe{to{opacity:0;visibility:hidden;pointer-events:none}}
body:not(.vkh-boot-done) .vkh_preloader{animation:vkhFailsafe .6s ease 5.5s forwards}
/* responsive */
@media screen and (max-width:767px){
  .vkh_hero_top{padding-top:4.75rem}
  .vkh_hero_heading{max-width:100%}
  .vkh_nav_tagline{max-width:170px;font-size:.62rem}
  .vkh_hero_para2{max-width:30ch}
}
/* ===== end VIKHYATKAUSHIK hero v2 ===== */`;

css = css.slice(0, s) + block + css.slice(e + endMark.length);
fs.writeFileSync(cssPath, css);
console.log("CSS block v2 written OK");
