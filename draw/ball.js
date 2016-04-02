class Ball {

  constructor(scene, position, radius) {
    this.scene = scene;
    this.position = position;
    this.radius = radius;
    this.color = 'red';
  }

  draw() {
    this.scene.context.beginPath();
    this.scene.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    this.scene.context.fillStyle = this.color;
    this.scene.context.fill();
  }

  isDead() {
    return false;
  }

  updatePosition() {
    if(this.position.x < 0) {
      this.position.x = 0;
      this.position.vx = -this.position.vx / this.scene.wallEnergyAbsorption;
    }

    if(this.position.x > this.scene.width) {
      this.position.x = this.scene.width;
      this.position.vx = -this.position.vx / this.scene.wallEnergyAbsorption;
    }

    if(this.position.y > this.scene.height) {
      this.position.y = this.scene.height;
      this.position.vy = -this.position.vy / this.scene.wallEnergyAbsorption;
    }

    var had = false;
    for(var i = 0; i < this.scene.construction.length; i++) {
      if(this.scene.construction[i].hasCollision(this.position)) {
        had = true;
        break;
      }
    }
    if(!had) {
      this.position.x += this.position.vx;
      this.position.y += this.position.vy;
    }

    this.position.vy += this.scene.gravity;
  }

}

module.exports = Ball;
