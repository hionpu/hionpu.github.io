
---
title:  "[Rhino] 처럼 방향이 있는 호 그리기"
excerpt: "실험 "

categories:
  - Rhino, Geometry, CAD
tags:
  - [Rhino, Angle, Arc, Geometry]

toc: true
toc_sticky: true
 
date: 23-10-26
last_modified_at: 23-10-26

---

# 1. Rhino의 Intersect 기능
두 개체<sup>object</sup>의 교차점들을 구하고 교차시킬 개체에 따라 점<sup>vertex</sup>, 선<sup>curve</sup>를 반환한다. 이 글에서는 Polygon Mesh로 이루어진 두 개체 사이의 교차점 집합을 구하고 이 점들의 집합으로 커브를 만드는 알고리즘을 다룬다.
![[Pasted image 20231026163033.png]]
- (그림1)예시: 빨간색 커브가 원기둥과 구가 교차하는 부분
# 2. 사전 조건
### 1. Polygon Mesh에 한정
Rhino는 개체의 Geometry를 NURBS로 표현하는데, 이 글에서 다룰 알고리즘은 Polygon Mesh로 표현된 개체(3D Surface) 사이의 교차 결과를 반환하는 함수를 만들 것이다. NURBS와 Polygon Mesh에 대한 설명은 [FAZZ의 ARCHIVE (tistory.com)](https://fazz.tistory.com/entry/s07) 잘 설명되어있다.
![[Pasted image 20231026163724.png]]
- NURBS와 Polygon
### 2. 점 집합으로 곡선을 생성하는 함수
구현할 함수의 반환 타입은 끊어져 있거나 고리를 이루는 하나의 Curve를 이루는 점들의 집합의 집합(`List<List<Point>>`)가 될 것이다. 즉 내부 리스트(`List<Point>`) 하나에 Curve 하나가 대응한다. 예를 들어 (그림1)에서는 하나의 고리 모양의 커브가 생긴다. 따라서 구현한 함수의 반환값 `List<Point>` 를 입력받으면 그 점들을 순서대로 이어서 Curve로 반환하는 함수, 예를들어`Curve(List<Point> points)`가 있다고 가정한다.
### 3. 옥트리<sup>Octree</sup>(팔진 트리)
Octree가 없다고 구현할 수 없는 것은 아니지만 곡면<sup>Surface</sup>을 이루는 폴리곤<sup>Polygon</sup>에 대한 Octree와 그 Octree의 충돌 판정 함수가 구현되어 있다면 교선이 생기는 유효한 폴리곤 집합만 추출해서 계산하는 것이 가능해지므로 연산량이 크게 줄어든다. 현실적으로 사용 편의성까지 고려하면 꼭 필요한 셈이다(느린거 못참아).

# 3. 구현 방법
### 1. 교차 대상 곡면의 폴리곤 집합으로 옥트리 집합을 만들기
옥트리를 내가 직접 구현한 것은 아니지만 대강 설명하자면, 곡면은 여러 개의 평면도형인 폴리곤(꼭 삼각형이 아닐 수도 있고, 볼록 다각형이 아닐 수도 있다)으로 구성된다. 각 폴리곤을 포함하는 가장 작은 직육면체의 집합들이 그 곡면에 대한 옥트리가 된다. 이때 직육면체의 각 변은 각각 x, y, z축에 평행하다.
![[Pasted image 20231026174204.png]]
- (그림2) 3D 공간에서 삼각형을 포함하는 가장 작은 직육면체
### 2. 두 옥트리를 충돌시키기
두 곡면 A, B에 대해서 각각 옥트리를 만들고 이 둘을 충돌시킨다. A에 대해 B를 충돌시키는 것으로 가정하자. 충돌 함수의 반환 타입은 `List<(Polygon, List<Polygon>)>`인데, 이 리스트의 요소 `tuple`의 `(Polygon)Item1`은 A에 속한 폴리곤이고, `(List<Polygon>)Item2`는 `Item1`의 옥트리와 충돌이 일어난 B의 폴리곤이다. 여기서 '충돌이 일어났다' 는 것은 서로 직육면체끼리 겹치는 부분이 있는 경우를 말한다. 옥트리 충돌을 사용함으로써 폴리곤끼리 겹쳐지는 일이 전혀 일어날 수 없는 폴리곤 사이의 연산은 하지 않게 되므로 경우의 수가 크게 줄어든다(다만 직육면체 집합의 충돌 작업만큼은 연산이 추가되는데 이것이 훨씬 쉬운 연산이므로 전체 연산량은 줄어든다).

### 3. 