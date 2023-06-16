window.addEventListener('load', function () {
  getDetailData();
});

const subPageParam = new URL(location.href).searchParams; // 존재하는 파라미터를 배열 형태로 저장
const pidString = subPageParam.get('pid'); // 파라미터 중 특정 키의 값을 추출
const cateString = subPageParam.get('cate');
const cateInitStr = cateString.split('_')[1];

// 태그 요소 변수 모음
const itemImage = document.querySelector('.image-frame img');
const itemTitle = document.querySelectorAll('.item-title-box h3');
const itemArtist = document.querySelectorAll('.item-title-box p');
const itemCountTitle = document.querySelector('.item-count-box p');
const itemPrice = document.querySelectorAll('.item-price-box strong');
const cartForm = document.querySelector('.cart-form');
const itemCountElmt = document.querySelectorAll('.counting span');
const itemCountNum = document.querySelectorAll('.counting .count');
const itemCount = document.querySelector('.counting .count').textContent;
const itemSize1 = document.querySelector('#cart-size-1');
const itemSize2 = document.querySelector('#cart-size-2');

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
      <input type="hidden" name="cart_size" value="30">
      <input type="hidden" name="cart_type" value="${data[0].pr_type}">
    `;
    cartForm.insertAdjacentHTML('beforeend', cartFormElmt);

    function handleSizeChange(event) {
      const selectedValue = event.target.value;
      // console.log(selectedValue);
      itemSize1.value = selectedValue;
      itemSize2.value = selectedValue;
      document.querySelector('input[name="cart_size"]').value = selectedValue;
    }

    itemSize1.addEventListener('change', handleSizeChange);
    itemSize2.addEventListener('change', handleSizeChange);

    const wrapTitle = document.querySelector('.detail .section-title');
    const wrapWtKr = document.querySelector('.detail .title-desc');
    const infoImage = document.querySelector('.detail-info-image img');
    const infoTitle = document.querySelector('.info-title .tit');
    const wtEn = document.querySelector('.info-title .en');
    const wtKr = document.querySelector('.info-title .kr');
    const infoDesc = document.querySelector('.info-desc');

    itemImage.setAttribute('src', data[0].pr_img);
    itemTitle.forEach((title) => {
      title.textContent = data[0].pr_ttl;
    });
    itemArtist.forEach((artist) => {
      artist.textContent = data[0].pr_wt_kr;
    });
    itemCountTitle.textContent = data[0].pr_ttl;
    itemPrice.forEach((price) => {
      price.textContent = `${Number(data[0].pr_pri).toLocaleString()}원`;
    });

    wrapTitle.textContent = data[0].pr_ttl;
    wrapWtKr.textContent = data[0].pr_wt_kr;
    infoImage.setAttribute('src', data[0].pr_img);
    infoTitle.textContent = data[0].pr_ttl;
    wtEn.textContent = data[0].pr_wt_en;
    wtKr.textContent = data[0].pr_wt_kr;
    // infoDesc.textContent = data[0].pr_desc;
    infoDesc.insertAdjacentHTML('beforeend', data[0].pr_desc);

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
          price.textContent = `${Number(
            count * data[0].pr_pri
          ).toLocaleString()}원`;
          inputPriceElmt.value = count * data[0].pr_pri;
        });
      });
    });

    // console.log(data[0]);
  } catch (error) {
    console.error('Error : ', error);
  }
}
