
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
    "revision": "d40f2462e0a50e42838e3eef1221f035"
  },
  {
    "url": "index.html",
    "revision": "6ec41b00761448df0d3308d8c23761a6"
  },
  {
    "url": "main.css",
    "revision": "1684b8c4fc73de4c872eacc55115b6bc"
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
    "revision": "b37ced4d70346f407f12261d3c2658a7"
  },
  {
    "url": "workbox-sw.prod.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);