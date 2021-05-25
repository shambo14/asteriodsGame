function Asteroid(pos, r){
  if(pos){
    this.pos = pos.copy();
  } else{
  this.pos = createVector(random(width), random(height));
  }
  
  if(r){
    this.r = r * 0.5;
  } else {
    this.r = random(15,50);
  }
  this.vel = p5.Vector.random2D();
  
  this.total = floor(random(5,15));
  this.offset = [];
  for(var i = 0; i < this.total; i++){
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.render = function () {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    //ellipse(0,0,50,50);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  };

  this.update = function () {
    this.pos.add(this.vel);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.x < 0) this.pos.x = width;
  }

  this.breakup = function () {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  };
}
