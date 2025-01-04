const CELL_SIZE = 20;
const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;

let grid;
let nextGrid;
let playing = false;

function setup() {
    createCanvas(GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
    grid = create2DArray(GRID_WIDTH, GRID_HEIGHT);
    nextGrid = create2DArray(GRID_WIDTH, GRID_HEIGHT);
    randomize();
    frameRate(10);
}

function draw() {
    background(50);
    
    // Draw current state
    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
            if (grid[i][j] === 1) {
                fill(255);
                stroke(40);
                rect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    if (playing) {
        computeNextGeneration();
    }
}

function mousePressed() {
    const i = floor(mouseX / CELL_SIZE);
    const j = floor(mouseY / CELL_SIZE);
    
    if (i >= 0 && i < GRID_WIDTH && j >= 0 && j < GRID_HEIGHT) {
        grid[i][j] = grid[i][j] === 1 ? 0 : 1;
    }
}

function keyPressed() {
    if (key === ' ') {
        playing = !playing;
    } else if (key === 'r') {
        randomize();
    } else if (key === 'c') {
        clear();
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
    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
            grid[i][j] = random() > 0.8 ? 1 : 0;
        }
    }
}

function clear() {
    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
            grid[i][j] = 0;
        }
    }
    playing = false;
}

function countNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + GRID_WIDTH) % GRID_WIDTH;
            let row = (y + j + GRID_HEIGHT) % GRID_HEIGHT;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function computeNextGeneration() {
    // Compute next generation
    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
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
