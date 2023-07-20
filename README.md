## ⏰프로젝트 소개

![](https://velog.velcdn.com/images/whdnjs10/post/18aa5dbb-75c7-4f23-924d-62b1ba5e1283/image.jpg)

⏰친구 및 지인 등 함께하고자 하는사람들과 그룹을 만들고, 실시간으로 채팅을 하며 일정을 작성해보세요 !  

### [MOA 바로가기](https://moa99.site)
#### [Github-Front](https://github.com/99-Moa/99-MOA-F)
#### [Github-Back](https://github.com/99-Moa/99-Moa-B)

----
## ⚙️Youtube 시연영상

#### [바로가기!](https://youtu.be/-QllO5r3_t4)
----
## ⚙️서비스아키텍처
![](https://velog.velcdn.com/images/whdnjs10/post/16f107d4-c436-474b-92d3-980719178a53/image.png)

----

## 📅프로젝트기간
2022년 11월 4일 ~ 2022년 12월 16일(6주)

----
## ✨주요기능

|페이지|API 및 관련 메서드|
|---|---|
|로그인|JWT 토큰 발급을 통한 로그인<br>소셜 로그인(카카오)<br>|
|메인페이지|캘린더<br>일정 목록 확인(제일 시간이 가까운 일정이 최상단)<br>제일 시간이 가까운 일정 카운트(d-day)<br>일정 클릭시 확장하며 상세 내용 표시<br>로그인 한 회원만 접근 가능|
|일정 추가하기(메인페이지)|일정 정보 입력(날짜, 모임내용, 목적지 등)<br>카카오지도 api 연동<br>참가자 선택(그룹생성)|
|그룹 및 친구 목록 페이지|유저 검색 및 친구 추가 기능<br>일정 추가시 친구(모임) 그룹 생성 및 확인<br>친구 목록 확인|
|그룹 채팅방|스톰프를 이용한 모임끼리 실시간 채팅 구현<br>실시간 일정 변경<br>현재 참여중인 참가자 표시<br>모임 정보 요약 표시<br>카카오지도 api 연동<br>나가기 버튼 클릭시 그룹 및 친구 목록 페이지로 이동|
|공통 상단 nav바|내 프로필이미지 클릭시 내정보 수정 가능<br>sse를 통해 누가 나를 친구추가 하고, 그룹에 초대했는지 확인 가능|

----

## 🗺API 설계
### [API설계 보러가기](https://magnificent-plant-413.notion.site/99-2-4ce564cddbb54c01b47c5d73e7c1a2e6)

----
## 🔨기술적의사결정

|적용 기술|적용 목적|
|---|---|
|리액트 쿼리|도입이유 : 서버 비동기 통신 데이터 관리를 더욱 용이하게 하기 위해서  <br>ㅤㅤㅤㅤ&nbsp; &nbsp;예를들어 비슷한 역할을하는 redux-saga, swr 등에 비해 사용법이 직관적이며,  <br>ㅤㅤㅤㅤ&nbsp; &nbsp;유지보수가 용이하다고 판단했기 때문에.<br>문제상황 : 직관적이고 쉽게 유지보수가 하기 좋으며 좋은 옵션을 가지고 있는  <br>ㅤㅤㅤㅤ&nbsp; &nbsp;서버 상태관리 라이브러리의 필요성을 느낌.<br>해결방안 및 의견결정 : 도입이유에서 언급한 타 라이브러리와 비교하여  <br>ㅤㅤㅤㅤ&nbsp; &nbsp;react-query의 장점을 느끼고 이것을 도입|
|프레이머 모션|도입이유 : 각 요소에 좀더 압축적으로 모션을 부분 적용할 필요성을 느낌.<br>문제상황 : 같은 요소에 다른 모션이 적용될때 스타일 컴포넌트를 사용하고 있는 지금   <br>ㅤㅤㅤㅤ&nbsp; &nbsp;prop으로 번번이 넘겨주며 관리하기엔 코드의 낭비를 느낌<br>해결방안 : framer-motion의 variants를 이용하여 같은 요소에 다른 모션을 낭비없이 적용할 수 있게됨.|
|액시오스|도입이유 : 일반 내장기능인 fetch보다 좀더 많은 옵션을 이용하기 위해(intercepter등)<br>문제상황 : 일반 fetch함수만 이용하기엔 코드 낭비를 느낌, 압축의 가능성을 느끼게 됨<br>해결방안 : axios 도입하여 토큰등 다양한 작업을 좀더 코드 낭비 없이 작성할 수 있게됨|

----
## 🎯트러블 슈팅
----
## 👨‍👩‍👧팀원소개

|이름|깃허브 주소|포지션|
|---|---|---|
|박종원|[ParkBig의 github](https://github.com/ParkBig)|Frontend|
|윤상민|[nimgnas의 github](https://github.com/nimgnas)|Frontend|
|이진호|[Jino0403의 github](https://github.com/Jino0403)|Frontend|
|윤시원|[yuns8708의 github](https://github.com/yuns8708)|Backend|
|신현재|[tmpanmitw의 github](https://github.com/tmpanmitw)|Backend|
|이동진|[acutecritic의 github](https://github.com/acutecritic)|Backend|







