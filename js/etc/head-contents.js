const versionUpdate = new Date().getTime();

const pageURL = document.location.href;
let pageName = '';

if (pageURL.includes('index')) {
  pageName = 'main';
} else if (pageURL.includes('sign')) {
  pageName = 'sign';
}

/* ------ Custom CSS Files ----- */
const reset = document.createElement('link');
const common = document.createElement('link');
const animation = document.createElement('link');
const header = document.createElement('link');
const main = document.createElement('link');
const footer = document.createElement('link');
const responsive = document.createElement('link');

reset.rel = 'stylesheet';
reset.href = `/baexang_front/css/reset.css?_v=${versionUpdate}`;
common.rel = 'stylesheet';
common.href = `/baexang_front/css/common.css?_v=${versionUpdate}`;
animation.rel = 'stylesheet';
animation.href = `/baexang_front/css/animation.css?_v=${versionUpdate}`;
header.rel = 'stylesheet';
header.href = `/baexang_front/css/header.css?_v=${versionUpdate}`;
main.rel = 'stylesheet';
main.href = `/baexang_front/css/${pageName}.css?_v=${versionUpdate}`;
footer.rel = 'stylesheet';
footer.href = `/baexang_front/css/footer.css?_v=${versionUpdate}`;
responsive.rel = 'stylesheet';
responsive.href = `/baexang_front/css/responsive.css?_v=${versionUpdate}`;

const fileNames = [reset, common, animation, header, main, footer, responsive];

for (let i = 0; i < fileNames.length; i++) {
  document.head.insertAdjacentElement('beforeend', fileNames[i]);
}

/* ------ Custom JS Files ----- */
const include = document.createElement('script');
const customjq = document.createElement('script');
const customjs = document.createElement('script');

include.type = 'text/javascript';
include.src = `/baexang_front/js/etc/include.js?_v=${versionUpdate}`;
customjq.type = 'text/javascript';
customjq.src = `/baexang_front/js/ui/customjq.js?_v=${versionUpdate}`;
customjs.type = 'text/javascript';
customjs.src = `/baexang_front/js/ui/customjs.js?_v=${versionUpdate}`;

document.body.insertAdjacentElement('beforeend', include);
document.body.insertAdjacentElement('beforeend', customjq);
document.body.insertAdjacentElement('beforeend', customjs);
