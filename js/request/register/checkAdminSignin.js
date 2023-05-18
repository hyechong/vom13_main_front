window.addEventListener('load', function () {
  checkAdminSignin();
});

const checkAdminSignin = () => {
  // console.log(endPoints);
  const checkAcsCodeUrl = endPoints.register.checkAcsCode;
  // console.log(checkAcsCodeUrl);

  const checkAcsCode = async (url) => {
    try {
      const data = await getRequest(url);
      if (data.acs_code === 0) {
        alert('접근 권한이 없습니다.');
        location.href = '/baexang_front/index.html';
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  checkAcsCode(checkAcsCodeUrl);
};
