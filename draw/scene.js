'use strict';
var Position = require('./position');

class Scene {
  constructor(canvasElement, width, height) {
    if(!canvasElement.getContext) throw 'This element is not canvas!'
    this.width = width || document.documentElement.clientWidth - 4;
    this.height = height || document.documentElement.clientHeight - 4;
    this.wallEnergyAbsorption = 1.5;
    this.fps = 60;
    this.gravity = 10/60;

    this.canvas = canvasElement;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext('2d');
    this.defaultCompositeOperation = this.context.globalCompositeOperation;
    this.composition = [];
    this.construction = [];
    this.color = 'rgb(255, 255, 255)';
  }

  clearScene() {
    this.context.globalCompositeOperation = this.defaultCompositeOperation;
    this.context.fillStyle = this.color;
    this.context.fillRect(0, 0, this.width, this.height);
    // this.context.globalCompositeOperation = 'lighter';
  }

  add(drawable) {
    if(drawable.draw && drawable.isDead) {
      if(drawable.hasCollision) {
        this.construction.push(drawable);
      } else {
        this.composition.push(drawable);
      }
    } else {
      throw 'Element is not drawable!'
    }
  }

  draw() {
    this.clearScene();

    for(var i = 0; i < this.construction.length; i++) {
      if(this.construction[i].isDead()) {
        this.construction.splice(i, 1);
      } else {
        this.construction[i].draw();
      }
    }

    for(var i = 0; i < this.composition.length; i++) {
      if(this.composition[i].isDead()) {
        this.composition.splice(i, 1);
      } else {
        this.composition[i].draw();
        this.composition[i].updatePosition();
      }
    }
  }

  getCenter() {
    return new Position(this.width / 2, this.height / 2);
  }
}

module.exports = Scene;
