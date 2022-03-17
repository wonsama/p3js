# part4

> [이미지 이동](https://www.youtube.com/watch?v=jVlNZgX5fV8&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=4)

## 우주선을 위에서 아래로 이동 처리

* 우주선의 y 값을 증가시키면서 이동 (ship1.y++)
* 우주선이 배경 아래를 벗어나면 다시 처음부터 이동
* 별도의 함수를 만들어서 관리

> 하지만 아래 경우 우주선이 화면 밖으로 벗어나게 됨

```js
  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
  }

  moveShip(ship, speed) {
    ship.y += speed;
  }
```

> 이를 위해 좌표를 초기화 하는 함수를 제작

```js
resetShipPosition(ship) {
  ship.y = 0;
  let randomX = Phaser.Math.Between(0, config.width);
  ship.x = randomX;
}
```

## 배경 타일맵으로 이동처리 반영

```js
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

update(){
  this.background.tilePositionY -= 0.5;
}
```
