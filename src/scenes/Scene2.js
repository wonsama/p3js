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
    // this.ship1 = this.add.image(
    //   config.width / 2 - 50,
    //   config.height / 2,
    //   "ship"
    // );
    // this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2");
    // this.ship3 = this.add.image(
    //   config.width / 2 + 50,
    //   config.height / 2,
    //   "ship3"
    // );

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

    // 에니메이션 생성
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1, // 무한반복
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0, // 1회만 반복
      hideOnComplete: true, // 완료 후 숨김처리
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", { start: 0, end: 1 }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", { start: 2, end: 3 }),
      frameRate: 20,
      repeat: -1,
    });

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

    // "gameobjectdown" 이벤트 발생 시 this.destoyShip 함수에서 처리 하도록 함.
    // "gameobjectdown" 는 우주선 이미지 클릭한 경우 임
    this.input.on("gameobjectdown", this.destoyShip, this);

    // console.log(this.anims.generateFrameNumbers("ship"));

    // 우주선 이미지 속성변경
    // this.ship1.setScale(2); // 이미지 크기를 2배로
    // this.ship1.flipY = true; // 이미지 Y축 반전

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
    // 클릭하면 해당 texture 를 우주선에서 폭발하는 것으로 변경
    // 아래 라인을 주석 처리 해도 화면상은 동일 하게 보여짐, 에니메이션을 변경 했기 때문임.
    gameObject.setTexture("explosion");
    // animation을 수행한다, 아래 부분 주석 시 화면상에는 변화가 안보임
    // 에니메이션이 기존 비행기 이동으로 update 되기 때문
    gameObject.play("explode");
  }
}
