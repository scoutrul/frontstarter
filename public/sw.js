
importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.2.js');

// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
const workbox = new WorkboxSW({
	skipWaiting: true,
	clientsClaim: true
});


workbox.router.registerRoute(
	new RegExp('^https://frontstarter.ru/'),
	workbox.strategies.staleWhileRevalidate()
);


self.addEventListener('push', (event) => {
	const title = 'Get Started With Workbox';
	const options = {
		body: event.data.text()
	};
	event.waitUntil(self.registration.showNotification(title, options));
});


workbox.precache([
  {
    "url": "https://frontstarter.ru/bundle.js",
    "revision": "df733db68cb83d137fa9a0c09c98ef41"
  },
  {
    "url": "https://frontstarter.ru/index.html",
    "revision": "8b40c81dde10631553d8c085c6d92d8a"
  },
  {
    "url": "sw.js",
    "revision": "a3f1a7845a76fada3e14b0532c1e4b50"
  }
]);