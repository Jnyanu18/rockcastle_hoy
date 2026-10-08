const fs = require('fs');
const html = fs.readFileSync('hoy.html', 'utf8');

// Find aboutWorkBlock
const start = html.indexOf('aboutWorkBlock');
if (start !== -1) {
  // Print 4000 characters from start
  console.log(html.substring(start - 50, start + 4500));
}
