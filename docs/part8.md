# part8

> [미사일 발사](https://www.youtube.com/watch?v=qs5xmT6Upsc&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=9)

## 미사일 개체 생성

> 미사일 개체를 생성하여 관리한다.

```js
export default class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    let x = scene.player.x;
    let y = scene.player.y - 16;
    super(scene, x, y, "beam");

    // 화면에 추가
    scene.add.existing(this);

    // 에니메이션 반영
    this.play("beam_anim");

    // 물리엔진 적용
    scene.physics.world.enableBody(this);
    this.body.velocity.y = -250;

    // 투사체 그룹에 추가
    scene.projectiles.add(this);
  }
  update() {
    // 화면을 벗어나면 제거 (destroy) 처리
    // 메모리 관리를 위함
    if (this.y < 0) {
      this.destroy();
    }
  }
}
```

## 미사일 생성

> 미사일 생성 후 그룹에 추가하여 관리한다

```js
// 미사일발사
if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
  this.shootBeam();
}

// 미사일 업데이트 처리
for (var i = 0; i < this.projectiles.getChildren().length; i++) {
  var beam = this.projectiles.getChildren()[i];
  beam.update();
}
```