window.addEventListener('load', function () {
  getSubPageData();
});

const subPageURL = document.location.href;
const splitDot = subPageURL.split('.');
const splitSlash = splitDot[2].split('/');
const pageString = splitSlash[3];

const subPageTit = document.querySelector('.best .section-title');
const listTit = document.querySelector('.best-list-wrapper h3');
subPageTit.textContent = pageString.toUpperCase() + ' ART';
listTit.textContent = pageString.toUpperCase() + ' ART';

async function getSubPageData() {
  const getPageUrl =
    endPoints.product.getProducts + `?sort=${pageString}&cate=all&limit=4`;

  try {
    const data = await getRequest(getPageUrl);
    const bestLists = document.querySelector('.best-lists');
    let bestList = '';

    data.forEach((bestInfo) => {
      bestList = `
        <div class="best-content">
          <div class="best-image">
            <img src="${bestInfo.pr_img}" alt="">
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
            <div class='best-info'>
              <h2 class='item-title'>${bestInfo.pr_ttl}</h2>
              <p class='item-by'>${bestInfo.pr_wt_kr}</p>
              <em class='item-size'>30.0cm x 30.0cm</em>
              <strong class='item-price'>
                ${Number(bestInfo.pr_pri).toLocaleString()}
                <span>원</span>
              </strong>
            </div>
        </div>
      `;

      bestLists.insertAdjacentHTML('beforeend', bestList);
    });
  } catch (error) {
    console.error('Error : ', error);
  }
}
