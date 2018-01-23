console.log("%cFrontStarter.ru", "font: 2.2rem 'Exo 2', 'sans-serif'; color: #FFF; background-color: #667eea; text-decoration: underline #7335cc");


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
				<App/>
			</Router>
		</Provider>
	</AppContainer>,
	rootElement
);

// serviceWorker registration

if ('serviceWorker' in navigator) {
	
	window.addEventListener('load', () => {
		!navigator.serviceWorker && navigator.serviceWorker.register('sw.js').then(registration => {
			process.env && console.log('ServiceWorker registration successful with scope: ', registration.scope);
			
			(process.env.NODE_ENV !== 'production') && registration.unregister().then(() => {
				console.log('unregister is successful')
			});
			
		}, function (err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		}).catch(err => {
			console.log(err)
		});
	})
} else {
	console.log('service worker is not supported');
}
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
