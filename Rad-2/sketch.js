// Strecke in x-Richtung des Rades
var xStrecke = 0;
// Radius Rad
var radius;
// Durchmesser Rad
var durchmesser;

function setup() {
  createCanvas(800, 400);
  radius = height / 4;
  durchmesser = 2 * radius;
}

function draw() {
  background(230);
// Zeichne Schwarz
  stroke(0);
// Strichstärke
  strokeWeight(4);
// Füllfarbe RGB (Rot,Grün,Blau) jeweils 0-255
  fill(0, 200, 255);
// Zeichne horizontale Linie
  line(0, 3 * height / 4, width, 3 * height / 4);
// Zeichne Kreis
  ellipse(xStrecke + radius, height / 2, durchmesser, durchmesser);
// Zeichne Speichen (4 Linien jeweils um 45 Grad versetzt)
  strokeWeight(2);
  for (var a = 0; a < 180; a += 45) {
      var winkel = radians(a);
      var x = cos(winkel) * durchmesser;
      var y = sin(winkel) * durchmesser;
      line(-x/2 + xStrecke + radius, -y/2 + height / 2, x/2 + xStrecke + radius, y/2 + height / 2);
  }
// Verschiebung um ein Pixel nach rechts
  xStrecke = xStrecke + 1;
}
