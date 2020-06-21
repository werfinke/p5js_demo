var img = []; // Declare variable 'img'.

function setup() {
  createCanvas(400, 400);
 /* for (var i = 0; i < 16; i++) {
  	var stg = "images/Memory" + (i+1) + ".jpg";
    img[i] = loadImage(stg); // Load the image
  } 
 */
  img[0] = loadImage("images/Memory1.jpg"); // Load the image
  img[1] = loadImage("images/Memory2.jpg"); // Load the image
  img[2] = loadImage("images/Memory3.jpg"); // Load the image
  img[3] = loadImage("images/Memory4.jpg"); // Load the image
  img[4] = loadImage("images/Memory5.jpg"); // Load the image
  img[5] = loadImage("images/Memory6.jpg"); // Load the image
  img[6] = loadImage("images/Memory7.jpg"); // Load the image
  img[7] = loadImage("images/Memory8.jpg"); // Load the image
  
}

function draw() {
	
  // Displays image
  for (var i = 0; i < 2; i++) {
   for (var j = 0; j < 4; j++) {
    image(img[4*i + j], i * 100, j * 100);
   }
  } /*
    image(img[0], 0, 0);
    image(img[4], 0, 100);
    image(img[1], 100, 100);
    image(img[2], 200, 200);
    image(img[3], 300, 300);
  */
}