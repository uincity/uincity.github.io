# 열심남 개인 브랜딩 사이트

> **배포 주소**: https://uincity.github.io/  
> **저장소**: https://github.com/uincity/uincity.github.io  
> **배포 방식**: GitHub Pages (main 브랜치 직접 서빙)

---

## 구조

```
uincity.github.io/
├── index.html                  ← 메인 홈페이지
├── assets/
│   ├── css/main.css            ← 전체 스타일
│   ├── js/main.js              ← 네비·필터·애니메이션 스크립트
│   └── img/                    ← 데이터랩 SVG 썸네일
│       ├── datalab-apartment.svg
│       ├── datalab-school.svg
│       ├── datalab-subway.svg
│       └── datalab-starbucks.svg
├── 프로필픽사.png               ← 프로필 이미지
├── KFTC_VAULE_INVESTING.html
├── sic_eusu_value.html
├── sic_candidate_202508.html
├── GPT5vsGPT4.html
├── Infg_Rtrmnt_Prep.html
├── greekyogert.html
└── onbid_viral1.html
```

---

## 로컬 미리보기

```bash
# Python 3 (가장 간단)
python -m http.server 8000
# → 브라우저에서 http://localhost:8000 접속
```

---

## 분석자료 추가 방법

### 1. HTML 파일 준비

저장소 루트에 HTML 파일을 추가합니다.  
파일명 오탈자를 방지하기 위해 영문·소문자·언더스코어를 권장합니다.

### 2. 홈 버튼 바 추가 (포스트 상단)

각 분석 HTML의 `<body>` 직후에 아래 스니펫을 붙여넣으세요.

```html
<div style="position:sticky;top:0;width:100%;z-index:9999;
     background:rgba(10,25,47,.97);backdrop-filter:blur(10px);
     padding:10px 24px;display:flex;align-items:center;gap:14px;
     font-family:sans-serif;border-bottom:1px solid rgba(100,255,218,.25)">
  <a href="index.html" style="color:#64ffda;text-decoration:none;font-size:13px;font-weight:600">
    ← 열심남 홈
  </a>
</div>
```

### 3. index.html에 카드 추가

`analysis-grid` 안에 아래 형식으로 카드를 추가합니다.

```html
<article class="analysis-card fade-in" data-topic="invest">
  <!-- data-topic: invest | ai | retire | health | estate -->
  <div class="card-meta">
    <span class="tag">가치투자</span>
    <span class="tag-format">인터랙티브 분석</span>
  </div>
  <h3 class="analysis-title">
    <a href="파일명.html">자료 제목</a>
  </h3>
  <p class="analysis-desc">1~2줄 설명</p>
  <div class="analysis-footer">
    <span class="analysis-date">자료 기준: YYYY년 MM월</span>
    <!-- 기준일 불명확하면 생략 -->
  </div>
</article>
```

### 4. 카드 순서 변경

`analysis-grid` 안에서 `<article>` 블록의 위치를 드래그해 바꾸면 됩니다.

---

## 외부 링크 변경 방법

- **부산 데이터랩**: `index.html`에서 `datalab-link` 클래스의 `href` 값 수정
- **채널 링크**: `index.html`에서 `channel-link` 클래스의 `href` 값 수정

---

## 주의사항

- `data-topic` 값이 필터 버튼의 `data-filter` 값과 일치해야 필터가 동작합니다.
- 기존 분석 HTML 파일명(오탈자 포함)은 그대로 유지하세요. 변경 시 링크가 깨집니다.
- 날짜가 불확실한 자료는 `analysis-date` 요소를 비우거나 `"기준 시점 미확인"` 으로 표시하세요.
