importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox){
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    { url: '/pages/team.html', revision: '1' },
    { url: '/pages/fav-team.html', revision: '1' },
    { url: '/pages/scorer.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/img/no_image.png', revision: '1' },
    { url: '/img/icons/icon-72x72.png', revision: '1' },
    { url: '/img/icons/icon-96x96.png', revision: '1' },
    { url: '/img/icons/icon-128x128.png', revision: '1' },
    { url: '/img/icons/icon-144x144.png', revision: '1' },
    { url: '/img/icons/icon-152x152.png', revision: '1' },
    { url: '/img/icons/icon-192x192.png', revision: '1' },
    { url: '/img/icons/icon-384x384.png', revision: '1' },
    { url: '/img/icons/icon-512x512.png', revision: '1' },
  ]);

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );
  
  // Menyimpan cache dari CSS Google Fonts
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );
  
  // Menyimpan cache untuk file font selama 1 tahun
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
  );
  
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate()
  );

} else {
  console.log(`Workbox gagal dimuat`);
}

// const CACHE_NAME = 'football-pwa-v2';
// var urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/manifest.json",
//   "/pages/standings.html",
//   "/pages/team.html",
//   "/pages/fav-team.html",
//   "/css/materialize.min.css",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/idb.js",
//   "/js/db.js",
//   "/js/api.js",
//   "/js/main.js",
//   "/img/no_image.png",
//   "/img/icons/icon-72x72.png",
//   "/img/icons/icon-96x96.png",
//   "/img/icons/icon-128x128.png",
//   "/img/icons/icon-144x144.png",
//   "/img/icons/icon-152x152.png",
//   "/img/icons/icon-192x192.png",
//   "/img/icons/icon-384x384.png",
//   "/img/icons/icon-512x512.png",
// ];
 
// // Memasang aset cache
// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Menggunakan aset cache
// // self.addEventListener("fetch", function(event) {
// //   event.respondWith(
// //     caches
// //       .match(event.request, { cacheName: CACHE_NAME })
// //       .then(function(response) {
// //         if (response) {
// //           console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
// //           return response;
// //         }
 
// //         console.log(
// //           "ServiceWorker: Memuat aset dari server: ",
// //           event.request.url
// //         );
// //         return fetch(event.request);
// //       })
// //   );
// // });

// ///Menyimpan Cache Secara Dinamis
// self.addEventListener("fetch", function (event) {
//   var base_url = "https://api.football-data.org/v2/";
//   if (event.request.url.indexOf(base_url) > -1) {
//       event.respondWith(
//           caches.open(CACHE_NAME).then(function (cache) {
//               return fetch(event.request).then(function (response) {
//                   cache.put(event.request.url, response.clone());
//                   return response;
//               })
//           })
//       );
//   } else {
//       event.respondWith(
//           caches.match(event.request, {
//               ignoreSearch: true
//           }).then(function (response) {
//               return response || fetch(event.request);
//           })
//       )
//   }
// });

// // Hapus cache lama
// self.addEventListener("activate", function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/no_image.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});