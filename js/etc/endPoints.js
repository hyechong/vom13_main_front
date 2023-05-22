const urlPath = document.location.href;
const domain = new URL(urlPath).hostname;
var endPoints = {
  register: {
    signup: `https://${domain}/baexang_back/register/signup`,
    signin: `https://${domain}/baexang_back/register/signin`,
    signout: `https://${domain}/baexang_back/register/signout`,
    isSignin: `https://${domain}/baexang_back/register/is_signin`,
    checkAcsCode: `https://${domain}/baexang_back/register/check_admin_signin`,
  },
  admin: {
    getUsers: `https://${domain}/baexang_back/admin/get_users`,
  },
  productPictures: {},
  productDrawings: {},
};
