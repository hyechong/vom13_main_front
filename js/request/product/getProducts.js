window.addEventListener('load', function () {
  getBestArtProducts();
});

const getBestArtProducts = () => {
  const bestArtUrl =
    endPoints.product.getProducts + '?sort=best&limit=5&cate=all';

  const requestGetBestProducts = async (url) => {
    try {
      const data = await getRequest(url);
      // console.log(data);
      const bestArtLists = document.querySelector(
        '.best-image-wrapper .swiper-wrapper'
      );
      let bestArtList = '';

      data.forEach((bestArtInfo) => {
        bestArtList = `
          <div class="swiper-slide">
            <div class="best-image">
              <img src="${bestArtInfo.pr_img}" alt="Best Item">
              <div class="view-more-box">
                <div class="more-btn">
                  <a href="#">
                    <svg height="45" width="160">
                      <rect height="45" width="160"/>
                    </svg>
                    <span>View More</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="best-info">
              <h2 class="item-title">${bestArtInfo.pr_ttl}</h2>
              <p class="item-by">${bestArtInfo.pr_wt_kr}</p>
              <em class="item-size">30.0cm x 30.0cm</em>  
              <strong class="item-price">${bestArtInfo.pr_pri}<span>원</span></strong>           
            </div>
          </div>
        `;
        bestArtLists.insertAdjacentHTML('beforeend', bestArtList);
      });
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  requestGetBestProducts(bestArtUrl);
};
