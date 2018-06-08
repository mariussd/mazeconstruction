/* 
Maze construction with backtracking
Heavily inspired by https://www.youtube.com/watch?v=HyK_Q5rrcr4
*/ 

// Cell width, columns and rows for the canvas
var cols, rows;
var cell_width = 20;

// All cells are stored here – not 2D
var cell_grid = [];

// Current cell for the backtrack
var current_cell;

// The stack for the backtrack
var stack = [];

function setup() {
    createCanvas(800, 800);
    cols = floor(width / cell_width);
    rows = floor(height / cell_width);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i ,j);
            cell_grid.push(cell);

        }
    }

    current_cell = cell_grid[0];
    
}

function index(i, j) {
    // If element is out of bounds, return -1
    if (i < 0 || i > cols - 1 || j < 0 || j > rows - 1) {
        return -1;
    }
    // Else, return corresponding index of element
    return i + j * cols;
}

function draw() {
    background(150);

    for (var i = 0; i < cell_grid.length; i++) {
        cell_grid[i].show();
    }

    current_cell.visited = true;
    current_cell.highlight(); 

    var next = current_cell.checkNeighbors();

    if (next) {
        next.visited = true;

        // The current cell is pushed to the stack
        stack.push(current_cell);

        // Removes the correct walls between the cells
        remove_walls(current_cell, next);

        current_cell = next;
    } else if (stack.length > 0) {
        current_cell = stack.pop();
    }

}

// a = origin cell, b = cell to be visited
function remove_walls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }

}