const fs = require('fs');
let file = fs.readFileSync('vik-hero-distortion.js', 'utf8');

// Remove setup
file = file.replace(/var faviconCanvas = document\.createElement\("canvas"\);[\s\S]+?faviconLinks\.push\(fl\);\s*\}/, '');

// Remove render loop addition
file = file.replace(/if \(now - lastFaviconUpdate > 66\) \{[\s\S]+?faviconLinks\.forEach\(function\(link\) \{ link\.href = dataUrl; \}\);\s*\}/, '');

fs.writeFileSync('vik-hero-distortion.js', file);
console.log('Removed favicon logic');
