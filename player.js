/**@type {HTMLCanvasElement} */

import CollisionAnimation from "./collisionAnimation.js";
import FloatingMessage from "./floatingMessage.js";
import {
  Standing,
  Running,
  Sitting,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from "./state.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.image = document.getElementById("player");
    this.width = 100;
    this.height = 91.3;
    this.y = this.game.gameHeight - this.height - this.game.groundMargin;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 6;
    this.speed = 5;
    this.state = [
      new Standing(this.game),
      new Running(this.game),
      new Sitting(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ];
    this.speed = 10;
    this.maxFrame = 6;
    this.maxSpeed = 10;
    this.fps = 20;
    this.frameCounter = 0;
    this.frameInterval = 1000 / this.fps;
    this.vy = 0;
    this.weight = 0.5;
    this.currentState = null;
  }

  update(input, deltaTime) {
    this.checkCollision();
    if (this.frameCounter >= this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;

      this.frameCounter = 0;
    } else this.frameCounter += deltaTime;

    this.currentState.handleInput(input);
    // horizontal Movement
    this.x += this.speed;
    if (input.includes("ArrowRight") && this.currentState != this.state[7]) {
      this.speed = this.maxSpeed;
    } else if (
      input.includes("ArrowLeft") &&
      this.currentState != this.state[7]
    )
      this.speed = -this.maxSpeed;
    else this.speed = 0;

    if (this.x > this.game.gameWidth - this.width)
      this.x = this.game.gameWidth - this.width;
    else if (this.x < 0) this.x = 0;

    //vertical Movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
    } else this.vy = 0;

    if (this.y > this.game.gameHeight - this.height - this.game.groundMargin) {
      this.y = this.game.gameHeight - this.height - this.game.groundMargin;
    }
  }

  setState(state, speed) {
    this.currentState = this.state[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  draw(ctx) {
    if (this.game.debug) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  onGround() {
    return (
      this.y >= this.game.gameHeight - this.height - this.game.groundMargin
    );
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markForDeletion = true;
        if (
          this.currentState === this.state[5] ||
          this.currentState === this.state[6]
        ) {
          this.game.collisions.push(
            new CollisionAnimation(this.game, enemy.x, enemy.y)
          );
          this.game.score++;
          this.game.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, 0, 0)
          );
        } else {
          this.game.lives--;
          this.setState(7, 0);
        }
      }
    });
  }
}
