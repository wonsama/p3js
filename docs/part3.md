# part3

> [이미지 컨트롤하기](https://www.youtube.com/watch?v=l65rEEdgURA&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=3)
> assets 폴더에 이미지를 배치 후 preload 한 이미지를 load 함수를 이용하여 scene 에 표시하기

## 메모리에 이미지 추가

> key : 이미지 식별자, url : 이미지 경로

```js
this.load.image("backgound", "assets/images/background.png");
```

## scene 에 이미지 추가

> 1번 scene 에서 이미지 로드 후, 2번 scene 에서 이미지를 추가 하는 것 가능 !
> position : 위치할 이미지의 x, y 좌표, key : 불러들일 이미지 키 정보

```js
// 변수에 할당하여(this.background) 클래스 내에서 언제든지 접근할 수 있도록 함.
this.background = this.add.image(0, 0, "background");
// 기본적으로 center (0.5, 0.5) 인데 이것을 (0, 0)으로 바꿈, 이미지의 위치 포인터를 left-top 으로 바꿈
// origin 값을 0~1 에서 바꿔가면서 테스트 해보면 좀 더 손쉽게 알 수 있음
// 물론 0~1의 값을 벗어나게 입력하면 이미지의 width, height 에 따라 변경되는 이미지 위치를 확인할 수 있음.
// 나중에 이미지를 회전할 때 중심축이 됨에 유의
this.background.setOrigin(0,0);
```

## image 속성 변경

```js
// 우주선 이미지 속성변경
this.ship1.setScale(2); // 이미지 크기를 2배로
this.ship1.flipY = true; // 이미지 Y축 반전
```

## image 이동 처리

```js
update() {
  // 약 2초에 1바퀴 회전
  // 60 fps / 초당 60회 update 됨
  this.ship1.angle += 3;
}
```  
