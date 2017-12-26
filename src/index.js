import 'babel-polyfill';
import 'styles';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router'
import configureStore from './store';
import App from './components/App';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();
const store = configureStore();

const rootElement = document.getElementById('app');


render(
	<AppContainer>
		<Provider store={store}>
			<Router history={history}>
				<App className='app'/>
			</Router>
		</Provider>
	</AppContainer>,
	rootElement
);


// serviceWorker registration
(function () {
	
	if ('serviceWorker' in navigator) {
		// (process.env.NODE_ENV !== 'development') &&
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('sw.js').then(registration => {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}, function (err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
				registration.pushManager.subscribe({userVisibleOnly: true});
			}).catch(err => {
				console.log(err)
			});
		});
		addEventListener('activate', event => {
			event.waitUntil(async function() {
				// Feature-detect
				if (self.registration.navigationPreload) {
					// Enable navigation preloads!
					await self.registration.navigationPreload.enable();
				}
			}());
		});
		addEventListener('fetch', event => {
			event.respondWith(async function() {
				// Respond from the cache if we can
				const cachedResponse = await caches.match(event.request);
				if (cachedResponse) return cachedResponse;
				
				// Else, use the preloaded response, if it's there
				const response = await event.preloadResponse;
				if (response) return response;
				
				// Else try the network.
				return fetch(event.request);
			}());
		});
	} else {
		console.log('service worker is not supported');
	}
	
})();

// Enable hot updates with react-hot-loader@3, this will be cut out in production
if (module.hot) {
	module.hot.accept('./components/App', () => {
		const NextApp = require('./components/App').default;
		
		render(
			<AppContainer>
				<Provider store={store}>
					<Router history={history}>
						<NextApp/>
					</Router>
				</Provider>
			</AppContainer>,
			rootElement
		);
	});
}
