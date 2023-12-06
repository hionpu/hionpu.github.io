---
ID: 1
Type: Literature
createdAt: 2023-12-04 15:22
tags:
  - "#github"
  - "#blog"
  - "#jekyll"
  - "#polyglot"
title: 2023-12-04-Github 블로그 개설하기(1) 리포지터리 생성하기
lastmod: 2023-12-04 15:22
---
| 표 |ㅇㅇ |
| --- | --- |
***
# 1. Repository 생성

### 1-1.
![image](https://github.com/hionpu/hionpu.github.io/assets/111286364/cb721c89-9865-4fbc-ae40-ebfbb0e12479)
깃허브 Repositories 탭의 오른쪽에 초록색 New 버튼

### 1-2.
![image](https://github.com/hionpu/hionpu.github.io/assets/111286364/dd573081-6fca-4e49-91d1-b1695488f991)
소유자 - 본인 고르고 _<깃허브 계정명>.github.io_ 형식으로 입력(나는 이미 만들어서 아래 빨간 메시지로 이미 있다고 뜨는것)

### 1-3.
![image](https://github.com/hionpu/hionpu.github.io/assets/111286364/76025c67-7d43-4735-9913-b57b0985ab2b)
Public과 Add a README file 체크하고 아래에 Create Repository 초록버튼 클릭
# 2. 내 로컬에 클론
### 2-1.
![image](https://github.com/hionpu/hionpu.github.io/assets/111286364/a229797f-8ae0-460c-ac42-61edcccc0a2d)
만들어진 Repository에서 오른쪽 초록색 <> Code 버튼 누르면 내 Repository의 Https 주소 확인 가능(주소창에도 있다). 이것을 복사하고 git bash같은 터미널에서 클론할 위치로 이동한 다음

```
git clone 복사한 주소
```

해서 로컬에 클론하면 아까 만든 Repository 이름으로 된 폴더가 생성돼있다. 터미널에서 해당 폴더에 진입하고 임시 테스트용 인덱스 파일을 하나 만들자

```
cd username.github.io
echo "Hello World" > index.html
```

# 3. index.html 푸시하고 확인
```
git add *
git commit -m "Beginning of my git blog"
git push -u origin main
```

이제 https://계정명.github.io 로 들어가면 인덱스에 적은 내용을 볼 수 있다.

다음은 테마를 적용해볼 것이다.