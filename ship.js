function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.heading = 0;
  this.vel = createVector(0,0);
  
  this.update = function(){
    this.pos.add(this.vel);
    if(this.pos.x > width) this.pos.x = 0;
    if(this.pos.y > height) this.pos.y = 0;
    if(this.pos.y < 0) this.pos.y = height;
    if(this.pos.x < 0) this.pos.x = width;
  }
  
  this.boost = function(){
    var force = p5.Vector.fromAngle(this.heading - PI/2);
    force.mult(0.1);
    this.vel.add(force);
  }
  
  this.brake = function(){
    var force = p5.Vector.fromAngle(this.heading - 3*PI/2);
    force.mult(0.1);
    this.vel.add(force);
  }

  //render will show the ship on the canvas
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    //print(this.heading);
    rotate(this.heading);
    noFill();
    stroke(255);
    quad(0, -10, -10, 15, 0, 5, 10, 15);
    pop();
  }

  this.control = function() {
    if(keyIsDown(LEFT_ARROW)) ship.turn(-0.1);
    if(keyIsDown(RIGHT_ARROW)) ship.turn(0.1);
    if(keyIsDown(UP_ARROW)) ship.boost();
    if(keyIsDown(DOWN_ARROW)) ship.brake();
    if(keyIsDown(32)) laser.push(new Laser(ship.pos,ship.heading - PI/2));
  }

  this.turn = function(a) {
    this.heading += a;
  }
  
  this.hits = function(asteroid){
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else return false;
  }
}