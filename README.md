# ReactBrid SNS
>###### 본 프로젝트는 [React로 NodeBird SNS 만들기](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC/dashboard)를 기반으로 제작되었습니다.
React.js와 next.js와 같은 Front-end 공부를 위한 토이프로젝트

## Front-end 스펙

- Next.js(SSR)
- React.js
- React Hooks
- Redux
- Redux-saga
- Ant-Design
- emotion
- jest

## back-end 스펙

- Node
- Express
- Sequelize(MySQL)
- AWS 배포(EC2 + Lambda + S3 + Route53)

## 프로젝트 관리
### Issue 관리
- [클래스명] Issue 제목
```
[BE/node] 배포
[FE/react] 버튼컴포넌트 구현
[FE/bug] 버튼컴포넌트 미작동
```

### PR 관리
- [클래스명 #Issue번호] PR 제목

```
[BE #1] Sequelize 모델 설계
[FE #3] 메인 상단 topbar 구현
```

## 브랜치 정보
### Branch Info
- master: 배포용 브랜치
- dev: 개발 브랜치(default branch)
- deploy : 배포 연습용 브랜치
- 작업을 시작할 때: 클래스 개발 브랜치에서 feature-<클래스>/issue-번호 으로 브랜치 생성
    ex) feature-iOS/issue-32

### Commit Message
| 타입 | 설명 |
|--|--|
|Feat|새로운 기능 추가|
|Fix|버그 수정|
|Docs|문서 수정|
|Refactor|코드 리팩토링|
|Style|코드 포맷팅 (코드 변경이 없는 경우)|
|Test|테스트 코드 작성|
|Chore|소스 코드를 건들지 않는 작업(빌드 업무 수정)|

```
 [#43] Feat: boilerPlate
```
 - 이슈 단위로 개발한다.
 - 작업을 완료되면, 작업하던 브랜치에서 개발 브랜치(dev)로 Pull Request를 생성한다.
 - 머지를 완료했으면 기능(feature)브랜치는 github과 local git에 모두 삭제 

## 참조
### 개발 개념 정리

[개발 개념 정리](https://jun0127.tistory.com/category/IT/Programmers)

### 기술 참고

[React로 NodeBird SNS 만들기](https://www.inflearn.com/course/react_nodebird/dashboard)

### 디자인 참고

[Twitter](https://twitter.com/home?lang=ko)

[Ant Design](https://ant.design/)
