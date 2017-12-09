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

const history = createBrowserHistory()
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

(function () {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('service-worker.js').then(function (registration) {
				// Registration was successful
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}, function (err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
			}).catch(function (err) {
				console.log(err)
			});
		});
	} else {
		console.log('service worker is not supported');
	}
	if ('PushManager' in window) {
		console.log('Push mobile notification is supported');
	}
	else {
		console.warn('Push messaging is not supported');
		pushButton.textContent = 'Push Not Supported';
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
