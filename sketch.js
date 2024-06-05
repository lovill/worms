let g;
let a;
let res = 8;
let pad = res;
let i = 0;

let slider1;
let slider2;
let slider3;

let agents = [];

function setup() {
  createCanvas(400, 400);
  g = new Grid(res, width, height, pad);
  a1 = new Agent(width/2, height/2, g);
  a2 = new Agent(300, height/2, g);

  slider1 = createSlider(0, 8, 4);
  slider2 = createSlider(0, 8, 4);
  slider3 = createSlider(10, 160, 24);
}

function draw() {
  background(0);
  // g.display_squares();
  // g.display_centers();

  // a1.wave_move();
  a1.applyBehaviors(a2);
  a1.update();
  a1.borders();
  a1.convert_coords_to_grid_cells();

  a2.applyBehaviors(a1);
  a2.update();
  a2.borders();
  a2.convert_coords_to_grid_cells();
  
  a1.display();
  a2.display();


  // if (i >= g.n_cols) {
  //   i = 0;
  // }
  // g.display_cell(i,i);
  // i++;
}
