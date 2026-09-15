const fs = require('fs');
let file = fs.readFileSync('vik-hero-distortion.js', 'utf8');

// Insert favicon setup inside buildEffect
const initSetup = `
    var faviconCanvas = document.createElement("canvas");
    faviconCanvas.width = 32;
    faviconCanvas.height = 32;
    var faviconCtx = faviconCanvas.getContext("2d");
    var lastFaviconUpdate = 0;
    var faviconLink = document.querySelector("link[rel='icon']");
    if (!faviconLink) {
      faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      document.head.appendChild(faviconLink);
    }
`;

const renderLogic = `
      renderer.render(mesh, camera);

      if (now - lastFaviconUpdate > 66) { // ~15 FPS
        lastFaviconUpdate = now;
        faviconCtx.clearRect(0, 0, 32, 32);
        faviconCtx.save();
        faviconCtx.beginPath();
        faviconCtx.arc(16, 16, 16, 0, Math.PI * 2);
        faviconCtx.clip();
        var srcSize = Math.min(renderer.domElement.width, renderer.domElement.height);
        var srcX = (renderer.domElement.width - srcSize) / 2;
        var srcY = (renderer.domElement.height - srcSize) / 2;
        faviconCtx.drawImage(renderer.domElement, srcX, srcY, srcSize, srcSize, 0, 0, 32, 32);
        faviconCtx.restore();
        faviconLink.href = faviconCanvas.toDataURL("image/png");
      }
`;

file = file.replace('function buildEffect(section, container, canvas) {', 'function buildEffect(section, container, canvas) {' + initSetup);
file = file.replace('renderer.render(mesh, camera);\r\n\r\n      // Ping-pong swaps', renderLogic + '\r\n\r\n      // Ping-pong swaps');
file = file.replace('renderer.render(mesh, camera);\n\n      // Ping-pong swaps', renderLogic + '\n\n      // Ping-pong swaps');

fs.writeFileSync('vik-hero-distortion.js', file);
console.log('Patched');
