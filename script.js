(() => {
  const config = window.LOUPE_CONFIG || {};
  const appStoreUrl = config.appStoreUrl || '';

  document.querySelectorAll('[data-price]').forEach(el => {
    el.textContent = config.price || '$9.99';
  });

  if (/^https:\/\/apps\.apple\.com\//.test(appStoreUrl)) {
    document.querySelectorAll('[data-buy]').forEach(link => {
      link.href = appStoreUrl;
      link.target = '_blank';
      link.rel = 'noopener';
    });
  }
})();
