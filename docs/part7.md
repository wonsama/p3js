# part7

> [키보드 조작 추가하기](https://www.youtube.com/watch?v=KQ2FhPKBOHI&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=8)

## 게임 설정 추가

```js
export const GAME_SETTINGS = {
  moveSpeed: 100,
};
```

## create 정보 이동

> 관리의 편의를 위해 초기화 정보와 관련 된 anims.create 관련 구문은 Scene2 에서 Scene1 으로 이동

```js
// 에니메이션 생성
this.anims.create({
  key: "ship1_anim",
  frames: this.anims.generateFrameNumbers("ship"),
  frameRate: 20,
  repeat: -1, // 무한반복
});
...
```

## player 추가 및 이동

> 키보드 이벤트에 따른 플레이어 이동 처리를 위해 update() 내 아래 함수를 추가한다.

```js
//-- IN Scene1.js--
this.load.spritesheet("player", "assets/spritesheets/player.png", {
  frameWidth: 16,
  frameHeight: 24,
});

this.anims.create({
  key: "thrust",
  frames: this.anims.generateFrameNumbers("player"),
  frameRate: 20,
  repeat: -1,
});

//-- IN Scene2.js--

// 플레이어
this.player = this.physics.add.sprite(
  config.width / 2 - 8,
  config.height - 64,
  "player"
);
this.player.play("thrust");
this.cursorKeys = this.input.keyboard.createCursorKeys(); // this.input.keyboard.createCursorKeys 를 통해 한번에 4개의 이동 이벤트를 등록한다. 물론 수동으로 개별 등록 또한 가능함.
this.player.setCollideWorldBounds(true);

update(){
  ...
  movePlayerManager();  
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
```

## 미사일 발사

```js
// 미사일발사
this.spacebar = this.input.keyboard.addKey(
  Phaser.Input.Keyboard.KeyCodes.SPACE
);
```