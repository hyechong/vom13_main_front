window.addEventListener('load', function () {
  insertProductData();
});

const insertProductData = () => {
  const title = document.querySelector('#title');
  const wt_en = document.querySelector('#wt_en');
  const wt_kr = document.querySelector('#wt_kr');
  const price = document.querySelector('#price');
  const desc = document.querySelector('#desc');
  const f_img = document.querySelector('#f_img');

  const url = endPoints.product.insertProduct;
  console.log(url);
  const form = document.querySelector('form.admin-insert-wrapper');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!title.value) {
      alert('작품명을 입력해 주세요.');
      title.focus();
      return;
    }

    if (!wt_en.value) {
      alert('영문 작가명을 입력해 주세요.');
      wt_en.focus();
      return;
    }

    if (!wt_kr.value) {
      alert('한글 작가명을 입력해 주세요.');
      wt_kr.focus();
      return;
    }

    if (!price.value) {
      alert('작품 가격을 입력해 주세요.');
      price.focus();
      return;
    }

    if (!desc.value) {
      alert('작품설명을 입력해 주세요.');
      desc.focus();
      return;
    }

    if (!f_img.value) {
      alert('사진을 선택해 주세요.');
      f_img.focus();
      return;
    }

    const formData = new FormData(form); // 폼에 입력한 데이터 저장
    postInsertProductData(url, formData);
  });

  const postInsertProductData = async (url, formData) => {
    const options = {
      method: 'POST',
      body: formData,
    };
    try {
      const data = await postRequest(url, options);
      alert(data.msg);
      window.location.reload();
      // price.value='';
    } catch (error) {
      console.error('Error : ', error);
    }
  };
};
