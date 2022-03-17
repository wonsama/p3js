# part2

> [신(scene)](https://www.youtube.com/watch?v=gFXx7lgxK9A&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=2)

## constructor

한개의 게임 내 여러개의 scene 이 포함될 수 있음
game 시작 전 scene 을 load 해야 됨

생성자 함수는 super()를 호출하여 클래스가 Phaser에서 이전 클래스 장면의 모든 특성을 상속하도록 합니다.
super() 의 파라미터는 해당 신의 식별자가 됩니다.

## scene 의 life cycle

> 아래 4개의 라이프 사이클을 가지고 있음

* init() - 데이터를 준비
* preload() - 메모리에 이미지, 사운드 등을 적재
* create() - 다양한 개체를 게임에 추가
* update() - 지속적으로 상태값을 업데이트 하면서 다양한 작업 처리

## scene 추가하기

config 에서 scene 파라미터에 화면에 보여줄 scene 목록을 추가

```js
const config = {
  ...
  scene: [Scene1, Scene2]
}
```

## scene 전환하기

`this.scene.start` 를 사용하여 bootGame 에서 playGame 으로 장면을 전환 할 수 있다.
단, 화면상에서는 playGame 만 보여질 것이다.
(bootGame 장면에서 playGame 장면으로 바로 전환되기 때문)

```js
export default class Scene1 extends Phaser.Scene {

  constructor() {
    super("bootGame");
  }

  create() {
    this.add.text(20, 20, "Loading Game...");
    this.scene.start("playGame");
  }
}
```
