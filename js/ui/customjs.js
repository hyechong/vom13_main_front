/* -------- Header Hide & Show -------- */
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
setTimeout(() => {
  let prevScrollpos = window.pageYOffset; //재할당되므로 let으로 정의
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 150) {
      header.classList.remove('top');
      if (prevScrollpos > currentScrollPos) {
        // show header
        header.style.top = 0;
      } else {
        // hide header
        header.style.top = -100 + '%';
      }
      prevScrollpos = currentScrollPos; // 마우스 이동 후 스크롤 위치값 재할당
    } else {
      header.classList.add('top');
    }
  });

  /* -------- Mobile Menu Hide & Show -------- */
  const mobileMenuIcon = document.querySelector('.menu-icon');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileCloseIcon = document.querySelector('.close-icon');

  mobileMenuIcon.addEventListener('click', function (e) {
    e.preventDefault(); // 기본 기능 막아주는 함수 (여기서는 <a href="#"> a 누르면 화면 맨위로 기본 기능 막아줌)
    mobileOverlay.classList.add('on');
    document.body.style.overflow = 'hidden'; // 사이드 메뉴 활성화시 스크롤 멈춤
  });
  mobileCloseIcon.addEventListener('click', function (e) {
    e.preventDefault();
    mobileOverlay.classList.remove('on');
    document.body.style.overflow = 'auto'; // 사이드 메뉴 닫으면 다시 스크롤 가능
  });

  // target, currentTarget
  mobileOverlay.addEventListener('click', function (e) {
    // console.log(e.target); // 클릭한 element 타겟팅
    // console.log(e.currentTarget); // 최상위 element 타겟팅
    if (
      e.target.getAttribute('class') !== 'mobile-menus' &&
      e.target.nodeName !== 'LI' &&
      e.target.nodeName !== 'A' &&
      e.target.nodeName !== 'IMG'
    ) {
      mobileOverlay.classList.remove('on');
      document.body.style.overflow = 'auto';
    }
  });
}, 300);

/* -------- Best Items Slide -------- */
const isSwiper = document.querySelectorAll('.swiper-wrapper');
if (isSwiper.length > 0) {
  const bestArtSwiper = new Swiper('.best-image-wrapper .swiper', {
    slidesPerView: 4,
    spaceBetween: 15,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      480: {
        // 480 이하
        slidesPerView: 1, // 보이는 슬라이드 갯수
        slidesPerGroup: 1, // 하나의 페이지네이션에 묶이는 슬라이드 갯수
      },
      880: {
        // 880 이하
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1400: {
        // 1400 이하
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  });

  /* -------- Pick Art Section -------- */

  // 1. 요소 선택
  const btns = document.querySelectorAll('.pick-tab-btn');
  const panels = document.querySelectorAll('.pick-tab-panel');

  // 2. 함수 정의
  function activeTabs(i) {
    btns.forEach((btn) => {
      btn.classList.remove('on');
    });
    panels.forEach((panel) => {
      panel.classList.remove('on');
    });
    btns[i].classList.add('on');
    panels[i].classList.add('on');
  }

  // 3. 함수 호출
  btns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      activeTabs(idx);
    });
  });

  /* -------- New Art Slide -------- */
  const newArtSwiper = new Swiper('.new-art-slider-wrapper .swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      480: {
        // 480 이하
        slidesPerView: 1, // 보이는 슬라이드 갯수
        slidesPerGroup: 1, // 하나의 페이지네이션에 묶이는 슬라이드 갯수
        spaceBetween: 0,
      },
      786: {
        // 786 이하
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 10,
      },
    },
  });
}

// Direct Gallery Text Effect
const dgLetters = document.querySelectorAll('.direct-gallery-inside h2 span');
// console.log(dgLetters);
dgLetters.forEach((letter, i) => {
  const delayIndex = i + 8;
  if (delayIndex < 10) {
    letter.style.animationDelay = `0.${delayIndex}s`;
  } else {
    letter.style.animationDelay = `${delayIndex / 10}s`;
  }
});

// Aos Plugin Initiate
AOS.init({
  duration: 1200,
});
