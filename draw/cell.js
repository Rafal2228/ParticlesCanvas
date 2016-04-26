var Position = require('./position');
var Scene = require('./scene');

class Cell {
  constructor(scene, width, height, position) {
    if(!scene instanceof Scene) throw 'This is not a scene object!'
    if(!position instanceof Position) throw 'This is not valid position object!'

    this.scene = scene;
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = 'rgb(255,255,255)';
    this.alive = false;
    this.planToSwitch = false;
  }

  draw() {
    if (this.planToSwitch) {
      this.planToSwitch = false;
      this.switch();
    }
    this.scene.context.fillStyle = this.color;
    this.scene.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  switch() {
    this.alive = !this.alive;
    if (this.alive) {
      this.color = 'rgb(100,100,100)';
    }
    else {
      this.color = 'rgb(255,255,255)';
    }
  }

  isDead() {
    return false;
  }
}

module.exports = Cell;
