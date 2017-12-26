
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


self.addEventListener('push', (event) => {
	const title = 'Get Started With Workbox';
	const options = {
		body: event.data.text()
	};
	event.waitUntil(self.registration.showNotification(title, options));
});


workbox.precache([
  {
    "url": "bundle.js",
    "revision": "b5f8761e12dc58258695579b24aab266"
  },
  {
    "url": "index.html",
    "revision": "d4fa3e04a2b2fa0f346d4da00cfdf40d"
  },
  {
    "url": "main.css",
    "revision": "51842f2f713507caedb432522e2caf3a"
  },
  {
    "url": "sw.js",
    "revision": "4e34d67e85dffdd857c4085dbfa841b5"
  },
  {
    "url": "workbox-sw.prod.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);