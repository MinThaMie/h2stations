'use strict';

module.exports = function (/* environment, appConfig */) {
  return {
    name: 'H2 Tanken',
    short_name: 'H2 Tanken',
    description:
      'This tiny app shows info in a responsive way about the Dutch (and Europe) H2 stations. It uses the data provided by h2.live.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#044389',
    theme_color: '#044389',
    icons: [
      {
        src: 'images/pwa-icons/72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'images/pwa-icons/72.png',
        sizes: '72x72',
        type: 'image/png',
        targets: ['favicon'],
      },
      {
        src: 'images/pwa-icons/96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'images/pwa-icons/128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'images/pwa-icons/144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'images/pwa-icons/152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'images/pwa-icons/192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'images/pwa-icons/284.png',
        sizes: '284x284',
        type: 'image/png',
      },
      {
        src: 'images/pwa-icons/512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    ms: {
      tileColor: '#044389',
    },
  };
};
