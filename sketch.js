let g;
let res = 10;
let pad = res;
let i = 0;

function setup() {
  createCanvas(400, 400);
  g = new Grid(res, width, height, pad);
}

function draw() {
  background(0);
  // g.display_squares();
  // g.display_centers();

  
  if (i >= g.n_cols) {
    i = 0;
  }
  g.display_cell(i,i);
  i++;
}
