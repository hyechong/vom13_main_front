window.addEventListener('load', function () {
  getCartLists();
});

const getCartLists = async () => {
  const getCartUrl = endPoints.cart.getCart;
  const moreListsBtn = document.querySelector('.more-lists button');

  try {
    const data = await getRequest(getCartUrl);
    const cartLists = document.querySelector('.product-lists');
    let cartList = '';

    if (data.length === 0) {
      moreListsBtn.style.display = 'none';
      cartList = `<div class="no-elmt" style="width:100%; height:auto; text-align:center; color:#888; font-size:.875rem; padding:.5rem 0;">장바구니에 상품이 없습니다.</div>`;
      cartLists.insertAdjacentHTML('beforeend', cartList);
    } else {
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
                  <button class="del-cart-btn">삭제</button>
                  <button>바로구매</button>
                </span>
              </div>
          </div>
        `;

        cartLists.insertAdjacentHTML('beforeend', cartList);
      });
    }

    loadMore();
    deleteCartList(data);
  } catch (error) {
    console.error('Error : ', error);
  }
};

const deleteCartList = (delData) => {
  const deleteBtns = document.querySelectorAll('.del-cart-btn');
  deleteBtns.forEach((btn, i) => {
    btn.addEventListener('click', async function (e) {
      e.preventDefault();
      const cartID = delData[i].cart_ID;
      const deleteUrl = endPoints.cart.delCart + '?pr_ID=' + cartID;
      console.log(deleteUrl);

      const requestDeleteCart = async (url, jsonString) => {
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: jsonString,
        };
        try {
          const data = await deleteRequest(url, options);
          alert(data.msg);
          location.reload();
        } catch (error) {
          console.error('Error', error);
        }
      };
      requestDeleteCart(deleteUrl, null);
    });
  });
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
