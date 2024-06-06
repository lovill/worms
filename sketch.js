let g;
let a;
let res = 2;
let pad = res;
let i = 0;

let sep_slider1;
let seek_slider2;
let des_sep_slider3;

let agents = [];
let n_agents = 800;

function setup() {
  createCanvas(400, 400);
  g = new Grid(res, width, height, pad);
  a1 = new Agent(width/2, height/2, g);
  a2 = new Agent(300, height/2, g);

  sep_slider1 = createSlider(0.1, 8, 5);
  seek_slider2 = createSlider(0.01, 5, 2);
  des_sep_slider3 = createSlider(0.01, 80, 10);

  for (let i = 0; i < n_agents; i++) {
    agents.push(
      new Agent(
          random(width), 
          random(height),
          g
        )
      );
  }
}

function draw() {
  background(0);
  // g.display_squares();
  // g.display_centers();

  // a1.wave_move();

  for (let a of agents) {
    a.applyBehaviors(agents);
    a.update();
    // a.borders();
    // a.borders_within();
    a.convert_coords_to_grid_cells();
    a.display();
  }

}
