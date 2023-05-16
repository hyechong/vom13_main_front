window.addEventListener('load', function () {
  startSignin();
});

const startSignin = () => {
  console.log(endPoints);
  const signin = document.querySelector('input[type="submit"]');
  const idInput = document.querySelector('.id');
  const pwdInput = document.querySelector('.pwd');
  let check = false;

  if (signin) {
    signin.addEventListener('click', () => {
      check = true;

      if (!idInput.value) {
        alert('아이디를 입력해 주세요.');
        idInput.focus();
        return;
      }

      if (!pwdInput.value) {
        alert('비밀번호를 입력해 주세요.');
        pwdInput.focus();
        return;
      }

      const url = endPoints.register.signin;
      const form = document.querySelector('#signinForm');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form); // 폼에 입력한 데이터 저장
        const plainFormData = Object.fromEntries(formData.entries()); // 저장된 데이터를 일반 문자열로 변환
        const jsonData = JSON.stringify(plainFormData); // 변환된 데이터를 json형식으로 변환

        postSigninDataAsJson(url, jsonData);
      });

      const postSigninDataAsJson = async (url, jsonString) => {
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
          if (check) {
            if (data.msg) {
              alert(data.msg);
            } else {
              location.href = '/baexang_front/index.html';
            }
            check = false;
          }
        } catch (error) {
          console.log('Error', error);
        }
      };
    });
  }
};
