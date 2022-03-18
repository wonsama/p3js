# part6

> [물리 처리](https://www.youtube.com/watch?v=cuSQnbZloFc&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=6)

## 들어가기 앞서

움직이기 전엔 아무런 일이 생기지 않는다. - 알버트 아인슈타인

visual novel 이나 rpg 게임을 만들지 않는 한, phygics(물리)를 사용할 것임
물리엔진은 gravity(중력), velocity(속도), collisions(충돌) 등을 시뮬레이팅 하는데 사용된다.

## 설정 추가

> `arcade` 물리엔진 추가를 위해 config.js 에 아래 설정을 추가한다.

```js
physics: {
  default: "arcade",
  arcade: {
    debug: false,
  },
},
```

> power-up 을 위한 sprite 로딩

```js
this.load.spritesheet("power-up", "assets/spritesheets/power-up.png", {
  frameWidth: 16,
  frameHeight: 16,
});
```

## 에니메이션 및 그룹추가

```js
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
this.powerUps = this.physics.add.group();
```

## 랜덤 위치에 생성

```js
let maxObjects = 4;
for (let i = 0; i < maxObjects; i++) {
  let powerUp = this.physics.add.sprite(16, 16, "power-up");
  this.powerUps.add(powerUp);
  powerUp.setRandomPosition(0, 0, config.width, config.height);
}
```

> 랜덤을 통해 좀 더 다이나믹 하게 처리 할 수 있음

```js
if (Math.random() > 0.5) {
  powerUp.play("red");
} else {
  powerUp.play("gray");
}
```

## 속도 설정

> 아래와 같이 추가하여 파워업 아이템에 속도를 설정할 수 있다.
> 우측 하단으로 빠르게 이동하며 화면 밖으로 나가는 것을 볼 수 있다.

```js
powerUp.setVelocity(100, 100);
```

> 화면 영역 내에서 충돌하도록 설정, 우측 하단에 아이템이 머문것을 볼 수 있다.

```js
powerUp.setCollideWorldBounds(true);
```