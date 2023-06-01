window.addEventListener('load', function () {
  getSubPageData();
});

const subPageParam = new URL(location.href).searchParams; // 존재하는 파라미터를 배열 형태로 저장
const pageString = subPageParam.get('page'); // 파라미터 중 특정 키의 값을 추출

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let titleStr = '';
let sortKey = '';
if (pageString === 'best') {
  sortKey = `sort=${pageString}&`;
  titleStr = 'best';
} else if (pageString === 'new') {
  sortKey = `sort=${pageString}&`;
  titleStr = 'new';
} else {
  sortKey = '';
}

let cateKey = '';
if (pageString === 'pp') {
  cateKey = `cate=${pageString}`;
  titleStr = 'picture';
} else if (pageString === 'dp') {
  cateKey = `cate=${pageString}`;
  titleStr = 'drawing';
} else {
  cateKey = 'cate=all';
}

const subPageTit = document.querySelector('.product .section-title');
const listTit = document.querySelector('.product-list-wrapper h3');
subPageTit.textContent = titleStr.toUpperCase() + ' ART';
listTit.textContent = jsUcfirst(titleStr) + ' Art';

async function getSubPageData() {
  const getPageUrl = endPoints.product.getProducts + '?' + sortKey + cateKey;

  try {
    const data = await getRequest(getPageUrl);
    const productLists = document.querySelector('.product-lists');
    let productList = '';

    data.forEach((productInfo) => {
      productList = `
        <div class="product-content">
          <div class="product-image">
            <img src="${productInfo.pr_img}" alt="">
            <div class='view-more-box'>
              <div class='more-btn'>
                <a href='#'>
                  <svg height='45' width='160'>
                    <rect height='45' width='160' />
                  </svg>
                  <span>View More</span>
                </a>
              </div>
            </div>
            </div>
            <div class='product-info'>
              <h2 class='item-title'>${productInfo.pr_ttl}</h2>
              <p class='item-by'>${productInfo.pr_wt_kr}</p>
              <em class='item-size'>30.0cm x 30.0cm</em>
              <strong class='item-price'>
                ${Number(productInfo.pr_pri).toLocaleString()}
                <span>원</span>
              </strong>
            </div>
        </div>
      `;

      productLists.insertAdjacentHTML('beforeend', productList);
    });
    loadMore();
  } catch (error) {
    console.error('Error : ', error);
  }
}

const loadMore = () => {
  const loadLists = $('.product-content');
  loadLists.hide(); // display : none; -> jquery 문법

  loadLists.slice(0, 3).show();
  $('.more-lists').on('click', function () {
    $('.product-content:hidden').slice(0, 3).show();
    if ($('.product-content:hidden').length === 0) {
      $('.more-lists').hide();
    }
  });
  // console.log($('.product-content:hidden'));
};
