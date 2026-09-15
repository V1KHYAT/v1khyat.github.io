const fs = require('fs');
let file = fs.readFileSync('vik-hero-distortion.js', 'utf8');

file = file.replace(/faviconCtx\.clip\(\);\s*\/\/[^\n]+\s*var srcSize = [^;]+;\s*var srcX = [^;]+;\s*var srcY = [^;]+;\s*faviconCtx\.drawImage[^;]+;/, `faviconCtx.clip();
          
          // Apply a heavy blur to turn the sharp text into a smooth mesh gradient
          faviconCtx.filter = "blur(4px)";
          
          // Sample a slightly off-center portion to avoid the most legible part of the text
          var srcSize = Math.min(renderer.domElement.width, renderer.domElement.height) * 0.6;
          var srcX = (renderer.domElement.width - srcSize) * 0.2;
          var srcY = (renderer.domElement.height - srcSize) * 0.2;
          
          faviconCtx.drawImage(renderer.domElement, srcX, srcY, srcSize, srcSize, -4, -4, 40, 40);
          faviconCtx.filter = "none";`);

fs.writeFileSync('vik-hero-distortion.js', file);
console.log('Patched blur');
