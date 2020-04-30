'use strict'

class Boid {
  constructor() {
    // this.position = createVector(width / 2, height / 2); // particle explosion
    this.position = createVector(random(width), random(height));
    this.maxForce =  0.2;
    this.minSpeed = 2;
    this.maxSpeed = 4;
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(this.minSpeed, this.maxSpeed)); // particle explosion
    this.acceleration = createVector();
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(boids) {
    let perception = 50;
    let steeringVector = createVector();
    let total = 0;

    for (let other of boids) {
      let distance = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if (other != this && distance < perception) {
        steeringVector.add(other.velocity);
        total ++;
      }
    }

    if (total > 0) {
      steeringVector.div(total);
      steeringVector.setMag(this.maxSpeed);
      steeringVector.sub(this.velocity);
      steeringVector.limit(this.maxForce);
    }

    return steeringVector;
  }

  cohesion(boids) {
    let perception =100;
    let steeringVector = createVector();
    let total = 0;

    for (let other of boids) {
      let distance = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if (other != this && distance < perception) {
        steeringVector.add(other.position);
        total ++;
      }
    }

    if (total > 0) {
      steeringVector.div(total);
      steeringVector.sub(this.position);
      steeringVector.setMag(this.maxSpeed);
      steeringVector.sub(this.velocity);
      steeringVector.limit(this.maxForce);
    }

    return steeringVector;
  }

  separation(boids) {
    let perception = 50;
    let steeringVector = createVector();
    let total = 0;

    for (let other of boids) {
      let distance = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if (other != this && distance < perception) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(distance);
        steeringVector.add(diff);
        total ++;
      }
    }

    if (total > 0) {
      steeringVector.div(total);
      steeringVector.setMag(this.maxSpeed);
      steeringVector.sub(this.velocity);
      steeringVector.limit(this.maxForce);
    }

    return steeringVector;
  }

  flock(boids) {
    let alignment = this.align(boids);
    // this.acceleration = alignment;
    let cohesion = this.cohesion(boids);
    // this.acceleration = cohesion;
    let separation = this.separation(boids);
    // this.acceleration = separation;

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  render() {
    strokeWeight(12);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}
