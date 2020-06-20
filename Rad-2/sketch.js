//  Strecke in x-Richtung des Rades
var xStrecke = 1.0;
var xStreckeSim = 1.0;
var rueckwaerts = false;
//  Geschwindigkeit
var vSpeed;
//  Winkel Rad
var winkelRad = 0;
//  Radius Rad
var radius = 0;
//  Durchmesser Rad
var durchmesser;
//  Rad steht
var radStop = false;
// Rad steht wenn der Radius verändert wird
var radStopSlider = false;

var pg;

var time = new Date();

var simZeit = 30;
var simZeitAlt = time.getTime();


function setup() {

//  frameRate(30);
//  createCanvas(windowWidth, windowHeight);
  var canvas = createCanvas(800,400);
  canvas.parent('meincanvas');
  textSize(22);
// Neues Grafikobjekt für Kurven
  pg = createGraphics(800, 350);
  pg.background(200,255,200);

  document.getElementById("geschwindigkeit").innerHTML = document.getElementById("slider1").value;
//  xStrecke = parseInt(document.getElementById("slider2").value);
  xStrecke = 30;
  xStreckeSim = 20;
  simZeit = 0;
  document.getElementById("radius").innerHTML = document.getElementById("slider2").value;

// Eventhandler
  document.getElementById("stopbutton").addEventListener('mousedown', functionStop);
  document.getElementById("reversebutton").addEventListener('mousedown', functionRueck);
  document.getElementById("slider2").addEventListener('mousedown', functionStopSliderDown);
  document.getElementById("slider2").addEventListener('mouseup', functionStopSliderUp);

}

function draw() {
  background(230);
// Wert von Slider übernehmen
if (radStop == false) {
    vSpeed = parseInt(document.getElementById("slider1").value);
    if (rueckwaerts == true) {
      vSpeed = vSpeed * -1;
    }
  } else {
    vSpeed = 0;
  }

  radius = parseInt(document.getElementById("slider2").value);
  document.getElementById("geschwindigkeit").innerHTML = document.getElementById("slider1").value;
  document.getElementById("radius").innerHTML = document.getElementById("slider2").value;

  durchmesser = 2 * radius;


  pg.fill(0);
  pg.textSize(12);
  pg.textFont('Helvetica');
  pg.text('300', 7, 30);
  pg.text('Px', 7, 50);
  pg.text('250', 7, 80);
  pg.text('200', 7, 130);
  pg.text('150', 7, 180);
  pg.text('100', 7, 230);
  pg.text('050', 7, 280);
  pg.text('0', 7, 330);
  pg.fill(0,0,255);
  pg.stroke(0, 0, 255);
  pg.text('80 Px/s', 35, 13);
  pg.text('60', 35, 93);
  pg.text('40', 35, 173);
  pg.text('20', 35, 253);
  pg.line(25,10,35,10);
  pg.line(25,90,35,90);
  pg.line(25,170,35,170);
  pg.line(25,250,35,250);
  pg.fill(0);
  pg.stroke(0);
  pg.text('10s', 120, 345);
  pg.text('20s', 220, 345);
  pg.text('30s', 320, 345);
  pg.text('40s', 420, 345);
  pg.text('50s', 520, 345);
  pg.text('60s', 620, 345);
  pg.text('70s', 720, 345);
  pg.line(20,330,780,330);
  pg.line(130,325,130,335);
  pg.line(230,325,230,335);
  pg.line(330,325,330,335);
  pg.line(430,325,430,335);
  pg.line(530,325,530,335);
  pg.line(630,325,630,335);
  pg.line(730,325,730,335);
  pg.line(30,10,30,337);
  pg.line(25,27,35,27);
  pg.line(25,77,35,77);
  pg.line(25,127,35,127);
  pg.line(25,177,35,177);
  pg.line(25,227,35,227);
  pg.line(25,277,35,277);


  if (vSpeed >= 0) {
    // Zeichne Kurvenpunkt Geschwindigkeit
      pg.stroke(50, 50, 255);
    //  pg.line(simZeit, 340 - 2 * vSpeed, simZeit + 1, 340 - 2 * vSpeed);
      pg.ellipse(simZeit*10 + 30, 330 - 4 * vSpeed, 2, 2);
  } else {
    // Zeichne Kurvenpunkt Geschwindigkeit
      pg.stroke(255, 50, 50);
    //  pg.line(simZeit, 340 - 2 * vSpeed, simZeit + 1, 340 - 2 * vSpeed);
      pg.ellipse(simZeit*10 + 30, 330 + 4 * vSpeed, 2, 2);
  }
  // Zeichne Kurvenpunkt Wegstrecke
  pg.stroke(0);
//  pg.line(simZeit, 340 - xStrecke / 2, simZeit +1 , 340 - xStrecke / 2);
  pg.ellipse(simZeit*10 + 30, 335 - xStreckeSim / 4, 1, 1);
// Zeichne in Canvas als Image
  image(pg, 0, 0);

// Zeichne Schwarz
  stroke(0);
// Strichstärke
  strokeWeight(4);
// Füllfarbe RGB (Rot,Grün,Blau) jeweils 0-255
  fill(0, 200, 255, 80);
// Zeichne horizontale Linie
  line(0, height-2, width, height-2);
// Zeichne Kreis
  ellipse(xStrecke, height - radius, durchmesser, durchmesser);
// Verschiebe und rotiere Speichen
  translate(xStrecke, height - radius);
  rotate(winkelRad);
  strokeWeight(2);
  for (var a = 0; a < 180; a += 45) {
      var winkel = radians(a);
      var x = cos(winkel) * durchmesser;
      var y = sin(winkel) * durchmesser;
//      line(-x/2 + xStrecke + radius, -y/2 + 3 * height / 4 - radius, x/2 + xStrecke + radius, y/2 + 3 * height / 4 - radius);
      line(-x/2 ,-y/2, x/2, y/2);
  }

  if (radStop == false) {
// Wenn das Rad nicht angehalten wurde,
// Verschiebung um eine kleine Wegstrecke abhängig von der Geschwindigkeit und der Zeit (1/60 sec)
// Diese Funktion wird 60 mal in der Sekunde durchlaufen
    xStrecke = xStrecke + vSpeed / 60;
    xStreckeSim = xStreckeSim + vSpeed / 60;;
// Drehung um einen kleinen Winkel abhängig von der Geschwindigkeit, der Zeit (1/60 sec) und dem Radius
    winkelRad = winkelRad + vSpeed / (60 * radius);
  }

  var timeAktuell = new Date();
  simZeit = (timeAktuell.getTime() - simZeitAlt) / 1000;
  document.getElementById("simzeit").innerHTML = "Zeit: " + (simZeit - simZeit % 1) + " sec";

  if (simZeit > 77 ) {
    pg.background(200,255,200);
    simZeitAlt = timeAktuell.getTime();
    simZeit = 0;
  }


  // Ein neuer Durchlauf
  if (xStreckeSim > 1200) {
    xStreckeSim =  20;
  }


  if (xStreckeSim < 20) {
    rueckwaerts = false;
  }
  if (xStrecke >= width) {
    xStrecke =  30;
  }
  if (xStrecke < 30) {
    xStrecke =  width;
  }
}



function functionStop() {
  if (radStop == true) {
    radStop = false;
  } else {
    radStop = true;
  }
}

function functionRueck() {
  if (rueckwaerts == true) {
    rueckwaerts = false;
  } else {
    rueckwaerts = true;
  }
}

function functionStopSliderDown() {
  if (radStop == false && radStopSlider == false) {
    radStop = true;
    radStopSlider = true;
  }
}

function functionStopSliderUp() {
  if (radStop == true && radStopSlider == true) {
    radStop = false;
    radStopSlider = false;
  }
}
