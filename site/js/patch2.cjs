const fs = require('fs');
let file = fs.readFileSync('vik-hero-distortion.js', 'utf8');

file = file.replace(/var faviconLink = document.querySelector\("link\[rel='icon'\]"\);\s+if \(!faviconLink\) \{[^}]+\}/, `
    var faviconLinks = Array.from(document.querySelectorAll("link[rel*='icon']"));
    if (faviconLinks.length === 0) {
      var fl = document.createElement("link");
      fl.rel = "icon";
      document.head.appendChild(fl);
      faviconLinks.push(fl);
    }
`);

file = file.replace(/faviconLink\.href = faviconCanvas\.toDataURL\("image\/png"\);/, `
        var dataUrl = faviconCanvas.toDataURL("image/png");
        faviconLinks.forEach(function(link) { link.href = dataUrl; });
`);

fs.writeFileSync('vik-hero-distortion.js', file);
console.log('Patched multiple favicons');
