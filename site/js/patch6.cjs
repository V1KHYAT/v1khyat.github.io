const fs = require('fs');
let file = fs.readFileSync('vik-hero-distortion.js', 'utf8');

file = file.replace(/faviconCtx\.filter = "blur[^;]+;\s*var srcSize = [^;]+;\s*var srcX = [^;]+;\s*var srcY = [^;]+;\s*faviconCtx\.drawImage\(renderer\.domElement, srcX, srcY, srcSize, srcSize, -4, -4, 40, 40\);/, `
            // Sample a smaller 25% box slightly offset from the center
            // By zooming in, the flowmap movement becomes very obvious in the 32x32 icon.
            var srcSize = Math.min(renderer.domElement.width, renderer.domElement.height) * 0.25;
            var srcX = (renderer.domElement.width - srcSize) / 2;
            var srcY = (renderer.domElement.height / 2) + (srcSize * 0.1);
            faviconCtx.drawImage(renderer.domElement, srcX, srcY, srcSize, srcSize, 0, 0, 32, 32);
`);

fs.writeFileSync('vik-hero-distortion.js', file);
console.log('Patched sampling logic');
