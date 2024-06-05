class Agent {
    constructor(x, y, grid) {
        this.grid = grid;
        // All the usual stuff
        this.coords = createVector(x, y);
        this.grid_pos = createVector(0, 0);
        this.convert_coords_to_grid_cells();
        this.r = 12;
        this.maxspeed = 3; // Maximum speed
        this.maxforce = 0.2; // Maximum steering force
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);

        // test val
        this.theta = 0;
    }

    wave_move() {
        // Increment theta (try different values for
        // 'angular velocity' here)
        let amplitude = 75.0;
        this.theta += 0.2;

        this.coords.x = this.theta;
        this.coords.y = sin(this.coords.x) * amplitude + width/2;

        this.convert_coords_to_grid_cells();
        console.log(this.coords.x, this.coords.y);
        console.log(this.grid_pos.x, this.grid_pos.y);
      }
    
    convert_coords_to_grid_cells() {
        this.grid_pos.x = Math.round(
            this.coords.x / this.grid.res);
        this.grid_pos.y = Math.round(
            this.coords.y / this.grid.res);
    }

    display() {
        this.grid.display_cell(
            this.grid_pos.x,
            this.grid_pos.y
        );
    }
}