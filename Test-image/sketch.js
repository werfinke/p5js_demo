var img = []; // Declare variable 'img'.

function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 16; i++) {
  	var stg = "images/Memory" + (i+1) + ".jpg";
    img[i] = loadImage(stg); // Load the image
  }
}

function draw() {
  // Displays image
  for (var i = 0; i < 4; i++) {
   for (var j = 0; j < 4; j++) {
    image(img[4*i + j], i * 100, j * 100);
   }
  }
}