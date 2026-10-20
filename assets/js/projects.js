/* 일상 속 작은 프로젝트: 항목을 추가하면 같은 카드 템플릿으로 표시됩니다. */
(function () {
  'use strict';

  // 기능을 추가·수정할 때는 연결 서비스의 실제 구현을 먼저 확인합니다.
  var projects = [
    {
      id: 'guitar',
      category: 'MUSIC · WEB APP',
      title: '캐서린의 기타 코드 연습실',
      subtitle: '아내를 위해 만든 작은 기타 학습 도구',
      description: [
        '어쿠스틱 기타를 배우는 아내를 위해 만든 작은 웹서비스입니다.',
        '기타 코드 운지법을 보다 쉽고 직관적으로 익힐 수 있도록 기타 지판과 코드 운지를 시각화했습니다.',
        '실제 연습 중에도 스마트폰으로 간편하게 확인할 수 있도록 구성했습니다.'
      ],
      features: [
        '기타 코드 운지 시각화',
        '다양한 코드와 대체 운지 탐색',
        '코드 사운드·다운/업 스트로크 재생',
        '스마트폰에서도 편리하게'
      ],
      url: 'https://uincity.github.io/guitar/',
      image: 'assets/img/project-guitar.svg',
      imageAlt: '기타 실루엣과 C 메이저 코드의 손가락 위치를 표시한 지판 일러스트',
      cta: '기타 코드 연습실 열기 ↗'
    }
  ];

  var grid = document.getElementById('small-projects-grid');
  var template = document.getElementById('small-project-template');
  if (!grid || !template) return;

  var fragment = document.createDocumentFragment();
  projects.forEach(function (project) {
    var card = template.content.cloneNode(true);
    var title = card.querySelector('.small-project-title');
    title.id = 'small-project-' + project.id + '-title';
    title.textContent = project.title;
    card.querySelector('article').setAttribute('aria-labelledby', title.id);
    card.querySelector('.small-project-category').textContent = project.category;
    card.querySelector('.small-project-subtitle').textContent = project.subtitle;

    var image = card.querySelector('.small-project-image');
    image.src = project.image;
    image.alt = project.imageAlt;

    var description = card.querySelector('.small-project-description');
    project.description.forEach(function (text) {
      var paragraph = document.createElement('p');
      paragraph.textContent = text;
      description.appendChild(paragraph);
    });

    var features = card.querySelector('.small-project-features');
    project.features.forEach(function (text) {
      var item = document.createElement('li');
      item.textContent = text;
      features.appendChild(item);
    });

    var link = card.querySelector('.small-project-cta');
    link.href = project.url;
    link.textContent = project.cta;
    link.setAttribute('aria-label', project.title + ' 열기 (새 탭)');
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
}());
