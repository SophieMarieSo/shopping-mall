## 기능 정의

#### user
1. 회원가입
2. 회원가입을 완료한 이메일 또는 외부 계정(google)을 통해 로그인할 수 있다
3. 쇼핑몰 랜딩페이지 (초기 페이지, navbar)
   1. 원하는 상품을 검색한다
   2. 로그아웃
   3. 장바구니 버튼을 클릭하면, 장바구니 페이지로 이동한다
   4. 내 정보 버튼을 클릭하면, 내 정보 페이지로 이동한다
5. 선택한 상품을 장바구니에 추가한다
6. 장바구니 페이지 (아이템 갯수 수정, 아이템 삭제)
   1. 주문할 상품의 갯수를 수정한다
   2. 장바구니에서 상품을 삭제한다
7. 결제 페이지
   1. 재고가 부족하면 결제할 수 없다
8. 결제 완료 페이지 (주문번호)
   1. 주문번호가 나타난다
9. 내 주문 페이지
   1. 나의 주문 목록이 나타난다
   2. 주문 상태를 확인할 수 있다

#### adim
1. 상품 정보 리스트가 나타난다 (초기화면)
2. 상품을 추가한다
3. 상품 검색한다
4. 상품 수정한다
5. 상품 삭제한다
6. 페이지네이션으로 페이징을 관리한다
7. 주문페이지 (주문상세 확인, 주문상태 수정 기능, 주문번호로 검색)
   1. 주문 상세가 나타난다
   2. 주문 상태를 수정한다
   3. 주문 번호를 검색할 수 있다

---

### 사용스택 (package 포함)

백엔드 `Express` `Mongoose` `Cors` `BodyParser` `dotenv` `bcrpty` `jsonwebtoken`

프론트엔드 `React` `Axios`

---

### 데이터베이스 설계

![](https://files.cdn.thinkific.com/file_uploads/523761/images/b72/b32/b24/1690450706089.jpg)

---

### frontend

clone https://github.com/legobitna/noona-shopping-mall-redux-toolkit-student

---

### 배포

1. DB 배포 `MongonDB Atlas`
2. 백엔드 배포 `Heroku`
3. 프론트엔드 배포 `Netlify`

[shopping-mall](https://tangerine-sfogliatella-fb14d3.netlify.app/)
