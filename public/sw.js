
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
    "revision": "a4a5ea444c24193e10205a09a95f8f88"
  },
  {
    "url": "index.html",
    "revision": "6ec41b00761448df0d3308d8c23761a6"
  },
  {
    "url": "main.css",
    "revision": "31713933ad481098826bb7a9f01f26b9"
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
    "revision": "3ad1c52164dff121a94120637eb69eb7"
  },
  {
    "url": "workbox-sw.prod.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);