import "phaser";

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.add.text(20, 20, "playing game", {
      font: "25px Arial",
      fill: "yellow",
    });
  }
}
