var ship;
var aster = [];
var laser = [];

function setup() {
  createCanvas(400, 400);
  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    aster.push(new Asteroid());
  }
}

function draw() {
  background(0);
  
  for(let i = 0; i < aster.length; i++){
    if(ship.hits(aster[i])){
      console.log('oops');
    }
  }
  
  ship.render();
  ship.control();
  ship.update();

  for (let i = aster.length - 1; i >= 0; i--) {
    aster[i].render();
    aster[i].update();
  }

  for (let i = laser.length - 1; i >= 0; i--) {
    laser[i].render();
    laser[i].update();
    if (laser[i].offscreen()) {
      laser.splice(i, 1);
    } else {
      for (let j = aster.length - 1; j >= 0; j--) {
        if (laser[i].hits(aster[j])) {
          if (aster[j].r > 10) {
            var newAsteroids = aster[j].breakup();
            aster = aster.concat(newAsteroids);
          }
          aster.splice(j, 1);
          laser.splice(i, 1);
          break;
        }
      }
    }
  }
}
