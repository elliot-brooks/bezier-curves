function setup() {
  createCanvas(800, 800);
  vertex1 = new CurveVertex(100,400, 15, 15);
  vertex2 = new CurveVertex(700,400, 15, 15);

  controlPoint1 = new CurveVertex(200,300, 15, 15);
  controlPoint2 = new CurveVertex(600,500, 15, 15);

  vertecies = [];

}

function draw() {
  background(220);

  vertex1.over();
  vertex1.update();
  vertex1.show();

  vertex2.over();
  vertex2.update();
  vertex2.show();

  controlPoint1.over();
  controlPoint1.update();
  controlPoint1.show();

  controlPoint2.over();
  controlPoint2.update();
  controlPoint2.show();

  noFill();
  bezier(vertex1.x, vertex1.y, controlPoint1.x,controlPoint1.y ,controlPoint2.x,controlPoint2.y,vertex2.x,vertex2.y);
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

