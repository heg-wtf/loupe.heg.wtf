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
  'CHECKOUT_SETUP.md', 'privacy/index.html', 'success/index.html'
].map(read).join('\n');

test('canonical domain and deploy CNAME are correct', () => {
  assert.equal(read('CNAME').trim(), 'loupe.heg.wtf');
  assert.match(index, /https:\/\/loupe\.heg\.wtf\//);
});

test('current public price is consistently $14.99', () => {
  assert.match(config, /price:\s*"\$14\.99"/);
  assert.match(index, /\$14\.99/);
  assert.doesNotMatch(projectTextFiles, /\$2\.99|2\.99\$/);
});

test('all paid-download pages and official icon exist', () => {
  for (const file of ['assets/loupe-icon.png', 'privacy/index.html', 'success/index.html']) {
    assert.ok(fs.statSync(path.join(root, file)).size > 0, `${file} should not be empty`);
  }
});

test('checkout is safely disabled until a real hosted URL is configured', () => {
  assert.match(config, /checkoutUrl:\s*""/);
  assert.match(script, /lemonsqueezy\\?\.com/);
  assert.match(script, /showModal\(\)/);
  assert.match(index, /data-buy/g);
});

test('every landing-page translation key has a Korean value', () => {
  const keys = [...index.matchAll(/data-i18n="([^"]+)"/g)].map(match => match[1]);
  assert.ok(keys.length > 40);
  for (const key of new Set(keys)) {
    assert.match(script, new RegExp(`(?:^|[,\\s])${key}\\s*:`), `missing Korean translation for ${key}`);
  }
});

test('privacy accurately separates app data from checkout processing', () => {
  const privacy = read('privacy/index.html');
  assert.match(privacy, /entirely on your Mac/);
  assert.match(privacy, /Lemon Squeezy/);
  assert.match(privacy, /merchant of record/);
});
