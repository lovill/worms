class Agent {
    constructor(x, y, grid) {
        this.grid = grid;
        // All the usual stuff
        this.coords = createVector(x, y);
        this.grid_pos = createVector(0, 0);
        this.convert_coords_to_grid_cells();
        this.r = 30;
        this.maxspeed = 2; // Maximum speed
        this.maxforce = 0.4; // Maximum steering force
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

        // this.convert_coords_to_grid_cells();
        console.log(this.coords.x, this.coords.y);
        console.log(this.grid_pos.x, this.grid_pos.y);
      }

    applyBehaviors(agents) {

        let separateForce = this.separate(agents);
        let seekForce = this.seek(createVector(mouseX, mouseY));
        let bounce_walls = this.boundaries();
    
        separateForce.mult(sep_slider1.value());
        seekForce.mult(seek_slider2.value());
        // console.log(bounce_walls);
        bounce_walls.mult(1.);
    
        this.applyForce(separateForce);
        this.applyForce(seekForce);
        this.applyForce(bounce_walls);
    }
    
    applyForce(force) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(force);
    }

    // Separation
    // Method checks for nearby vehicles and steers away
    separate(vehicles) {
        let desiredseparation = des_sep_slider3.value();
        let sum = createVector();
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < vehicles.length; i++) {
        let d = p5.Vector.dist(this.coords, vehicles[i].coords);
        // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
        if ((d > 0) && (d < desiredseparation)) {
            // Calculate vector pointing away from neighbor
            let diff = p5.Vector.sub(this.coords, vehicles[i].coords);
            diff.normalize();
            diff.div(d); // Weight by distance
            sum.add(diff);
            count++; // Keep track of how many
        }
        }
        // Average -- divide by how many
        if (count > 0) {
        sum.div(count);
        // Our desired vector is the average scaled to maximum speed
        sum.normalize();
        sum.mult(this.maxspeed);
        // Implement Reynolds: Steering = Desired - Velocity
        sum.sub(this.velocity);
        sum.limit(this.maxforce);
        }
        return sum;
    }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
    seek(target) {
        // let desired = p5.Vector.sub(target, this.coords); // A vector pointing from the location to the target
        let desired = p5.Vector.sub(this.coords, target); // A vector pointing from the location to the target

        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); // Limit to maximum steering force
        return steer;
    }

    // Method to update location
    update() {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.coords.add(this.velocity);
        // Reset accelertion to 0 each cycle
        this.acceleration.mult(0);
        this.convert_coords_to_grid_cells();
    }
    
    convert_coords_to_grid_cells() {
        this.grid_pos.x = Math.round(
            this.coords.x / this.grid.res);
        this.grid_pos.y = Math.round(
            this.coords.y / this.grid.res);
    }

    display() {
        // console.log(
        //     this.grid_pos.x,
        //     this.grid_pos.y
        // )
        // console.log(
        //     this.coords.x,
        //     this.coords.y
        // )
        this.grid.display_cell(
            this.grid_pos.x,
            this.grid_pos.y
        );
    }
    borders() {
        if (this.coords.x < this.r) {
            this.coords.x = width - this.r;
        }
        if (this.coords.y < this.r) {
            this.coords.y = height - this.r;
        }
        if (this.coords.x > width - this.r) {
            this.coords.x = this.r;
        }
        if (this.coords.y > height - this.r) {
            this.coords.y = this.r;
        }
    }

    borders_within() {
        if (this.coords.x < this.r) {
            this.coords.x = this.r;
            this.velocity.x *= -1;
        }
        if (this.coords.y < this.r) {
            this.coords.y = this.r;
            this.velocity.y *= -1;
        }
        if (this.coords.x > width - this.r) {
            this.coords.x = width - this.r;
            this.velocity.x *= -1;
        }
        if (this.coords.y > height - this.r) {
            this.coords.y = height - this.r;
            this.velocity.y *= -1;
        }
    }

    boundaries() {

        let desired = null;
        let steer = createVector(0,0);
        // console.log(steer);
        if (this.coords.x < this.r) {
            this.coords.x = this.r;
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.coords.x > width - this.r) {
            this.coords.x = width - this.r;
            desired = createVector(-this.maxspeed, this.velocity.y);
        }
    
        if (this.coords.y < this.r) {
            this.coords.y = this.r;
            desired = createVector(this.velocity.x, this.maxspeed);
        } else if (this.coords.y > height - this.r) {
            this.coords.y = height - this.r;
            desired = createVector(this.velocity.x, -this.maxspeed);
        }
        // console.log(steer);
        
        if (desired !== null) {
          desired.normalize();
          desired.mult(this.maxspeed);
          steer = p5.Vector.sub(desired, this.velocity);
          steer.limit(this.maxforce);
            // console.log(steer);

        //   this.applyForce(steer);
        }
        return steer;
      }
}