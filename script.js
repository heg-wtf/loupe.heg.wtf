(() => {
  const config = window.LOUPE_CONFIG || {};
  const dialog = document.querySelector('#checkout-dialog');
  const translations = {
    ko: {
      navFeatures:'기능',navPrivacy:'개인정보',navBuy:'Loupe 구매',eyebrow:'AI 사진 검색 · 내 Mac 안에서',heroOne:'머릿속 그 사진을',heroTwo:'말로 찾아보세요.',heroLede:'기억나는 대로 설명하세요. 사진도 검색어도 Mac 밖으로 보내지 않고, Loupe가 몇 초 안에 찾아냅니다.',heroCta:'Loupe 구매',heroFine:'일회성 구매 · 구독 없음',sticker:'클라우드<br>필요 없음',windowTitle:'사진 2,847장',search:'검색',queryLabel:'검색어',query:'“해변의 노을”',match:'일치하는 사진 28장',searchNote:'사진을 말로 검색하세요.',searchPlaceholder:'사진 검색…',resultTag:'개의 추억을<br>찾았어요',featureKicker:'기억하는 방식 그대로 검색',featureTitle:'태그도, 폴더도 없이.<br>내가 쓰는 말로.',naturalChip:'자연어 검색',naturalTitle:'보이는 것을 말해보세요.',naturalBody:'“촛불 켜진 생일 케이크”, “빗속의 빨간 자동차”, “작년 바다”처럼 원하는 언어로 자연스럽게 검색하세요.',privateChip:'처음부터 프라이빗',privateTitle:'내 사진은 계속 내 것.',privateBody:'AI 인덱싱과 검색은 Mac 안에서만 실행됩니다. 계정도, 업로드도, 추적도 없습니다.',detailChip:'한 걸음 더 자세히',detailTitle:'찾고, 자세히 보고.',detailBody:'흐릿한 사진을 찾고, 마음에 드는 사진을 즐겨찾고, 카메라·렌즈 정보와 촬영 위치까지 확인하세요.',flowKicker:'작동 방식',step1Title:'사진 접근 허용',step1Body:'macOS 권한을 허용한 경우에만 라이브러리를 읽습니다.',step2Title:'한 번만, 로컬 인덱싱',step2Body:'MobileCLIP이 기기 안에서 사진의 의미를 파악합니다.',step3Title:'기억나는 대로 검색',step3Body:'말이 추억과 연결됩니다. 오프라인에서도 가능합니다.',privacyKicker:'우리 클라우드가 아닌, 당신의 Mac.',privacyTitle:'내 라이브러리의 일은<br>그 안에서만.',privacyBody:'사진, 검색 문구, 로컬 인덱스는 HEG나 제3자에게 전송되지 않습니다. 선택 기능인 장소명과 지도 미리보기에는 Apple 시스템 서비스가 사용됩니다.',privacyLink:'쉬운 말로 쓴 개인정보 처리방침 보기 →',noUpload:'사진 업로드',noAccount:'필수 계정',noAnalytics:'앱 분석 도구',noSubscription:'구독',priceChip:'일회성 구매',priceScribble:'매달 나가는<br>요금 없음 :)',priceTax:'지역에 따라 세금이 추가될 수 있습니다.',priceFeature1:'자연어 검색 무제한',priceFeature2:'다국어 검색',priceFeature3:'흐림·선명도 탐색',priceFeature4:'EXIF 정보·지도 미리보기',priceCta:'Loupe 구매하고 다운로드',securePayment:'안전한 글로벌 결제',instantDownload:'결제 후 바로 다운로드',requirement:'macOS 26 이상 필요',faq1q:'사진이 업로드되나요?',faq1a:'아니요. 사진 인덱싱과 검색은 모두 Mac 안에서 이뤄집니다. 사진, 검색어, 검색 인덱스를 HEG에 보내지 않습니다.',faq2q:'어떤 Mac을 지원하나요?',faq2a:'현재 Loupe는 macOS 26 이상이 필요합니다.',faq3q:'구매한 앱은 어떻게 다운로드하나요?',faq3a:'결제가 끝나면 다운로드가 표시되고 결제 이메일로도 전송됩니다. My Orders에서 언제든 다시 받을 수 있습니다.',faq4q:'구독 서비스인가요?',faq4a:'아니요. Loupe는 $14.99 일회성 구매입니다.',footerLine:'기억하는 것을 찾으세요.',footerBuy:'구매',footerOrders:'구매 내역',support:'문의',made:'서울에서 세심하게 만들었습니다.',dialogTitle:'결제 연결을 준비하고 있습니다.',dialogBody:'아직 스토어가 활성화되지 않았습니다. 안전한 결제 URL을 연결하면 해외 결제 후 Loupe가 자동으로 전달됩니다.',dialogCta:'출시 알림 요청'
    }
  };

  document.querySelectorAll('[data-price]').forEach(el => { el.textContent = config.price || '$14.99'; });
  document.querySelectorAll('[data-orders]').forEach(el => { el.href = config.ordersUrl || 'https://app.lemonsqueezy.com/my-orders'; });

  const checkoutReady = /^https:\/\/[a-z0-9-]+\.lemonsqueezy\.com\/buy\/[a-zA-Z0-9]+/.test(config.checkoutUrl || '');
  document.querySelectorAll('[data-buy]').forEach(link => {
    if (checkoutReady) {
      link.href = config.checkoutUrl;
      link.target = '_blank';
      link.rel = 'noopener';
    } else {
      link.addEventListener('click', event => {
        event.preventDefault();
        dialog?.showModal();
      });
    }
  });

  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  const languageButton = document.querySelector('[data-language]');
  const setLanguage = language => {
    const isKorean = language === 'ko';
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = translations[language]?.[el.dataset.i18n];
      if (value) el.innerHTML = value;
    });
    languageButton.textContent = isKorean ? 'EN' : 'KR';
    languageButton.setAttribute('aria-label', isKorean ? 'View in English' : '한국어로 보기');
    try { localStorage.setItem('loupe-language', language); } catch (_) {}
  };

  languageButton?.addEventListener('click', () => setLanguage(document.documentElement.lang === 'ko' ? 'en' : 'ko'));
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('loupe-language'); } catch (_) {}
  if (savedLanguage === 'ko') setLanguage('ko');
})();
