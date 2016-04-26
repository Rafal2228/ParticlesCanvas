var Position = require('./position');
var Scene = require('./scene');
var Cell = require('./cell');

class GameOfLife {
  constructor(scene) {
    if(!scene instanceof Scene) throw 'This is not a scene object!'

    this.scene = scene;
    this.width = scene.width;
    this.height = scene.height;
    this.numX = Math.floor(this.width / 10);
    this.numY = Math.floor(this.height / 10);
    // this.numX = 9;
    // this.numY = 9;
    this.cells = new Array(this.numX);
    for (let i = 0; i < this.numX; i++)
      this.cells[i] = new Array(this.numY);

    for (let y = 0; y < this.numY; y ++)
      for (let x = 0; x < this.numX; x ++) {
        this.cells[x][y] = new Cell(this.scene, 10, 10, new Position(x * 10,y * 10));
        if (Math.random() > .5) this.cells[x][y].switch();
      }

    // this.cells[3][3].switch();
    // this.cells[3][4].switch();
    // this.cells[3][5].switch();
  }

  update(currentX, currentY) {
    let sum = 0;
    for (let y = -1; y < 2; y++)
      for (let x = -1; x < 2; x++)
        if (x != 0 || y != 0)
          if (this.cells[currentX + x] && this.cells[currentX + x][currentY + y])
            if (this.cells[currentX + x][currentY + y].alive) sum++;

    if (sum < 2 && this.cells[currentX][currentY].alive)
      this.cells[currentX][currentY].planToSwitch = true;
    else if (sum > 3 && this.cells[currentX][currentY].alive)
      this.cells[currentX][currentY].planToSwitch = true;
    else if (sum == 3 && !this.cells[currentX][currentY].alive)
      this.cells[currentX][currentY].planToSwitch = true;
  }

  draw() {
    for (let y = 0; y < this.numY; y ++)
      for (let x = 0; x < this.numX; x ++)
        this.cells[x][y].draw();
  }

  updatePosition(){
    for (let y = 0; y < this.numY; y ++)
      for (let x = 0; x < this.numX; x ++)
        this.update(x, y);
  }

  isDead() {
    return false;
  }
}

module.exports = GameOfLife;
