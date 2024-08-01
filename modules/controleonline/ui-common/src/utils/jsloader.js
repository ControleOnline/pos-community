export const jsLoader = {

  url : (url) => {
    return new Promise((resolve, reject) => {
      let script   = document.createElement('script');

      script.type  = 'text/javascript';
      script.src   = url;
      script.async = true;
      script.addEventListener('load' , () => resolve(script), false);
      script.addEventListener('error', () => reject (script), false);

      document.getElementsByTagName('head')[0].appendChild(script);
    });
  },

  urls: (urls) => {
    return Promise.all(urls.map(jsLoader.url));
  }
};