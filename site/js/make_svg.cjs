const fs = require('fs');
const img = fs.readFileSync('../images/favicon.png');
const b64 = img.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <clipPath id="circleView">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
  </defs>
  <image width="32" height="32" href="data:image/png;base64,${b64}" clip-path="url(#circleView)" />
</svg>`;
fs.writeFileSync('../images/favicon.svg', svg);
console.log('Saved favicon.svg');
