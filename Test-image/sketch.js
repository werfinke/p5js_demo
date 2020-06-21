var img = []; // Declare variable 'img'.

function setup() {
  createCanvas(400, 400);
/*  for (var i = 0; i < 16; i++) {
  	var stg = "images/Memory" + (i+1) + ".jpg";
    img[i] = loadImage(stg); // Load the image
  } */
  img[0] = loadImage("images/Memory01.jpg"); // Load the image
  img[1] = loadImage("images/Memory01.jpg"); // Load the image
  img[2] = loadImage("images/Memory01.jpg"); // Load the image
  img[3] = loadImage("images/Memory01.jpg"); // Load the image
  
}

function draw() {
  // Displays image
/*  for (var i = 0; i < 4; i++) {
   for (var j = 0; j < 4; j++) {
    image(img[4*i + j], i * 100, j * 100);
   }
  } */
    image(img[0], 0, 0);
    image(img[1], 100, 100);
    image(img[2], 200, 200);
    image(img[3], 300, 300);
 
}