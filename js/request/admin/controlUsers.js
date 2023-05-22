window.addEventListener('load', function () {
  // console.log(endPoints);
  getUserData();
});

const getUserData = () => {
  const getUserUrl = endPoints.admin.getUsers;
  // console.log(getUserUrl);

  const requestGetUsers = async (url) => {
    try {
      const data = await getRequest(url);
      const userLists = document.querySelector('.admin-user-lists');
      let userList = '';
      if (data[0] === null) {
        userList = `
          <li class="list-null">회원이 없습니다.</li>
        `;
        userLists.insertAdjacentHTML('beforeend', userList);
      } else {
        // console.log(data);
        data.forEach((userInfo) => {
          // console.log(userInfo);
          userList = `
            <li class="list-contents">
              <form onsubmit="return false;">
                <span class="num">${userInfo.user_idx}</span>
                <span class="id">${userInfo.user_id}</span>
                <span class="name"><input type="text" value="${userInfo.user_name}"></span>
                <span class="lvl"><input type="text" value="${userInfo.user_lvl}"></span>
                <span class="update on"><input type="submit" value="수정"></span>
                <span class="delete"><input type="submit" value="삭제"></span>
              </form>
            </li>
          `;
          userLists.insertAdjacentHTML('beforeend', userList);
        });
      }
      upDateUserInfo(data);
    } catch (error) {
      console.log('Error', error);
    }
  };
  requestGetUsers(getUserUrl);
};

const upDateUserInfo = (userInfo) => {
  const updateBtns = document.querySelectorAll('.update.on');

  updateBtns.forEach((btn, i) => {
    btn.addEventListener('click', function () {
      const nameInput =
        updateBtns[i].previousElementSibling.previousElementSibling
          .childNodes[0];
      const lvlInput = updateBtns[i].previousElementSibling.childNodes[0];
      const idx = userInfo[i].user_idx;
      console.log(idx);
    });
  });
};
