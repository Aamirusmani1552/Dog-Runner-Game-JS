export default class UI {
  constructor(game) {
    this.fontSize = 20;
    this.fontFamily = "Creepster";
    this.game = game;
    this.livesImage = document.getElementById("lives");
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "white";
    ctx.shodowBlur = 0;
    ctx.font = this.fontSize + "px " + this.fontFamily;
    ctx.textAlign = "left";
    ctx.fontStyle = this.game.fontColor;
    ctx.fillText("Score: " + this.game.score, 20, 50);
    ctx.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);

    // showing lives
    for (let i = 0; i < this.game.lives; i++) {
      ctx.drawImage(this.livesImage, 20 * i + 20, 100, 20, 20);
    }

    if (this.game.gameOver) {
      ctx.textAlign = "center";

      if (this.game.score > 40) {
        ctx.font = this.fontSize + 20 + "px " + this.fontFamily;
        ctx.fillText(
          "Boo yeah!",
          this.game.gameWidth * 0.5,
          this.game.gameHeight * 0.5
        );
        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.fillText(
          "What are creatures of night afraid of? YOU!!!",
          this.game.gameWidth * 0.5,
          this.game.gameHeight * 0.5 + 30
        );
      } else {
        ctx.font = this.fontSize + 20 + "px " + this.fontFamily;
        ctx.fillText(
          "Love At First Bite?",
          this.game.gameWidth * 0.5,
          this.game.gameHeight * 0.5
        );
        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.fillText(
          "Nope. better luck next time!",
          this.game.gameWidth * 0.5,
          this.game.gameHeight * 0.5 + 30
        );
      }
    }
    ctx.restore();
  }
}
