
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
    "revision": "d390bcddc17e10f078e24fcbe5c2ea70"
  },
  {
    "url": "index.html",
    "revision": "7edd2d3e8ed5c1d92c4f5486c39665f4"
  },
  {
    "url": "main.css",
    "revision": "8fd67302518eafdf10853366ef29a819"
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
    "revision": "13c7dececa66f404c05f4f76cac8d317"
  },
  {
    "url": "workbox-sw.prod.js",
    "revision": "e6fcd3e6dda0e5072525e564d08db75f"
  }
]);