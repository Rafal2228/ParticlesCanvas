var Position = require('./position');
var Scene = require('./scene');

class BoundingBox {
  constructor(scene, width, height, position) {
    if(!scene instanceof Scene) throw 'This is not a scene object!'
    if(!position instanceof Position) throw 'This is not valid position object!'

    this.scene = scene;
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = 'rgb(100,100,100)';
    this.energyAbsorption = .8;
  }

  draw() {
    this.scene.context.fillStyle = this.color;
    this.scene.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  isDead() {
    return false;
  }

  hasCollision(position) {
    if(!position instanceof Position) throw 'This is not valid position object!'
    else {
      if(position.y < this.position.y) {
        if (
          position.y + position.vy > this.position.y &&
          position.x + position.vx > this.position.x &&
          position.x + position.vx < this.position.x + this.width
        ) {
          position.vy = -position.vy / this.energyAbsorption;
          return true;
        }
      } else if (position.y > this.position.y + this.height) {
        if (
          position.y + position.vy < this.position.y + this.height &&
          position.x + position.vx > this.position.x &&
          position.x + position.vx < this.position.x + this.width
        ) {
          position.vy = -position.vy / this.energyAbsorption;
          return true;
        }
      } else if (position.x < this.position.x) {
        if (
          position.x + position.vx > this.position.x &&
          position.y + position.vy > this.position.y &&
          position.y + position.vy < this.position.y + this.height
        ) {
          position.vx = -position.vx / this.energyAbsorption;
          return true;
        }
      } else if (position.x > this.position.x + this.width) {
        if (
          position.x + position.vx < this.position.x + this.width &&
          position.y + position.vy > this.position.y &&
          position.y + position.vy < this.position.y + this.height
        ) {
          position.vx = -position.vx / this.energyAbsorption;
          return true;
        }
      }

      return false;
    }
  }
}

module.exports = BoundingBox;
