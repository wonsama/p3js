import "phaser";

import config, { GAME_SETTINGS } from "../config/config.js";

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // 배경 이미지를 타일맵으로 변경
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);

    // 스프라이트 생성
    this.ship1 = this.add.sprite(
      config.width / 2 - 50,
      config.height / 2,
      "ship"
    );
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(
      config.width / 2 + 50,
      config.height / 2,
      "ship3"
    );

    this.physics.world.setBoundsCollision();
    this.powerUps = this.physics.add.group();

    let maxObjects = 4;
    for (let i = 0; i < maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, config.width, config.height);

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(true);
    }
    console.log(this.powerUps);

    // 에니메이션 실행
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    // 이벤트 처리를 할 수 있도록 설정
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    // 플레이어
    this.player = this.physics.add.sprite(
      config.width / 2 - 8,
      config.height - 64,
      "player"
    );
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    // 미사일발사
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // event - gameobjectdown
    this.input.on("gameobjectdown", this.destoyShip, this);

    // 텍스트
    this.add.text(20, 20, "playing game", {
      font: "25px Arial",
      fill: "yellow",
    });
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    // 배경이 내려가는 듯하게 보이도록 함.
    this.background.tilePositionY -= 0.5;

    // 플레이어 이동처리
    this.movePlayerManager();

    // 미사일발사
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      console.log("fire");
    }
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-GAME_SETTINGS.moveSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(GAME_SETTINGS.moveSpeed);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-GAME_SETTINGS.moveSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(GAME_SETTINGS.moveSpeed);
    } else {
      this.player.setVelocityY(0);
    }
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

  /**
   * 클릭한 우주선을 폭발시킨다.
   * @param {*} pointer 마우스 포인터
   * @param {*} gameObject 게임 개체 - 우주선
   */
  destoyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }
}
