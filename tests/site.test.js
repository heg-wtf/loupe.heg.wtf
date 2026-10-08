const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const index = read('index.html');
const script = read('script.js');
const config = read('config.js');

const projectTextFiles = [
  'index.html', 'styles.css', 'script.js', 'config.js', 'README.md',
  'privacy/index.html'
].map(read).join('\n');

test('canonical domain and deploy CNAME are correct', () => {
  assert.equal(read('CNAME').trim(), 'loupe.heg.wtf');
  assert.match(index, /https:\/\/loupe\.heg\.wtf\//);
});

test('sitemap lists only the pages that still exist', () => {
  const sitemap = read('sitemap.xml');
  assert.match(sitemap, /https:\/\/loupe\.heg\.wtf\/</);
  assert.match(sitemap, /https:\/\/loupe\.heg\.wtf\/privacy\//);
  assert.doesNotMatch(sitemap, /success/);
});

test('current public price is consistently $9.99', () => {
  assert.match(config, /price:\s*"\$9\.99"/);
  assert.match(index, /\$9\.99/);
  assert.doesNotMatch(projectTextFiles, /\$14\.99|14\.99\$|\$2\.99|2\.99\$/);
});

test('all published pages and the official icon exist', () => {
  for (const file of ['assets/loupe-icon.png', 'privacy/index.html']) {
    assert.ok(fs.statSync(path.join(root, file)).size > 0, `${file} should not be empty`);
  }
});

test('purchase goes to the Mac App Store product page', () => {
  const appStoreUrl = 'https://apps.apple.com/us/app/loupe-ai-photo-search/id6791772300?mt=12';
  assert.match(config, /appStoreUrl:\s*"https:\/\/apps\.apple\.com\//);
  assert.ok(config.includes(appStoreUrl), 'config.js should hold the App Store product URL');
  assert.ok(index.includes(appStoreUrl), 'index.html should link to the App Store product page');

  const buyLinks = [...index.matchAll(/<a[^>]*data-buy[^>]*>/g)].map(match => match[0]);
  assert.ok(buyLinks.length >= 3, 'every buy call to action should be present');
  for (const link of buyLinks) {
    assert.ok(link.includes(appStoreUrl), `buy link should point at the App Store: ${link}`);
  }
});

test('the retired Lemon Squeezy checkout is fully removed', () => {
  assert.doesNotMatch(projectTextFiles, /lemon\s?squeezy/i, 'no file should reference Lemon Squeezy');
  assert.ok(!fs.existsSync(path.join(root, 'success')), 'the post-checkout page should be removed');
  assert.ok(!fs.existsSync(path.join(root, 'CHECKOUT_SETUP.md')), 'the checkout setup doc should be removed');
  assert.doesNotMatch(index, /<dialog/, 'the placeholder checkout dialog should be gone');
  assert.doesNotMatch(script, /showModal/);
});

test('the site is English only with no language switch left behind', () => {
  const korean = /[가-힯]/;
  for (const file of ['index.html', 'script.js', 'config.js', 'styles.css']) {
    assert.doesNotMatch(read(file), korean, `${file} should not contain Korean text`);
  }
  assert.doesNotMatch(index, /data-i18n|lang-button|data-language/);
  assert.doesNotMatch(script, /translations|setLanguage/);
  assert.match(index, /<html lang="en">/);
});

test('the Seoul sign-off is removed from the footer', () => {
  assert.doesNotMatch(projectTextFiles, /Made carefully in Seoul/);
});

test('privacy separates on-device app data from App Store purchase data', () => {
  const privacy = read('privacy/index.html');
  assert.match(privacy, /entirely on your Mac/);
  assert.match(privacy, /Mac App Store/);
  assert.match(privacy, /Apple is the seller/);
  assert.match(privacy, /apple\.com\/legal\/privacy/);
});
