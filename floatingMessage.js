export default class FloatingMessage {
  constructor(value, x, y, targetX, targetY) {
    this.value = value;
    this.x = x;
    this.targetX = targetX;
    this.y = y;
    this.targetY = targetY;
    this.markForDeletion = false;
    this.timer = 0;
  }

  update() {
    this.x += (this.targetX - this.x) * 0.03;
    this.y += (this.targetY - this.y) * 0.03;
    this.timer++;
    if (this.timer > 100) this.markForDeletion = true;
  }

  draw(ctx) {
    ctx.save();
    ctx.font = "20px Creepster";
    ctx.fontStyle = "black";
    ctx.fillText(this.value, this.x, this.y);
    ctx.restore();
  }
}
