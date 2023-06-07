window.addEventListener('load', function () {
  getDetailData();
});

const subPageParam = new URL(location.href).searchParams; // 존재하는 파라미터를 배열 형태로 저장
const pidString = subPageParam.get('pid'); // 파라미터 중 특정 키의 값을 추출
const cateString = subPageParam.get('cate');
const cateInitStr = cateString.split('_')[1];

// 태그 요소 변수 모음
const itemImage = document.querySelector('.image-frame img');
const itemTitle = document.querySelector('.item-title-box h3');
const itemArtist = document.querySelector('.item-title-box p');
const itemCountTitle = document.querySelector('.item-count-box p');
const itemPrice = document.querySelectorAll('.item-price-box strong');
const cartForm = document.querySelector('.cart-form');
const itemCountElmt = document.querySelectorAll('.counting span');
const itemCountNum = document.querySelectorAll('.counting .count');
const itemCount = document.querySelector('.counting .count').textContent;

async function getDetailData() {
  const getDetailUrl =
    endPoints.product.getProducts + `?pr_ID=${pidString}&cate=${cateInitStr}`;

  try {
    const data = await getRequest(getDetailUrl);

    let cartFormElmt = `
      <input type="hidden" name="cart_ID" value="${data[0].pr_ID}">
      <input type="hidden" name="cart_img" value="${data[0].pr_img}">
      <input type="hidden" name="cart_ttl" value="${data[0].pr_ttl}">
      <input type="hidden" name="cart_wt_kr" value="${data[0].pr_wt_kr}">
      <input type="hidden" name="cart_pri" value="${data[0].pr_pri}" class="cart_pri">
      <input type="hidden" name="cart_count" value="1" class="cart_count">
    `;
    cartForm.insertAdjacentHTML('beforeend', cartFormElmt);

    itemImage.setAttribute('src', data[0].pr_img);
    itemTitle.textContent = data[0].pr_ttl;
    itemArtist.textContent = data[0].pr_wt_kr;
    itemCountTitle.textContent = data[0].pr_ttl;
    itemPrice.forEach((price) => {
      price.textContent = `${Number(data[0].pr_pri).toLocaleString()}원`;
    });

    const inputCountElmt = document.querySelector('.cart_count');
    const inputPriceElmt = document.querySelector('.cart_pri');
    let count = 1;

    // 1. item-info 요소의 숫자와 가격 변경
    // 2. item-info-clone 요소의 숫자와 가격 변경
    // 3. form 내부의 숫자와 가격 변경
    itemCountElmt.forEach((btn) => {
      btn.addEventListener('click', function () {
        if (this.classList.contains('up')) {
          count++;
        } else {
          count <= 1 ? (count = 1) : count--;
        }
        // console.log(count);
        itemCountNum.forEach((num) => {
          num.textContent = inputCountElmt.value = count;
        });

        itemPrice.forEach((price) => {
          price.textContent = inputPriceElmt.value = `${Number(
            count * data[0].pr_pri
          ).toLocaleString()}원`;
        });
      });
    });

    console.log(data[0]);
  } catch (error) {
    console.error('Error : ', error);
  }
}
