const cacheName = "cachesAssets";

/*
 * On Install Event
 * It will be triggered when the service worker is installed.
 */

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      cache.addAll([
        "./",
        "./index.html",
        "./main.js",
        "./style.css",
        "./Assets/music1.png",
      ]);
    })
  );
});

/*
 * On Activate Event
 * It will be triggered when the service worker is activated.
 */

self.addEventListener("activate", (event) => {
  console.log("[SW] Activate: ", event);
  event.waitUntil(clients.claim());
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((item) => {
        console.log("Found:", item);
        if (item !== cacheName) {
          caches.delete(item);
        }
      });
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache.match(event.request).then(function (cachedResponse) {
        const fetchedResponse = fetch(event.request).then(function (
          networkResponse
        ) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchedResponse;
      });
    })
  );
});

if (navigator.onLine) {
  console.log("You are online!");
} else {
  console.log("You are offline!");
}
