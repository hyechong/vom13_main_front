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
    updateUser: `https://${domain}/baexang_back/admin/update_user`,
    deleteUser: `https://${domain}/baexang_back/admin/delete_user`,
  },
  product: {
    insertProduct: `https://${domain}/baexang_back/product/insert_product`,
    getProducts: `https://${domain}/baexang_back/product/get_products`,
  },
  cart: {
    addCart: `https://${domain}/baexang_back/cart/add_cart`,
    getCart: `https://${domain}/baexang_back/cart/get_cart`,
    delCart: `https://${domain}/baexang_back/cart/del_cart`,
  },
};
