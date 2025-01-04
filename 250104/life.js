let cellSize = 20;
let gridWidth;
let gridHeight;
const CANVAS_WIDTH = 800;  // 40 * 20
const CANVAS_HEIGHT = 600; // 30 * 20

let grid;
let nextGrid;
let playing = false;
let gameSpeed = 10;  // frames per second

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    updateGridDimensions();
    grid = create2DArray(gridWidth, gridHeight);
    nextGrid = create2DArray(gridWidth, gridHeight);
    randomize();
    frameRate(gameSpeed);
}

function draw() {
    background(50);
    
    // Draw current state
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            if (grid[i][j] === 1) {
                fill(255);
                noStroke();
                rect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    if (playing) {
        computeNextGeneration();
    }
}

function mousePressed() {
    const i = floor(mouseX / cellSize);
    const j = floor(mouseY / cellSize);
    
    if (i >= 0 && i < gridWidth && j >= 0 && j < gridHeight) {
        grid[i][j] = grid[i][j] === 1 ? 0 : 1;
    }
}

function updateGridDimensions() {
    gridWidth = floor(CANVAS_WIDTH / cellSize);
    gridHeight = floor(CANVAS_HEIGHT / cellSize);
}

function keyPressed() {
    if (key === ' ') {
        playing = !playing;
    } else if (key === 'r') {
        randomize();
    } else if (key === 'c') {
        clear();
    } else if (key === '+' || key === '=') {
        cellSize = max(1, cellSize - 2);
        updateGridDimensions();
        grid = create2DArray(gridWidth, gridHeight);
        nextGrid = create2DArray(gridWidth, gridHeight);
        randomize();
    } else if (key === '-' || key === '_') {
        cellSize = min(50, cellSize + 2);
        updateGridDimensions();
        grid = create2DArray(gridWidth, gridHeight);
        nextGrid = create2DArray(gridWidth, gridHeight);
        randomize();
    } else if (keyCode === RIGHT_ARROW) {
        gameSpeed = min(60, gameSpeed + 5);
        frameRate(gameSpeed);
    } else if (keyCode === LEFT_ARROW) {
        gameSpeed = max(1, gameSpeed - 5);
        frameRate(gameSpeed);
    }
}

function create2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}

function randomize() {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            grid[i][j] = random() > 0.8 ? 1 : 0;
        }
    }
}

function clear() {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            grid[i][j] = 0;
        }
    }
    playing = false;
}

function countNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + gridWidth) % gridWidth;
            let row = (y + j + gridHeight) % gridHeight;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function computeNextGeneration() {
    // Compute next generation
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            let neighbors = countNeighbors(i, j);
            let state = grid[i][j];
            
            // Apply Conway's Game of Life rules
            if (state === 0 && neighbors === 3) {
                nextGrid[i][j] = 1;
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[i][j] = 0;
            } else {
                nextGrid[i][j] = state;
            }
        }
    }
    
    // Swap grids
    let temp = grid;
    grid = nextGrid;
    nextGrid = temp;
}
