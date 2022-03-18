import Scene1 from "../scenes/Scene1";
import Scene2 from "../scenes/Scene2";

export const GAME_SETTINGS = {
  moveSpeed: 100,
};

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 256,
  height: 272,
  scene: [Scene1, Scene2], // 자동으로 this.scene.start 한 것과 동일, 맨 앞의 scene 이 기동됨
  backgroundColor: "#000000", // 기본 검정색(#000000) 임
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};
