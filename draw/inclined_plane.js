class InclinedPlane {

  constructor(scene, position, length, angle) {
    this.scene = scene;
    this.position = position;
    this.length = length;
    this.angle = angle;
    this.strokeColor = 'black';
    this.lineWidth = 2;
  }

  draw(){
    this.scene.context.strokeStyle = this.strokeColor;
    this.scene.context.lineWidth = this.lineWidth;
    this.scene.context.beginPath();
    this.scene.context.moveTo(this.position.x, this.position.y);
    this.scene.context.lineTo(this.position.x + this.length * Math.sin(this.angle), this.position.y + this.length * Math.cos(this.angle));
    this.scene.context.stroke();
  }

  isDead() {
    return false;
  }

  hasCollision(position) {
    return false;
  }

}

module.exports = InclinedPlane;
