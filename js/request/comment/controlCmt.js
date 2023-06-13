window.addEventListener('load', function () {
  getCmtLists();
});

const getCmtLists = async () => {
  const getCmtUrl = endPoints.comment.getCmt + '?cmt_pr_ID=' + pidString;

  const cmtlength = document.querySelector('.list-title strong');
  const starAvgFill = document.querySelector('.star-avg-val');
  const starElmt = document.querySelector('.review-info-box .ri-fill');
  const cmtLists = document.querySelector('.review-lists');

  try {
    const data = await getRequest(getCmtUrl);
    let cmtList = '';
    // console.log(data);

    if (data.msg) {
      starAvgFill.textContent = '0';
      starElmt.style.width = 0 + '%';
      cmtList = `<div class="no-elmt">${data.msg}</div>`;
      cmtLists.insertAdjacentHTML('beforeend', cmtList);
    } else {
      const avg = Number(data.star_avg);
      const floatAvg = parseFloat(avg).toFixed(2);

      // parseFloat : 소수점 삭제
      // toFixed : 지정된 자리수까지 소수점 자르기
      starAvgFill.textContent = floatAvg;
      starElmt.style.width = (avg / 5) * 100 - 10 + '%';
      cmtlength.textContent = `${data.cmt_lists.length} comments`;

      data.cmt_lists.forEach((list) => {
        // console.log(list);
        if (data.useridx === 'guest' || list.bx_cmt_u_idx !== data.useridx) {
          cmtList = `
            <div class="review-list">
              <div class="review-list-info">
                <span class="id-reg">
                  <strong>${list.user_id}</strong>
                  <span>${list.bx_cmt_reg}</span>
                  <span class="star-list">

                  </span>
                </span>
              </div>
              <div class="review-list-content">
                <p>${list.bx_cmt_cont}</p>
              </div>
            </div>
          `;
        } else {
          cmtList = `
            <div class="review-list">
              <div class="review-list-info">
                <span class="id-reg">
                  <strong>${list.user_id}</strong>
                  <span>${list.bx_cmt_reg}</span>
                  <span class="star-list">

                  </span>
                </span>
                <span class="btns">
                  <button class="cmt-update">수정</button>
                  <button class="cmt-delete">삭제</button>
                </span>
              </div>
              <div class="review-list-content">
                <p>${list.bx_cmt_cont}</p>
              </div>
            </div>
          `;
        }

        cmtLists.insertAdjacentHTML('beforeend', cmtList);
      });
      getStarLists(data.cmt_lists);
    }
  } catch (error) {
    console.error('Error :', error);
  }
};

const getStarLists = (star) => {
  console.log(star);
  const starLists = document.querySelectorAll('.star-list');
  let starArr = [];
  star.forEach((starValue) => {
    starArr.push(starValue.bx_cmt_star);
  });

  starLists.forEach((elmt, i) => {
    const negativeValue = 5 - starArr[i];
    console.log(negativeValue);
    for (let j = 0; j < starArr[i]; j++) {
      elmt.innerHTML += '<i class="ri-star-fill"></i>';
    }

    for (let k = 0; k < negativeValue; k++) {
      elmt.innerHTML += '<i class="ri-star-line"></i>';
    }
  });

  console.log(starArr);
};
