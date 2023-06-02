window.addEventListener('load', function () {
  getDetailData();
});

const subPageParam = new URL(location.href).searchParams; // 존재하는 파라미터를 배열 형태로 저장
const pidString = subPageParam.get('pid'); // 파라미터 중 특정 키의 값을 추출
const cateString = subPageParam.get('cate');
const cateInitStr = cateString.split('_')[1];

async function getDetailData() {
  const getDetailUrl =
    endPoints.product.getProducts + `?pr_ID=${pidString}&cate=${cateInitStr}`;

  try {
    const data = await getRequest(getDetailUrl);
    console.log(data);
  } catch (error) {
    console.error('Error : ', error);
  }
}
