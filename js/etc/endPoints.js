const urlPath = document.location.href;
const domain = new URL(urlPath).hostname;

const protocol = urlPath.split(':')[0];
console.log(protocol);
var endPoints = {
  register: {
    signup: `${protocol}://${domain}/baexang_back/register/signup`,
    signin: `${protocol}://${domain}/baexang_back/register/signin`,
    signout: `${protocol}://${domain}/baexang_back/register/signout`,
    isSignin: `${protocol}://${domain}/baexang_back/register/is_signin`,
    checkAcsCode: `${protocol}://${domain}/baexang_back/register/check_admin_signin`,
  },
  admin: {
    getUsers: `${protocol}://${domain}/baexang_back/admin/get_users`,
    updateUser: `${protocol}://${domain}/baexang_back/admin/update_user`,
    deleteUser: `${protocol}://${domain}/baexang_back/admin/delete_user`,
  },
  product: {
    insertProduct: `${protocol}://${domain}/baexang_back/product/insert_product`,
    getProducts: `${protocol}://${domain}/baexang_back/product/get_products`,
  },
  cart: {
    addCart: `${protocol}://${domain}/baexang_back/cart/add_cart`,
    getCart: `${protocol}://${domain}/baexang_back/cart/get_cart`,
    delCart: `${protocol}://${domain}/baexang_back/cart/del_cart`,
  },
  comment: {
    insertCmt: `${protocol}://${domain}/baexang_back/comment/insert_cmt`,
    getCmt: `${protocol}://${domain}/baexang_back/comment/get_cmt`,
    updateCmt: `${protocol}://${domain}/baexang_back/comment/update_cmt`,
    deleteCmt: `${protocol}://${domain}/baexang_back/comment/delete_cmt`,
  },
};
