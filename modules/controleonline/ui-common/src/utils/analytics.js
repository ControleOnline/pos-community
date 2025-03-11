import { jsLoader } from './jsloader';

// Load Google Tag Manager script

const loadGTMScript = function(gtmId) {
  (function (w, d, s, l, i) {
    w[l] = w[l];
    w[l].push({
      'gtm.start': new Date().getTime(), event: 'gtm.js'
    });
    let f       = d.getElementsByTagName(s)[0],
        j       = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src   = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', gtmId);
};

const loadHotjarScript = function(hotjarId) {
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:hotjarId,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
};

const gtag = function() {
  window.dataLayer.push(arguments);
};

export default {

  init(config = null) {
    if (config !== null) {
      if (!config['google-tag-manager'])
        return;

      // load main script

      jsLoader.url('https://www.googletagmanager.com/gtag/js')
        .then(() => {

          // init variables

          window.dataLayer = window.dataLayer || [];

          // configure gtags

          gtag('js'    , new Date()     );
          gtag('config', config['google-tag-manager']);

          // load GTM script

          loadGTMScript(config['google-tag-manager']);
        });
		loadHotjarScript(684016);
    }
  },

  // Log Google Tag Manager events

  logEvent(eventName, data = {}) {
    return new Promise((resolve, reject) => {

      try {

        if (!data.event_callback)
          data['event_callback'] = function() {
            resolve(data);
          };

        gtag('event', eventName, data);

      } catch (e) {
        reject(data)
      }

    });
  },

};
