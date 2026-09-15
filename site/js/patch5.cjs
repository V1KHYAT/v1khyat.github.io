const fs = require('fs');
let file = fs.readFileSync('vik-hero-distortion.js', 'utf8');

file = file.replace(/var srcSize = Math\.min[^;]+;\s*var srcX = [^;]+;\s*var srcY = [^;]+;/, `
            var srcSize = Math.min(renderer.domElement.width, renderer.domElement.height) * 0.85;
            var srcX = (renderer.domElement.width - srcSize) / 2;
            var srcY = renderer.domElement.height - srcSize;
`);

fs.writeFileSync('vik-hero-distortion.js', file);
console.log('Patched favicon sample area');
