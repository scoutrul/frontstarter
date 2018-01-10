
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
    "revision": "a865ce3285f6c2971728fee3ad2e2c57"
  },
  {
    "url": "index.html",
    "revision": "573ba319d6709e0c188a10fb506418ea"
  },
  {
    "url": "main.css",
    "revision": "8a9139b72eefac2b26e6d8024a113eaa"
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
    "revision": "581dbe42ccfe886d5252e8157cbb01ec"
  },
  {
    "url": "workbox-sw.prod.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);