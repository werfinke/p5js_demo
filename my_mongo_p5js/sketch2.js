let userData;
let usaGeoData;
let index;
let i;
let k;
let j;
let j2;
let coordPoint = [0,0];

function preload() {
  // Mongo Daten
  let api_url = 'http://localhost:8000/covid'; 
  httpGet(api_url, 'json', false, function(response) { 
  	userData = response; 
  });
  // Geo Daten
  let usa_url = 'http://localhost:8000/usa'; 
  httpGet(usa_url, 'json', false, function(response) { 
	  usaGeoData = response; 
  }); 
} 

function setup() { 
index = 0;
i = 0;
k = 0;
j = 0;
j2 = 0;
var canvas = createCanvas(500, 500); 
canvas.parent('meincanvas');
frameRate(2);
textSize(24); 
text("Please wait - loading ...", 220, 200); 

} 

function draw() {
// Warte bis Daten geladen sind
  if (!usaGeoData) 
	  return;
  if (!userData) 
    return;
  clear(); 
  noFill();
  rect(0,0,500,500);
  // Berechne Mittelpunkt der Staaten j
  if (userData.data[j].loc_min_x != null && userData.data[j].loc_max_x != null) {
    coordPoint = calcStateCoordinate(
      userData.data[j].loc_min_x,userData.data[j].loc_min_y,
      userData.data[j].loc_max_x,userData.data[j].loc_max_y
      );
  } else {
    coordPoint = [0,0];
  }
// Zeichne Kreise
  stroke('black');
  fill('yellow');
  if (userData.data[j]._id === "Alaska" ||
      userData.data[j]._id === "Hawaii" ) {
      drawCircle(userData.data[j],coordPoint[0],coordPoint[1],"pop",820,5,655,9,100000);
    } else {   
      drawCircle(userData.data[j],coordPoint[0],coordPoint[1],"pop",1020,8,790,12,100000);
  }
  fill('orange');
  if (userData.data[j]._id === "Alaska" ||
      userData.data[j]._id === "Hawaii" ) {
      drawCircle(userData.data[j],coordPoint[0],coordPoint[1],"covid",820,5,655,9,25000);
    } else {
      drawCircle(userData.data[j],coordPoint[0],coordPoint[1],"covid",1020,8,790,12,25000);
  }
// Berechne USA Daten gesamt
  let totalDeaths = 0;
  let totalPop = 0;
  for (let n = 0; n < userData.data.length; n++) {
    totalDeaths = totalDeaths + userData.data[n].deaths; 
    totalPop = totalPop + userData.data[n].pop; 
  }
// Schreibe Text in Canvas
  fill('black');
  strokeWeight(0);
  textSize(14); 
  text(userData.data[j].date[8] + userData.data[j].date[9] + "." + 
       userData.data[j].date[5] + userData.data[j].date[6] + "." + 
       match(userData.data[j].date,'^....'), 420, 18); 
  textSize(18); 
  text("Population USA: "
    + Math.floor(totalPop/1000000) + " (in millions)", 140, 20); 
  text("Deaths USA: "
    + totalDeaths, 190, 60); 
  text("US State: "
    + userData.data[j]._id, 190, 100); 
  text("Population: "
    + Math.floor(userData.data[j].pop/1000) + " (in thousands)", 190, 120);
  if (userData.data[j].pop > 0) {    
    text("Covid conf.: "
      + Math.floor(userData.data[j].confirmed/1000) + " (in thousands) " + 
      Math.floor(100 * userData.data[j].confirmed/userData.data[j].pop) + " %", 190, 140); 
  } else {
    text("Covid conf.: "
      + Math.floor(userData.data[j].confirmed/1000) + " (in thousands) " , 190, 140); 
  }
  text("Covid deaths: "
    + userData.data[j].deaths, 190, 160);
// Zeichne Staaten
  stroke('blue');
  strokeWeight(1);
  for (let s = 0; s < usaGeoData.data.features.length; s++) {
    if (usaGeoData.data.features[s].properties.name === "Alaska" ||
        usaGeoData.data.features[s].properties.name === "Hawaii" ) {
      drawgeojsonCollection(usaGeoData,s,820,5,655,9);
    } else {
      drawgeojsonCollection(usaGeoData,s,1020,8,790,12);
    }
  }
// Nächster Staat alle 3 Sekunden
  j2 = j2 + 0.4;
  j = Math.floor(j2);
  if ( j >= userData.data.length) {
    j = 0;
    j2 = 0;
  }

}
/*** End Function draw */

function drawCircle(uData,xCoord,yCoord,str,xPosKorr,xScaleKorr,yPosKorr,yScaleKorr,korr) {
// pop = Population
// else => confirmed
  if (str ==="pop") {
    circle(xPosKorr + xScaleKorr * xCoord,
          yPosKorr - yScaleKorr * yCoord,
          uData.pop / korr);
  } else {
    circle(xPosKorr + xScaleKorr * xCoord,
          yPosKorr - yScaleKorr * yCoord,
          uData.confirmed / korr);
  }
}
/*** End Function drawCircle */

function drawgeojsonCollection(geojsonData,ind,xPosKorr,xScaleKorr,yPosKorr,yScaleKorr) {
  if (geojsonData.data.features[ind].geometry.type === "Polygon" || 
      geojsonData.data.features[ind].geometry.type === "MultiPolygon") {
    if (geojsonData.data.features[ind].geometry.type == "Polygon") {
      for (let i = 0; i < geojsonData.data.features[ind].geometry.coordinates.length; i++) {
        for (let k = 0; k < geojsonData.data.features[ind].geometry.coordinates[i].length-1; k++) {
          line(xPosKorr + xScaleKorr * geojsonData.data.features[ind].geometry.coordinates[i][k][0], yPosKorr - yScaleKorr * geojsonData.data.features[ind].geometry.coordinates[i][k][1],
            xPosKorr + xScaleKorr * geojsonData.data.features[ind].geometry.coordinates[i][k+1][0], yPosKorr - yScaleKorr * geojsonData.data.features[ind].geometry.coordinates[i][k+1][1]);
        }
      }        
    } else {
      for (let i = 0; i < geojsonData.data.features[ind].geometry.coordinates.length; i++) {
        for (let k = 0; k < geojsonData.data.features[ind].geometry.coordinates[i][0].length-1; k++) {
          line(xPosKorr + xScaleKorr * geojsonData.data.features[ind].geometry.coordinates[i][0][k][0], yPosKorr - yScaleKorr * geojsonData.data.features[ind].geometry.coordinates[i][0][k][1],
            xPosKorr + xScaleKorr * geojsonData.data.features[ind].geometry.coordinates[i][0][k+1][0], yPosKorr - yScaleKorr * geojsonData.data.features[ind].geometry.coordinates[i][0][k+1][1]);
        }
      }
    }
  }    
}
/*** End Function drawgeojsonCollection */

function calcStateCoordinate(xMin,yMin,xMax,yMax) {
  let point = [ 0, 0 ];
  point[0] = 0.5 * ( xMin + xMax );
  point[1] = 0.5 * ( yMin + yMax );
  return point;
}
/*** End Function calcStateCoordinate */
