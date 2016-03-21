var Scene = require('./scene');
var Position = require('./position');

class Pendulum {
  constructor(scene, position, length, angle) {
    if(!scene instanceof Scene) throw 'This is not valid Scene object!';
    if(!position instanceof Position) throw 'This is not an Position object!';

    this.scene = scene;

    this.length = length;
	  this.g = scene.gravity * scene.fps * 100;
		this.angle = angle || 0;
		this.velocity = 0;
    this.initalX = position.x;
    this.initalY = position.y;

    this.basisPosition = position;
    this.bobPosition = new Position(this.initalX, this.initalY);
    this.strokeColor = "white";
    this.bobColor = "red";
    this.radius = 10;
  }

  draw() {
    this.scene.context.strokeStyle = this.strokeColor;
    this.scene.context.lineWidth = this.radius/4;
    this.scene.context.beginPath();
    this.scene.context.moveTo(this.basisPosition.x, this.basisPosition.y);
    this.scene.context.lineTo(this.bobPosition.x, this.bobPosition.y);
    this.scene.context.stroke();

    this.scene.context.beginPath();
    this.scene.context.arc(this.bobPosition.x, this.bobPosition.y, this.radius, 0, Math.PI * 2, false);
    this.scene.context.fillStyle = this.bobColor;
    this.scene.context.fill();
  }

  isDead() {
    return false;
  }

  updatePosition(){
    let acceleration = this.g * Math.cos(this.angle) / this.scene.fps;
		this.velocity += acceleration / this.scene.fps;
    this.angle += this.velocity / this.scene.fps;
    this.bobPosition.x = this.initalX + this.length * Math.cos(this.angle);
    this.bobPosition.y = this.initalY + this.length * Math.sin(this.angle);
  }

}

module.exports = Pendulum;
