import Background from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimgingEnemy } from "./Enemy.js";
import InputHandler from "./input.js";
import Player from "./player.js";
import UI from "./UI.js";

window.addEventListener("load", () => {
  /**@type {HTMLCanvasElement} */

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 6;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.Background = new Background(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.maxParticles = 200;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.time = 0;
      this.maxTime = 30000;
      this.fontColor = "black";
      this.player.currentState = this.player.state[0];
      this.player.currentState.enter();
      this.gameOver = false;
      this.lives = 5;
    }

    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime || this.lives <= 0) this.gameOver = true;
      this.player.update(this.input.keys, deltaTime);
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });

      this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion);

      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }

      this.particles.forEach((particle) => {
        particle.update();
      });
      this.particles = this.particles.filter(
        (particle) => !particle.markForDeletion
      );

      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });
      this.collisions = this.collisions.filter(
        (collision) => !collision.markForDeletion
      );

      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }

      this.floatingMessages.forEach((message) => {
        message.update();
      });
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markForDeletion
      );
    }

    draw(ctx) {
      this.Background.draw(ctx);
      this.player.draw(ctx);
      this.enemies.forEach((enemy) => {
        enemy.draw(ctx);
      });

      this.particles.forEach((particle) => {
        particle.draw(ctx);
      });

      this.collisions.forEach((collision) => {
        collision.draw(ctx);
      });

      this.floatingMessages.forEach((message) => {
        message.draw(ctx);
      });
      this.UI.draw(ctx);
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() > 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimgingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  animate(0);
});
