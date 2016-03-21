var Position = require('./draw/position');
var Scene = require('./draw/scene');
var Particle = require('./draw/particle');
var BoundingBox = require('./draw/bounding_box');
var Pendulum = require('./draw/pendulum');

var main = new Scene(document.getElementById('canv'));

// main.add(new BoundingBox(main, 100, 100, new Position(100, main.height - 400)));
// main.add(new BoundingBox(main, 100, 100, new Position(main.width - 200, main.height - 400)));
//
// var i = 0;
// setInterval(function() {
//   main.draw()
//   if(i % 10 == 0) {
//     let p = new Particle(main);
//     main.add(p);
//     p.generateMomentum(10);
//   }
//   i++;
// }, 1000/main.fps);

main.add(new Pendulum(main, main.getCenter(), 300, -.3 * Math.PI));
main.color = 'rgba(28, 28, 28, 0.5)';

setInterval(function() {
 main.draw();
}, 1000/main.fps);
