window.addEventListener('load', function () {
  getCartLists();
});

const getCartLists = async () => {
  const getCartUrl = endPoints.cart.getCart;

  try {
    const data = await getRequest(getCartUrl);
    const cartLists = document.querySelector('.product-lists');
    let cartList = '';

    data.forEach((cartInfo) => {
      cartList = `
        <div class="product-content">
          <div class="product-image">
            <img src="${cartInfo.cart_img}" alt="">
            <div class='view-more-box'>
              <div class='more-btn'>
                <a href='/baexang_front/pages/detail.html?pid=${
                  cartInfo.cart_ID
                }&cate=${cartInfo.cart_type}'>
                  <svg height='45' width='160'>
                    <rect height='45' width='160' />
                  </svg>
                  <span>View More</span>
                </a>
              </div>
            </div>
            </div>
            <div class='product-info'>
              <h2 class='item-title'>${cartInfo.cart_ttl}</h2>
              <p class='item-by'>${cartInfo.cart_wt_kr}</p>
              <em class='item-size'>${cartInfo.cart_size}cm x ${
        cartInfo.cart_size
      }cm</em>
              <span class="price-count">
                <em class="count">${cartInfo.cart_count} 개</em>
                <strong class='item-price'>
                  ${Number(cartInfo.cart_pri).toLocaleString()}
                  <span>원</span>
                </strong>
              </span>
              <span class="cart-btns">
                <button>삭제</button>
                <button>바로구매</button>
              </span>
            </div>
        </div>
      `;

      cartLists.insertAdjacentHTML('beforeend', cartList);
    });
    loadMore();
  } catch (error) {
    console.error('Error : ', error);
  }
};

const loadMore = () => {
  const loadLists = $('.product-content');
  loadLists.hide();

  loadLists.slice(0, 3).show();
  $('.more-lists').on('click', function () {
    $('.product-content:hidden').slice(0, 3).show();
    if ($('.product-content:hidden').length === 0) {
      $('.more-lists').hide();
    }
  });
};
