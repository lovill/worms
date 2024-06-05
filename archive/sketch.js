function setup() {
    createCanvas(400, 400);
  }
  
function draw() {
  background(220);


  let res = 20;
  let pad = res/2;
  let n_cols = width/res;
  let n_rows = height/res;

  for (let x=0; x<n_cols; x++) {
    // console.log(x);

    for (let y=0; y<n_rows; y++) {

      // x = x + pad;
      // y = y + pad;

      noStroke();
      fill('red');
      rect(
        x * res + pad - res*0.9/2, 
        y * res + pad - res*0.9/2, 
        res*0.9
      );
      fill('white');
      ellipse(
        x * res + pad, 
        y * res + pad, 
        5);
    }
    

    }
  }