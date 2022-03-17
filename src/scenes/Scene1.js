import "phaser";

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  create() {
    this.add.text(20, 20, "Loading Game...");
    this.scene.start("playGame");
  }
}
