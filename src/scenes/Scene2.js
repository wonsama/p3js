import "phaser";

import config from "../config/config.js";

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // 배경 이미지 추가
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    // 우주선 3대 추가
    this.ship1 = this.add.image(
      config.width / 2 - 50,
      config.height / 2,
      "ship"
    );
    this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.image(
      config.width / 2 + 50,
      config.height / 2,
      "ship3"
    );

    // 우주선 이미지 속성변경
    this.ship1.setScale(2); // 이미지 크기를 2배로
    this.ship1.flipY = true; // 이미지 Y축 반전

    // 텍스트
    this.add.text(20, 20, "playing game", {
      font: "25px Arial",
      fill: "yellow",
    });
  }

  update() {
    // 약 2초에 1바퀴 회전
    // 60 fps / 초당 60회 update 됨
    this.ship1.angle += 3;
  }
}
