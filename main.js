var Position = require('./draw/position');
var Scene = require('./draw/scene');
var Particle = require('./draw/particle');
var BoundingBox = require('./draw/bounding_box');

var main = new Scene(document.getElementById('canv'));

main.add(new BoundingBox(main, 100, 100, new Position(100, main.height - 400)));
main.add(new BoundingBox(main, 100, 100, new Position(main.width - 200, main.height - 400)));

setInterval(function() {
  main.draw()
  main.add(new Particle(main))
}, 1000/main.fps);
