# 어피니티 유니버스 강사 명함 발급

강사 이름(영문)을 입력하면 명함(PNG/PDF)을 바로 만들 수 있는 웹페이지입니다. 설치 없이 브라우저에서 사용합니다.

## 사용법
1. 페이지 접속 → 강사명 입력
2. **PNG** / **PDF**(90×50mm)로 저장

## 구성
- `card-template.png` : 이름 영역이 비어 있는 명함 템플릿 (1063×591)
- `fonts/LoveRose.otf` : 강사명 폰트 (Love Rose)
- `script.js` 상단 `NAME_X`, `NAME_BOX`, `NAME_SIZE` : 이름 위치/크기 조정

## 템플릿 교체
`card-template.png`를 같은 크기로 교체하고 이름 위치 값만 맞추면 됩니다.

## 배포 (GitHub Pages)
Settings → Pages → Branch `main` / root 선택.
