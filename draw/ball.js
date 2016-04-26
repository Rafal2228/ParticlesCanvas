class Ball {
  constructor(scene, position, radius, mass, angle, type) {
    this.scene = scene;
    this.position = position;
    this.radius = radius;
    this.mass = mass;
    this.velocity = 0;
    this.angle = angle;
    this.image = new Image();
    this.image.src = "assets/ball.svg";
    this.circutference = 2 * Math.PI * this.radius;
    this.rotation = 0;
    switch(type) {
      case 'ball': this.momentOfInertia = 2/5; return;
      case 'cylinder': this.momentOfInertia = 1/2; return;
    }
  }

  draw() {
    this.scene.context.save();
    this.scene.context.translate(this.position.x, this.position.y);
    this.scene.context.rotate(this.rotation * Math.PI/180);
    this.scene.context.drawImage(this.image, -this.radius, -this.radius, 2*this.radius, 2*this.radius);
    this.scene.context.restore();
  }

  isDead() {
    return false;
  }

  updatePosition() {
    if (this.position.y + 100 > this.scene.height) return;
    let len = this.scene.gravity * Math.sin(this.angle) / (1 + this.momentOfInertia);
    this.velocity += len;
    this.rotation += (this.velocity / this.circutference) * 360;
    this.position.x += Math.sin(this.angle) * this.velocity;
    this.position.y += Math.cos(this.angle) * this.velocity;
  }

}

module.exports = Ball;
