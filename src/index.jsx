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
