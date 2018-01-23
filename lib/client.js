console.log("%cFrontStarter.ru", "font: 2.2rem 'Exo 2', 'sans-serif'; color: #FFF; background-color: #667eea; text-decoration: underline #7335cc");

import 'babel-polyfill';
import 'styles';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from './store';
import App from './components/App';
import createBrowserHistory from 'history/createBrowserHistory';

var history = createBrowserHistory();
var store = configureStore();

var rootElement = document.getElementById('app');

render(React.createElement(
	AppContainer,
	null,
	React.createElement(
		Provider,
		{ store: store },
		React.createElement(
			Router,
			{ history: history },
			React.createElement(App, null)
		)
	)
), rootElement);

// serviceWorker registration

if ('serviceWorker' in navigator) {

	window.addEventListener('load', function () {
		!navigator.serviceWorker && navigator.serviceWorker.register('sw.js').then(function (registration) {
			process.env && console.log('ServiceWorker registration successful with scope: ', registration.scope);

			process.env.NODE_ENV !== 'production' && registration.unregister().then(function () {
				console.log('unregister is successful');
			});
		}, function (err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		}).catch(function (err) {
			console.log(err);
		});
	});
} else {
	console.log('service worker is not supported');
}
// Enable hot updates with react-hot-loader@3, this will be cut out in production
if (module.hot) {
	module.hot.accept('./components/App', function () {
		var NextApp = require('./components/App').default;

		render(React.createElement(
			AppContainer,
			null,
			React.createElement(
				Provider,
				{ store: store },
				React.createElement(
					Router,
					{ history: history },
					React.createElement(NextApp, null)
				)
			)
		), rootElement);
	});
}
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(history, "history", "src/client.js");

	__REACT_HOT_LOADER__.register(store, "store", "src/client.js");

	__REACT_HOT_LOADER__.register(rootElement, "rootElement", "src/client.js");
}();

;