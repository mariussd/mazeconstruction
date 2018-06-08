function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function() {
        var neighbors = [];

        var top = cell_grid[index(i, j - 1)];
        var right = cell_grid[index(i + 1, j)];
        var bottom = cell_grid[index(i, j + 1)];
        var left = cell_grid[index(i - 1, j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            // Picks a random neighbor
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.highlight = function() {
        var y = this.j * cell_width;
        var x = this.i * cell_width;
        noStroke();
        fill(255, 0, 0, 200);
        rect(x, y, cell_width, cell_width);
    }

    this.show = function() {
        var y = this.j * cell_width;
        var x = this.i * cell_width;
        stroke(255);

        if (this.walls[0]) {
            line(x, y, x + cell_width, y);
        }
        if (this.walls[1]) {
            line(x + cell_width, y, x + cell_width, y + cell_width);
        }
        if (this.walls[2]) {
            line(x + cell_width, y + cell_width, x, y + cell_width);
        }
        if (this.walls[3]) {
            line(x, y + cell_width, x, y);
        }

        if (this.visited) {
            noStroke();
            fill(0, 191, 255, 100);
            rect(x, y, cell_width, cell_width);
        }

    }
}