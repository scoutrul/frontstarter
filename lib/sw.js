
importScripts('workbox-sw.prod.js');

// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
var workbox = new WorkboxSW({
	skipWaiting: true,
	clientsClaim: true
});

workbox.router.registerRoute(new RegExp('^/'), workbox.strategies.staleWhileRevalidate());

workbox.precache([]);
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(workbox, 'workbox', 'src/sw.js');
}();

;