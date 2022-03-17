# part5

> `spritesheet` 를 이용한 에니메이션

## spritesheet 란 ?

하나에 이미지에 담긴 여러 이미지의 집합이다. 각 이미지는 개별 프레임으로 나눠져 있다.
각 프레임은 같은 크기이며, 순차적으로 이미지를 변경하면 영화처럼 움직이게 보여진다.

## spritesheet 반영

> spritesheet 적재

```js
this.load.spritesheet("ship", "assets/spritesheets/ship.png", {
  frameWidth: 16,
  frameHeight: 16,
});
this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {
  frameWidth: 32,
  frameHeight: 16,
});
this.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {
  frameWidth: 32,
  frameHeight: 32,
});
this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
  frameWidth: 16,
  frameHeight: 16,
});
```

> spritesheet 추가

```js
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
```

## animation 적용

> anims 을 통한 에니메이션 생성, repeat -1 은 무한반복

```js
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
this.ship1.play("ship1_anim");
this.ship2.play("ship2_anim");
this.ship3.play("ship3_anim");
```

## 우주선 클릭 시 폭발 하도록 처리

> setInteractive 를 통해 이벤트 처리를 할 수 있도록 함

```js
this.ship1.setInteractive();
this.ship2.setInteractive();
this.ship3.setInteractive();

// "gameobjectdown" 이벤트 발생 시 this.destoyShip 함수에서 처리 하도록 함.
// "gameobjectdown" 는 우주선 이미지 클릭한 경우 임
this.input.on("gameobjectdown", this.destoyShip, this);

destoyShip(pointer, gameObject) {
  gameObject.setTexture("explosion");
  gameObject.play("explode");
}
```