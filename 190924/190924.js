let tileSize;
let numTilesX, numTilesY;
let palette;
let currentPaletteIndex = 0;
let isReversed = false;
let currentFileIndex = 1;

// 50 popular color palettes from Coolors.co
const palettes = [
  ['#242451', '#7A467A', '#15788E', '#00527B', '#DB7BA9'],
  ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
  ['#22223B', '#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4'],
  ['#F8B195', '#F67280', '#C06C84', '#6C5B7B', '#355C7D'],
  ['#5D5C61', '#379683', '#7395AE', '#557A95', '#B1A296'],
  ['#2E1114', '#501B1D', '#64485C', '#83677B', '#ADADAD'],
  ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429'],
  ['#05668D', '#028090', '#00A896', '#02C39A', '#F0F3BD'],
  ['#03071E', '#370617', '#6A040F', '#9D0208', '#D00000'],
  ['#FFB703', '#FB8500', '#219EBC', '#023047', '#8ECAE6'],
  ['#390099', '#9E0059', '#FF0054', '#FF5400', '#FFBD00'],
  ['#50514F', '#F25F5C', '#FFE066', '#247BA0', '#70C1B3'],
  ['#0081A7', '#00AFB9', '#FDFCDC', '#FED9B7', '#F07167'],
  ['#3D5A80', '#98C1D9', '#E0FBFC', '#EE6C4D', '#293241'],
  ['#A31621', '#FCF6F5', '#990000', '#2F4550', '#2E151B'],
  ['#1A535C', '#4ECDC4', '#F7FFF7', '#FF6B6B', '#FFE66D'],
  ['#FFCBF2', '#F3C4FB', '#ECBCFD', '#E5B3FE', '#E2AFFF'],
  ['#8E9AAF', '#CBC0D3', '#EFD3D7', '#FEEAFA', '#DEE2FF'],
  ['#D8E2DC', '#FFE5D9', '#FFCAD4', '#F4ACB7', '#9D8189'],
  ['#ECF8F8', '#EEE4E1', '#E7D8C9', '#E6BEAE', '#B2967D'],
  ['#335C67', '#FFF3B0', '#E09F3E', '#9E2A2B', '#540B0E'],
  ['#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'],
  ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D'],
  ['#FF9F1C', '#FFBF69', '#FFFFFF', '#CBF3F0', '#2EC4B6'],
  ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'],
  ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF'],
  ['#FFE8D6', '#DDBEA9', '#CB997E', '#B7B7A4', '#A5A58D'],
  ['#EDDCD2', '#FFF1E6', '#FDE2E4', '#FAD2E1', '#C5DEDD'],
  ['#0B132B', '#1C2541', '#3A506B', '#5BC0BE', '#6FFFE9'],
  ['#0466C8', '#0353A4', '#023E7D', '#002855', '#001845'],
  ['#9B5DE5', '#F15BB5', '#FEE440', '#00BBF9', '#00F5D4'],
  ['#FFFFFF', '#00171F', '#003459', '#007EA7', '#00A8E8'],
  ['#588B8B', '#FFFFFF', '#FFD5C2', '#F28F3B', '#C8553D'],
  ['#FE938C', '#E6B89C', '#EAD2AC', '#9CAFB7', '#4281A4'],
  ['#2D00F7', '#6A00F4', '#8900F2', '#A100F2', '#B100E8'],
  ['#353535', '#3C6E71', '#FFFFFF', '#D9D9D9', '#284B63'],
  ['#C9CBA3', '#FFE1A8', '#E26D5C', '#723D46', '#472D30'],
  ['#4F000B', '#720026', '#CE4257', '#FF7F51', '#FF9B54'],
  ['#F7B267', '#F79D65', '#F4845F', '#F27059', '#F25C54'],
  ['#70D6FF', '#FF70A6', '#FF9770', '#FFD670', '#E9FF70'],
  ['#233D4D', '#FE7F2D', '#FCCA46', '#A1C181', '#619B8A'],
  ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF'],
  ['#03045E', '#023E8A', '#0077B6', '#0096C7', '#00B4D8'],
  ['#2D3142', '#4F5D75', '#BFC0C0', '#FFFFFF', '#EF8354'],
  ['#114B5F', '#1A936F', '#88D498', '#C6DABF', '#F3E9D2'],
  ['#5F0F40', '#9A031E', '#FB8B24', '#E36414', '#0F4C5C'],
  ['#582F0E', '#7F4F24', '#936639', '#A68A64', '#B6AD90'],
  ['#8C1C13', '#BF4342', '#E7D7C1', '#A78A7F', '#735751'],
  ['#0D3B66', '#FAF0CA', '#F4D35E', '#EE964B', '#F95738'],
  ['#CCD5AE', '#E9EDC9', '#FEFAE0', '#FAEDCD', '#D4A373'],
  ['#F4F1DE', '#E07A5F', '#3D405B', '#81B29A', '#F2CC8F']
];

function setup() {
  createCanvas(4000, 4000);

  // Start the image generation process
  generateNextImage();
}

function generateNextImage() {
  if (currentPaletteIndex < palettes.length) {
    // Generate a random number of tiles between 4 and 10
    let numTiles = floor(random(2, 7));
    tileSize = width / numTiles;
    numTilesX = numTiles;
    numTilesY = numTiles;

    generateNewPalette(currentPaletteIndex);
    redraw();
  } else {
    console.log("All images generated!");
    noLoop();
  }
}

function generateNewPalette(index) {
  let selectedPalette = palettes[index];

  if (isReversed) {
    selectedPalette = selectedPalette.slice().reverse();
  }

  palette = new Palette();
  for (let colorHex of selectedPalette) {
    palette.add(color(colorHex));
  }
}

function draw() {
  // Use the first color in the palette for background
  background(palette.get(0));

  for (let y = 0; y < numTilesY; y++) {
    for (let x = 0; x < numTilesX; x++) {
      drawTile(x * tileSize, y * tileSize);
    }
  }

  // Save the current image
  let filename = 'tiling_' + nf(currentFileIndex, 3) + '.png';
  saveCanvas(filename);

  // Move to the next image
  currentFileIndex++;
  if (isReversed) {
    currentPaletteIndex++;
    isReversed = false;
  } else {
    isReversed = true;
  }
  generateNextImage();
}

function drawTile(x, y) {
  push();
  translate(x, y);

  // Draw circles in each quadrant
  drawNestedCircles(tileSize/4, tileSize/4, tileSize/2);
  drawNestedCircles(3*tileSize/4, tileSize/4, tileSize/2);
  drawNestedCircles(tileSize/4, 3*tileSize/4, tileSize/2);
  drawNestedCircles(3*tileSize/4, 3*tileSize/4, tileSize/2);

  pop();
}

function drawNestedCircles(x, y, quadrantSize) {
  let sizeFactor = 0.94; // Largest circle covers 94% of the quadrant
  let scaleFactor = 0.75; // Each circle is 75% the size of the previous one
  let offsetFactor = 0.06; // 6% offset for nested effect

  for (let i = 0; i < 4; i++) {
    let currentSize = quadrantSize * sizeFactor * pow(scaleFactor, i);
    let totalOffset = quadrantSize * offsetFactor * (1 - pow(scaleFactor, i)) / (1 - scaleFactor);
    let offsetX = (tileSize/2 - x) * totalOffset / (quadrantSize/2);
    let offsetY = (tileSize/2 - y) * totalOffset / (quadrantSize/2);

    // Use colors starting from the second color in the palette (index 1)
    // If we run out of colors, it will wrap around to the start (excluding background color)
    let colorIndex = (i % 4) + 1;
    if (palette.get(colorIndex) === undefined) {
      colorIndex = 1;
    }
    fill(palette.get(colorIndex));
    noStroke();
    ellipse(x + offsetX, y + offsetY, currentSize, currentSize);
  }
}
