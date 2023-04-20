// Header Sticky Effect
const header = document.querySelector('#header');

const stickyHeader = () => {
  const scry = window.scrollY;
  if (scry > 0) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
};

window.addEventListener('scroll', function () {});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-btn');

toggleMobileBtn = (e) => {
  const target = e.currentTarget; // 2. 함수가 실행되면 현재 클릭한 지점의 요소를 target변수에 저장
  // console.log(target); // 3. target 변수 출력
  target.classList.toggle('active');

  if (target.classList.contains('active') /* active가 있다면 */) {
    target.classList.remove('not-active'); /* not-active를 없애준다 */
  } else {
    target.classList.add('not-active'); /* not-active를 추가해준다 */
  }
};

mobileBtn.addEventListener('click', toggleMobileBtn); // 1. 클릭했을때 toggleMobileBtn 함수 실행
