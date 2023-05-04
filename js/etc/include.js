$(function () {
  const versionUpdate = new Date().getTime();
  $('#header-wrapper').load(
    `/baexang_front/include/header.html?_v=${versionUpdate}`
  );
  $('#mobile-overlay-wrapper').load(
    `/baexang_front/include/mobile-menus.html?_v=${versionUpdate}`
  );
  $('#footer-wrapper').load(
    `/baexang_front/include/footer.html?_v=${versionUpdate}`
  );
});
