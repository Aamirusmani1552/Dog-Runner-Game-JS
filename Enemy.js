class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameCounter = 0;
    this.frameInterval = 1000 / this.fps;
    this.markForDeletion = false;
  }

  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    if (this.frameCounter > this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameCounter = 0;
    } else this.frameCounter += deltaTime;

    if (this.x + this.width < 0) {
      this.markForDeletion = true;
    }
  }
  draw(ctx) {
    if (this.game.debug) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.maxFrame = 5;
    this.x = this.game.gameWidth + Math.random() * this.game.gameWidth * 0.5;
    this.y = Math.random() * this.game.gameHeight * 0.5;
    this.width = 60;
    this.height = 44;
    this.speedX = Math.random() * 2;
    this.image = document.getElementById("enemy_fly");
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
    this.speedY = 0;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.height = 87;
    this.x = this.game.gameWidth;
    this.y = this.game.gameHeight - this.height - this.game.groundMargin;
    this.image = document.getElementById("enemy_plant");
    this.width = 60;
    this.speedX = 0;
    this.maxFrame = 1;
    this.speedY = 0;
  }
}

export class ClimgingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.height = 144;
    this.x = this.game.gameWidth;
    this.y = this.game.gameHeight * Math.random() * 0.5;
    this.image = document.getElementById("enemy_spider_big");
    this.width = 120;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.gameHeight - this.height - this.game.groundMargin) {
      this.speedY *= -1;
    }
    if (this.y < 0 - this.height) {
      this.markForDeletion = true;
    }
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 2, this.y + 50);
    ctx.stroke();
  }
}
