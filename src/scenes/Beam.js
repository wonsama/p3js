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
