let g;
let a;
let res = 8;
let pad = res;
let i = 0;

function setup() {
  createCanvas(400, 400);
  g = new Grid(res, width, height, pad);
  a = new Agent(width/2, height/2, g);
}

function draw() {
  background(0);
  // g.display_squares();
  // g.display_centers();

  a.wave_move();
  a.display();


  if (i >= g.n_cols) {
    i = 0;
  }
  g.display_cell(i,i);
  i++;
}
