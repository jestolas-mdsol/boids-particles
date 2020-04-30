'use strict'

let boids = [];
let boidCount = 100;

function setup() {
  createCanvas(640, 480);

  for (var i=1;i < boidCount; i++) {
    boids.push(new Boid());
  }
}

function draw() {
  background(51);

  boids.forEach(function(boid) {
    boid.edges();
    boid.flock(boids);
    boid.update();
    boid.render();
  });
}
