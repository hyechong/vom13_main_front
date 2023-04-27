/* -------- Header Hide & Show -------- */
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
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

/* -------- Best Items Slide -------- */
const bestArtSwiper = new Swiper('.best-image-wrapper .swiper', {
  slidesPerView: 4,
  spaceBetween: 15,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
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
