export default class InputHandler {
  constructor(game) {
    this.keys = [];
    this.game = game;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown") &&
        !this.keys.includes(e.key)
      ) {
        this.keys.push(e.key);
      } else if (e.key === "d") this.game.debug = !this.game.debug;
      else if (e.key === "w" && !this.keys.includes(e.key)) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.keys.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
