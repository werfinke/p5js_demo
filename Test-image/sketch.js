var img = []; // Declare variable 'img'.
var firstImage = 0;
var mouseIstGedrueckt = false;
  

function setup() {
  createCanvas(400, 400);

  for (var i = 0; i < 16; i++) {
  	var stg = "images/Memory" + (i+1) + ".jpg";
    img[i] = loadImage(stg); // Load the image
  } 
  firstImage = round(random(0,16));
}

function draw() {

  if (!mouseIstGedrueckt) { 
 
   // Displays image
   for (var i = 0; i < 4; i++) { 
    for (var j = 0; j < 4; j++) {
     image(img[firstImage], i * 100, j * 100);
    }
   }	
  }
}

function mousePressed() {
  mouseIstGedrueckt = true;

  // Displays image
  for (var i = 0; i < 4; i++) {
   for (var j = 0; j < 4; j++) {
    image(img[4*i + j], i * 100, j * 100);
   } 
  }    

}

function mouseReleased() {
   mouseIstGedrueckt = false;
   firstImage = round(random(0,16));
}