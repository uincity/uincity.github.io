/* ============================================================
   열심남 개인 브랜딩 사이트 · 메인 스크립트
   assets/js/main.js
   ============================================================ */
(function () {
  'use strict';

  /* JS 로드 확인 — CSS에서 .js-ready 클래스로 fade-in 활성화 */
  document.documentElement.classList.add('js-ready');

  /* ---- 1. 모바일 내비게이션 ---- */
  var toggle = document.getElementById('nav-toggle');
  var menu   = document.getElementById('mobile-menu');

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    menu.classList.remove('is-open');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!open));
      this.setAttribute('aria-label', open ? '메뉴 열기' : '메뉴 닫기');
      menu.classList.toggle('is-open', !open);
      if (!open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      }
    });

    /* 메뉴 내 링크 클릭 시 닫기 */
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    /* Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    /* 바깥 클릭 */
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('is-open') &&
          !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
      if (e.matches) closeMenu();
    });
  }

  /* ---- 2. 분석자료 필터 ---- */
  var filterBtns   = document.querySelectorAll('[data-filter]');
  var cards        = document.querySelectorAll('[data-topic]');
  var noResults    = document.getElementById('no-results');
  var announcement = null;

  function getAnnouncer() {
    if (!announcement) {
      announcement = document.createElement('div');
      announcement.id = 'filter-live';
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      document.body.appendChild(announcement);
    }
    return announcement;
  }

  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var topic = this.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        this.setAttribute('aria-pressed', 'true');

        var count = 0;
        cards.forEach(function (card) {
          var match = topic === 'all' || card.getAttribute('data-topic') === topic;
          if (match) { card.removeAttribute('hidden'); count++; }
          else        { card.setAttribute('hidden', ''); }
        });

        if (noResults) noResults.classList.toggle('is-visible', count === 0);
        getAnnouncer().textContent = count + '개의 자료가 표시됩니다.';
      });
    });
  }

  /* ---- 3. 스무스 앵커 (href="#..." 안전 처리) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return; /* 빈 앵커 무시 */
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        /* 접근성: 포커스 이동 */
        if (!target.getAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ---- 4. 페이드인 (IntersectionObserver) ---- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    /* IO 없거나 reduced-motion: 즉시 표시 */
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- 5. 현재 섹션 네비 링크 하이라이트 ---- */
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          navAnchors.forEach(function (a) {
            a.classList.toggle('nav-active', a.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-25% 0px -60% 0px' });
    sections.forEach(function (s) { sio.observe(s); });
  }

}());
