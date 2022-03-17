import "phaser";

// import GameScene from "./scenes/GameScene";
import config from "./config/config.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

window.onload = function () {
  window.game = new Game();
};
