const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

// Read public/ref_stage.png
const inputPath = path.join(__dirname, '..', 'public', 'stage_mask_bw.png');
const outputPath = path.join(__dirname, '..', 'public', 'stage_potrace.svg');

if (!fs.existsSync(inputPath)) {
  console.log('stage_mask_bw.png not ready yet');
  process.exit(1);
}

const params = {
  color: '#ee7d2e',
  threshold: 128,
  turdSize: 5,
  optCurve: true,
  alphaMax: 1.0,
  optTolerance: 0.2
};

potrace.trace(inputPath, params, function(err, svg) {
  if (err) throw err;
  fs.writeFileSync(outputPath, svg);
  console.log('Generated stage_potrace.svg successfully! Size:', svg.length);
});
