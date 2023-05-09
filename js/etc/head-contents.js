const versionUpdate = new Date().getTime();

const pageURL = document.location.href;
let pageName = '';

if (pageURL.includes('index')) {
  pageName = 'main';
} else if (pageURL.includes('sign')) {
  pageName = 'sign';
}

/* ------ Custom CSS Files ----- */
const cssFileNames = [
  'reset',
  'common',
  'animation',
  'header',
  `${pageName}`,
  'footer',
  'responsive',
];

for (let i = 0; i < cssFileNames.length; i++) {
  const cssFile = document.createElement('link');
  cssFile.rel = 'stylesheet';
  cssFile.href = `/baexang_front/css/${cssFileNames[i]}.css?_v=${versionUpdate}`;
  document.head.insertAdjacentElement('beforeend', cssFile);
}

/* ------ Custom JS Files ----- */

const include = document.createElement('script');
include.type = 'text/javascript';
include.src = `/baexang_front/js/etc/include.js?_v=${versionUpdate}`;
document.body.insertAdjacentElement('beforeend', include);

const jsFileNames = ['customjq', 'customjs'];

for (let i = 0; i < jsFileNames.length; i++) {
  const jsFile = document.createElement('script');
  jsFile.type = 'text/javascript';
  jsFile.src = `/baexang_front/js/ui/${jsFileNames[i]}.js?_v=${versionUpdate}`;
  document.body.insertAdjacentElement('beforeend', jsFile);
}
