(function() {
  var canvas = document.getElementById('canv');
  if(canvas.getContext) {

    var globals = {
      context: canvas.getContext('2d'),
      width: document.documentElement.clientWidth - 4,
      height: document.documentElement.clientHeight - 4,
      fps: 60,
      gravity: 10/60,
      numOfParticles: 1500,
      wallEnergyAbsorption: 1.5,
      blockEnergyAbsorption: .8,
      powerToDie: 50,
      particleEnergy: 10
    }

    canvas.width = globals.width;
    canvas.height = globals.height;

    var Scene = function(context) {
      this.context = context;
      this.defaultCompositeOperation = globals.context.globalCompositeOperation;
      this.composition = [];
      this.construction = [];
    }

    Scene.prototype.clearScreen = function() {
      this.context.globalCompositeOperation = this.defaultCompositeOperation;
      this.context.fillStyle = 'rgb(28, 28, 28)';
      this.context.fillRect(0, 0, globals.width, globals.height);
      this.context.globalCompositeOperation = 'lighter';
    }

    Scene.prototype.add = function(drawable) {
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

    Scene.prototype.draw = function() {
      this.clearScreen();

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
          this.composition.push(new Particle(this));
        } else {
          this.updatePosition(this.composition[i])
          this.composition[i].draw();
        }
      }
    }

    Scene.prototype.updatePosition = function(element) {
      if(element.position.x < 0) {
        element.position.x = 0;
        element.position.vx = -element.position.vx / globals.wallEnergyAbsorption;
      }

      if(element.position.x > globals.width) {
        element.position.x = globals.width;
        element.position.vx = -element.position.vx / globals.wallEnergyAbsorption;
      }

      if(element.position.y > globals.height) {
        element.position.y = globals.height;
        element.position.vy = -element.position.vy / globals.wallEnergyAbsorption;
      }

      var had = false;
      for(var i = 0; i < this.construction.length; i++) {
        if(this.construction[i].hasCollision(element.position)) {
          had = true;
          break;
        }
      }
      if(!had) {
        element.position.x += element.position.vx;
        element.position.y += element.position.vy;
      }

      element.position.vy += globals.gravity
    }

    var Position = function(center) {
      this.x = center ? globals.width/2 : 0;
      this.y = center ? globals.height/2 : 0;
      this.vx = 0;
      this.vy = 0;
    }

    Position.prototype.generateMomentum = function(energy) {
      this.vx = (100 * energy * Math.random() - (50 * energy)) / globals.fps;
      this.vy = - globals.height * Math.random() / globals.fps;
    }

    var Particle = function(scene) {
      this.scene = scene;
      this.context = scene.context;
      this.color = 'rgba(' + Math.floor(255 * Math.random()) + ', ' + Math.floor(255 * Math.random()) + ', ' + Math.floor(255 * Math.random()) + ', ' + Math.random() + ')';
      this.radius = 3;
      this.position = new Position(true);
      this.position.generateMomentum(globals.particleEnergy);
    }

    Particle.prototype.draw = function() {
      this.context.beginPath();
      this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
      this.context.fillStyle = this.color;
      this.context.fill()
    }

    Particle.prototype.isDead = function() {
      var x = Math.abs(this.position.vx);
      var y = Math.abs(this.position.vy);
      return ((x * x + y * y) < globals.powerToDie) && this.position.y + 10 > globals.height;
    }

    var BoundingBox = function(context, posx, posy, width, height) {
      this.context = context;

      this.position = new Position(false);
      this.position.x = posx;
      this.position.y = posy;
      this.width = width;
      this.height = height;
      this.color = 'white';
      this.energyAbsorption = globals.blockEnergyAbsorption;
    }

    BoundingBox.prototype.draw = function() {
      this.context.fillColor = this.color;
      this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    BoundingBox.prototype.isDead = function() {
      return false;
    }

    BoundingBox.prototype.hasCollision = function(position) {
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

    var scene = new Scene(globals.context);

    for(var i = 0; i < globals.numOfParticles; i++)
      scene.add(new Particle(scene))

    scene.add(new BoundingBox(globals.context, 100, globals.height - 400, 100, 100));
    scene.add(new BoundingBox(globals.context, globals.width - 200, globals.height - 400, 100, 100));

    setInterval(function() {
      scene.draw()
    }, 1000/globals.fps);

  } else {
    window.alert('No context')
  }
})();
