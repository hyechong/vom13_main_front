$(function () {
  /* -- 헤더 높이만큼 패딩 적용 */
  const headerHeight = $('header').outerHeight();
  $('.landing').css(
    'padding',
    `${headerHeight}px var(--el-main) var(--el-main)`
  );

  /* Main Landing Slider */
  /*===== VISUAL SLIDER FUNCTION ===== */
  function visualSlider() {
    var visualSlider = new Swiper('.landing-slider', {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      // navigation: {
      //   nextEl: '.visual .swiper-button-next',
      //   prevEl: '.visual .swiper-button-prev',
      // },
      pagination: {
        el: '.landing .swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          var bulletArray = [];
          $('.landing .swiper-slide').each(function () {
            bulletArray.push($(this).find('span').html());
          });
          console.log(bulletArray[index + 1]);
        },
      },
      // pagination: {
      //   el: '.visual .swiper-pagination',
      //   clickable: true,
      //   renderBullet: function (index, className) {
      //     var bulletArray = [];
      //     $('.visual .swiper-slide').each(function () {
      //       bulletArray.push($(this).find('h2').html());
      //     });
      //     return (
      //       '<div class="' +
      //       className +
      //       '">' +
      //       '<span>' +
      //       '0' +
      //       (index + 1) +
      //       '</span>' +
      //       '<strong>' +
      //       bulletArray[index + 1] +
      //       '</strong></div>' +
      //       '</div>'
      //     );
      //   },
      // },
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
      on: {
        init: function () {
          $('.landing-slider').addClass('load-init');
        },
        progress: function () {
          for (var i = 0; i < this.slides.length; i++) {
            var slideProgress = this.slides[i].progress;
            var innerOffset = this.width * 0.5;
            var innerTranslate = slideProgress * innerOffset;
            this.slides[i].querySelector('.bg-wrap').style.transform =
              'translate3d(' + innerTranslate + 'px, 0, 0)';
          }
        },
        // touchStart: function () {
        //   for (var i = 0; i < this.slides.length; i++) {
        //     this.slides[i].style.transition = '';
        //   }
        // },
        setTransition: function (speed) {
          console.log(speed);
          for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].style.transition = speed + 'ms';
            this.slides[i].querySelector('.bg-wrap').style.transition =
              speed + 'ms';
          }
        },
      },
    });

    visualSlider.on('slideChange', function () {
      $('.landing-slider').removeClass('load-init');
    });
  }
  visualSlider();
});
