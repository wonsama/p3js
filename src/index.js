import "phaser";

import GameScene from "./scenes/GameScene";
import config from "./config/config.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Game", GameScene);
    this.scene.start("Game");
  }
}

window.onload = function () {
  window.game = new Game();
};
