var Position = require('./position');
var Scene = require('./scene');

class Particle {
  constructor(scene) {
    if(!scene instanceof Scene) throw 'This is not a scene object!'
    this.scene = scene
    this.color = 'rgba(' + Math.floor(255 * Math.random()) + ', ' + Math.floor(255 * Math.random()) + ', ' + Math.floor(255 * Math.random()) + ', ' + Math.random() + ')';
    this.radius = 3;
    this.position = this.scene.getCenter();
    this.generateMomentum(10);
  }

  generateMomentum(energy) {
    this.position.vx = (100 * energy * Math.random() - (50 * energy)) / this.scene.fps;
    this.position.vy = - this.scene.height * Math.random() / this.scene.fps;
  }

  draw() {
    this.scene.context.beginPath();
    this.scene.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    this.scene.context.fillStyle = this.color;
    this.scene.context.fill();
  }

  isDead() {
    var x = Math.abs(this.position.vx);
    var y = Math.abs(this.position.vy);
    return ((x * x + y * y) < 50) && this.position.y + 10 > this.scene.height;
  }
}

module.exports = Particle;
