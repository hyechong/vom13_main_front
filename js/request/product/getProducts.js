window.addEventListener('load', function () {
  // getBestArtProducts();
  // getNewArtProducts();
  getMainProduct('best', '.best-image-wrapper .swiper-wrapper', 5);
  getMainProduct('new', '.new-art-slider-wrapper .swiper-wrapper', 5);
});

async function getMainProduct(sortBy, selector, limit) {
  const getProductArtUrl =
    endPoints.product.getProducts + `?sort=${sortBy}&limit=${limit}&cate=all`;

  try {
    const data = await getRequest(getProductArtUrl);
    const artLists = document.querySelector(selector);
    let artList = '';

    data.forEach((artInfo) => {
      artList = `
        <div class="swiper-slide">
          <div class="${sortBy === 'best' ? 'best-image' : 'new-art-image'}">
            <img src="${artInfo.pr_img}" alt="">
            ${
              sortBy === 'new'
                ? `<div class='new-art-title'>
                  <p>${artInfo.pr_wt_kr}</p>
                  <h3>${artInfo.pr_ttl}</h3>
                </div>`
                : ''
            }
            ${
              sortBy === 'best'
                ? `
                <div class='view-more-box'>
                  <div class='more-btn'>
                    <a href="/baexang_front/pages/detail.html?pid=${artInfo.pr_ID}">
                      <svg height='45' width='160'>
                        <rect height='45' width='160' />
                      </svg>
                      <span>View More</span>
                    </a>
                  </div>
                </div>
                `
                : ''
            }
          </div>
          ${
            sortBy == 'new'
              ? `<div class='new-art-text'>
                <em>${artInfo.pr_desc}</em>
                <div class='more-btn'>
                  <a href="/baexang_front/pages/detail.html?pid=${artInfo.pr_ID}">
                    <svg height='45' width='160'>
                      <rect height='45' width='160' />
                    </svg>
                    <span>View More</span>
                  </a>
                </div>
              </div>`
              : ''
          }
          ${
            sortBy == 'best'
              ? `
              <div class='best-info'>
                <h2 class='item-title'>${artInfo.pr_ttl}</h2>
                <p class='item-by'>${artInfo.pr_wt_kr}</p>
                <em class='item-size'>30.0cm x 30.0cm</em>
                <strong class='item-price'>
                  ${Number(artInfo.pr_pri).toLocaleString()}
                  <span>원</span>
                </strong>
              </div>
              `
              : ''
          }
        </div>
      `;
      artLists.insertAdjacentHTML('beforeend', artList);
    });
  } catch (error) {
    console.error('Error : ', error);
  }
}
