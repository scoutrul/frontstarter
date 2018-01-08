
importScripts('workbox-sw.prod.js');

// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
const workbox = new WorkboxSW({
	skipWaiting: true,
	clientsClaim: true
});


workbox.router.registerRoute(
	new RegExp('^/'),
	workbox.strategies.staleWhileRevalidate()
);

workbox.precache([
  {
    "url": "bundle.js",
    "revision": "577b0481c2327ec3cdf9107d1065a97b"
  },
  {
    "url": "index.html",
    "revision": "d2f1192b7ab6f9c06e4a229020c6125e"
  },
  {
    "url": "main.css",
    "revision": "44a18f32bf2e99127d719a30417e84b1"
  },
  {
    "url": "manifest.json",
    "revision": "0e760fa26f3ae1851d234d34cb54e1ba"
  },
  {
    "url": "server.js",
    "revision": "8cc6f26deef244b4149fde12372a65df"
  },
  {
    "url": "sw.js",
    "revision": "fc55d2a4e9a81455f9f579b02e771686"
  },
  {
    "url": "workbox-sw.prod.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);