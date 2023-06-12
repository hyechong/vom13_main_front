window.addEventListener('load', function () {
  insertCommentData();
});

// pidString 변수는 getDetailData 파일에 작성된 변수로 불러와짐.

const insertCommentData = () => {
  const cmtTextContet = document.querySelector('textarea.cmt-cont');
  const cmtBtn = document.querySelector('.cmt-insert');
  const isCheckStar = document.querySelectorAll('.cmt-star');

  cmtBtn.addEventListener('click', () => {
    let selected = false;

    if (!cmtTextContet.value) {
      alert('내용을 입력해 주세요.');
      cmtTextContet.focus();
      return;
    }

    for (let radio of isCheckStar) {
      // console.log(radio);
      if (radio.checked) {
        selected = true;
      }
    }

    if (!selected) {
      const isInput = confirm(
        '별점 평가가 없으면 한개가 입력됩니다. \n입력하시겠습니까?'
      );
      if (!isInput) {
        return;
      }
    }

    const url = endPoints.comment.insertCmt + '?pr_ID=' + pidString;
    const form = document.querySelector('.review-form form');

    const formData = new FormData(form); // 폼에 입력한 데이터 저장
    const plainFormData = Object.fromEntries(formData.entries()); // 저장된 데이터를 일반 문자열로 변환
    const jsonData = JSON.stringify(plainFormData); // 변환된 데이터를 json 형식으로 변환

    postCommentDataAsJson(url, jsonData);

    async function postCommentDataAsJson(url, jsonString) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonString,
      };

      try {
        const data = await postRequest(url, options);
        alert(data.msg);
        location.reload();
      } catch (error) {
        console.log('Error', error);
      }
    }
  });
};
