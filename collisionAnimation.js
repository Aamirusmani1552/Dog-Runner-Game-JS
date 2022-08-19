export default class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById("boom");
    this.fps = 15;
    this.framesInterval = 1000 / this.fps;
    this.framesCounter = 0;
    this.maxFrame = 4;
    this.frameX = 0;
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = x;
    this.y = y;
    this.markForDeletion = false;
  }

  update(deltatime) {
    this.x -= this.game.speed;
    if (this.framesCounter >= this.framesInterval) {
      if (this.frameX > this.maxFrame) this.markForDeletion = true;
      else this.frameX++;
      this.framesCounter = 0;
    } else {
      this.framesCounter += deltatime;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
