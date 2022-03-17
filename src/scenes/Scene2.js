import "phaser";

import config from "../config/config.js";

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // 배경 이미지 추가
    // this.background = this.add.image(0, 0, "background");
    // 배경 이미지를 타일맵으로 변경
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
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
    // this.ship1.setScale(2); // 이미지 크기를 2배로
    // this.ship1.flipY = true; // 이미지 Y축 반전

    // 텍스트
    this.add.text(20, 20, "playing game", {
      font: "25px Arial",
      fill: "yellow",
    });

    console.log(this.moveShip);
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    // 배경이 내려가는 듯하게 보이도록 함.
    this.background.tilePositionY -= 0.5;
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPosition(ship);
    }
  }

  /**
   * 우주선의 Y좌표를 초기화 하며, X좌표는 화면 내 랜덤 값을 부여
   * @param {Phaser.GameObjects.Image} ship 우주선
   */
  resetShipPosition(ship) {
    ship.y = 0;
    let randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }
}
