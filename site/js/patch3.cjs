const fs = require('fs');
let file = fs.readFileSync('vik-hero-distortion.js', 'utf8');

file = file.replace(/var srcSize = Math\.min\(renderer\.domElement\.width, renderer\.domElement\.height\);\s*var srcX = \(renderer\.domElement\.width - srcSize\) \/ 2;\s*var srcY = \(renderer\.domElement\.height - srcSize\) \/ 2;/, `
          // To avoid showing the sharp wordmark text, sample a small chunk from the top-left corner
          // where the text is heavily smeared into a gradient.
          var srcSize = Math.min(renderer.domElement.width, renderer.domElement.height) * 0.4;
          var srcX = renderer.domElement.width * 0.05;
          var srcY = renderer.domElement.height * 0.05;
`);

fs.writeFileSync('vik-hero-distortion.js', file);
console.log('Patched sampling coords');
