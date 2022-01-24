function setup() {
  createCanvas(800, 800);

  // points
  vertex1 = new CurveVertex(100,400, 15, 15);
  vertex2 = new CurveVertex(700,400, 15, 15);
  controlPoint1 = new CurveVertex(200,300, 15, 15);
  controlPoint2 = new CurveVertex(600,500, 15, 15);


  // visualisation parameters
  cubicBool = createCheckbox('Cubic?');
  tangentVisualiser = createCheckbox('Visualise Tangents');
  Tslider = createSlider(0.01, 0.5, 0.05,0.005);
}

function draw() {
  noStroke();
  background(0);


  delta = Tslider.value();

  vertex1.over();
  vertex1.update();
  vertex1.show();

  vertex2.over();
  vertex2.update();
  vertex2.show();
  
  controlPoint1.over();
  controlPoint1.update();
  controlPoint1.show();

  if (cubicBool.checked()) {
    controlPoint2.over();
    controlPoint2.update();
    controlPoint2.show();
  }




  // draw points acording to t
  noFill();

  beginShape();

  for (t = 0; t <= 1.00000001; t += delta) {
    if (!cubicBool.checked()) {
      var points = quadraticBezier(t, vertex1, controlPoint1, vertex2);
    }
    else{
      var points = cubicBezier(t, vertex1, controlPoint1, controlPoint2, vertex2);
    }
    vertex(points[0], points[1]);
  }
  vertex(vertex2.x,vertex2.y);
  colorMode(RGB);
  stroke(255);
  strokeWeight(2);
  endShape();



}


function mousePressed() {
  vertex1.pressed();
  vertex2.pressed();
  controlPoint1.pressed();
  controlPoint2.pressed();

}

function mouseReleased() {
  vertex1.released();
  vertex2.released();
  controlPoint1.released();
  controlPoint2.released();
}


function quadraticBezier(t, anchor1, control, anchor2) {
  let x = ((1 - t)**2 * anchor1.x) + 2*(1 - t)*t*control.x + (t**2)*anchor2.x;
  let y = ((1 - t)**2 * anchor1.y) + 2*(1 - t)*t*control.y + (t**2)*anchor2.y;

  if (tangentVisualiser.checked()) {
    let visualiseX = lerp(anchor1.x, control.x, t);
    let visualiseY = lerp(anchor1.y, control.y, t);
    let visualiseX2 = lerp(control.x, anchor2.x, t);
    let visualiseY2 = lerp(control.y, anchor2.y, t);
    colorMode(HSB);
    stroke(t*360, 255, 255, 128, 0.2);
    line(visualiseX,visualiseY,visualiseX2,visualiseY2);

  }



  return [x,y];
}

function cubicBezier(t, anchor1, control1, control2, anchor2) {
  let x = anchor1.x * (1-t)**3 + 3*t*control1.x*(1-t)**2 + (t**2)*3*(1-t)*control2.x + anchor2.x*(t**3);
  let y = anchor1.y * (1-t)**3 + 3*t*control1.y*(1-t)**2 + (t**2)*3*(1-t)*control2.y + anchor2.y*(t**3);

  if(tangentVisualiser.checked()) {
    quad1 = quadraticBezier(t, anchor1, control1, control2);
    quad2 = quadraticBezier(t, control1, control2, anchor2);
    colorMode(HSB);
    stroke(t*360, 255, 255, 128, 0.2);
    line(quad1[0], quad1[1], quad2[0], quad2[1]);

  }

  return [x,y];
}

//bezier(vertex1.x, vertex1.y, controlPoint1.x,controlPoint1.y ,controlPoint2.x,controlPoint2.y,vertex2.x,vertex2.y);
