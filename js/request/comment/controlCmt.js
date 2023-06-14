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

      data.cmt_lists.forEach((list, idx) => {
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
              <div class="review-list-content" id="list-${idx}">
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
              <div class="review-list-content" id="list-${idx}">
                <p>${list.bx_cmt_cont}</p>
              </div>
            </div>
          `;
        }

        cmtLists.insertAdjacentHTML('beforeend', cmtList);
      });
      getStarLists(data.cmt_lists);
      updateCmtList(data.cmt_lists);
      deleteCmtList(data.cmt_lists);
    }
  } catch (error) {
    console.error('Error :', error);
  }
};

const deleteCmtList = (deleteData) => {
  const cmtDeleteBtns = document.querySelectorAll('button.cmt-delete');

  if (deleteData.length !== 0 || cmtDeleteBtns) {
    cmtDeleteBtns.forEach((btn, idx) => {
      btn.addEventListener('click', function () {
        const deleteUrl =
          endPoints.comment.deleteCmt +
          '?cmt_idx=' +
          deleteData[idx].bx_cmt_idx;

        // console.log(deleteUrl);

        const requestDeleteCmt = async (url, jsonString) => {
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
            // console.log(data);
          } catch (error) {
            console.error('Error', error);
          }
        };
        requestDeleteCmt(deleteUrl, null);
      });
    });
  }
};

function updateCmtList(updateData) {
  const cmtUpdateBtns = document.querySelectorAll('button.cmt-update');

  if (updateData.length !== 0 || cmtUpdateBtns) {
    cmtUpdateBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const changeInput = this.parentNode.parentNode.nextSibling.nextSibling;
        // console.log(changeInput);
        const thisIdx = changeInput.getAttribute('id').split('-')[1];
        this.classList.toggle('active');
        if (btn.classList.contains('active')) {
          this.textContent = '취소';
          changeInput.innerHTML = `
            <form onsubmit="return false;" class="update-form update-form-${thisIdx}">
              <textarea type="text" name="cmt_cont" value="">${updateData[thisIdx].bx_cmt_cont}</textarea>
              <div class="rating">
                <div class="stars">
                  <input type="radio" name="cmt_star" id="up-star-${thisIdx}-1" value="5" class="val-5">
                  <label for="up-star-${thisIdx}-1">
                    <i class="ri-star-line"></i>
                    <i class="ri-star-fill"></i>
                  </label>
                  <input type="radio" name="cmt_star" id="up-star-${thisIdx}-2" value="4" class="val-4">
                  <label for="up-star-${thisIdx}-2">
                    <i class="ri-star-line"></i>
                    <i class="ri-star-fill"></i>
                  </label>
                  <input type="radio" name="cmt_star" id="up-star-${thisIdx}-3" value="3" class="val-3">
                  <label for="up-star-${thisIdx}-3">
                    <i class="ri-star-line"></i>
                    <i class="ri-star-fill"></i>
                  </label>
                  <input type="radio" name="cmt_star" id="up-star-${thisIdx}-4" value="2" class="val-2">
                  <label for="up-star-${thisIdx}-4">
                    <i class="ri-star-line"></i>
                    <i class="ri-star-fill"></i>
                  </label>
                  <input type="radio" name="cmt_star" id="up-star-${thisIdx}-5" value="1" class="val-1">
                  <label for="up-star-${thisIdx}-5">
                    <i class="ri-star-line"></i>
                    <i class="ri-star-fill"></i>
                  </label>
                </div>
              </div>
              <button type="button">수정입력</button>
            </form>
          `;

          // 기존 입력된 별점 가져오기
          const upRadioNum = document.querySelector(
            `.update-form-${thisIdx} input[type="radio"].val-${updateData[thisIdx].bx_cmt_star}`
          );
          upRadioNum.checked = true;

          const udSubmitBtn = document.querySelector(
            `.update-form-${thisIdx} button`
          );

          const form = document.querySelector(`.update-form-${thisIdx}`);
          // console.log(form);
          const url =
            endPoints.comment.updateCmt +
            '?cmt_idx=' +
            updateData[thisIdx].bx_cmt_idx;
          // console.log(url);

          udSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData(form); // 폼에 입력한 데이터 저장
            const plainFormData = Object.fromEntries(formData.entries()); // 저장된 데이터를 일반 문자열로 변환
            const jsonData = JSON.stringify(plainFormData); // 변환된 데이터를 json 형식으로 변환

            // console.log(jsonData);

            putUpdateDataAsJson(url, jsonData);
          });

          const putUpdateDataAsJson = async (url, jsonString) => {
            const options = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: jsonString,
            };

            try {
              const data = await putRequest(url, options);
              alert(data.msg);
              location.reload();
              // console.log(data);
            } catch (error) {
              console.log('Error', error);
            }
          };
        } else {
          this.textContent = '수정';
          changeInput.innerHTML = `
            <p>${updateData[thisIdx].bx_cmt_cont}</p>
          `;
        }
      });
    });
  }
}

const getStarLists = (star) => {
  // console.log(star);
  const starLists = document.querySelectorAll('.star-list');
  let starArr = [];
  star.forEach((starValue) => {
    starArr.push(starValue.bx_cmt_star);
  });

  starLists.forEach((elmt, i) => {
    const negativeValue = 5 - starArr[i];
    // console.log(negativeValue);
    for (let j = 0; j < starArr[i]; j++) {
      elmt.innerHTML += '<i class="ri-star-fill"></i>';
    }

    for (let k = 0; k < negativeValue; k++) {
      elmt.innerHTML += '<i class="ri-star-line"></i>';
    }
  });

  // console.log(starArr);
};
