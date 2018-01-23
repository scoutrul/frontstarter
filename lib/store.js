import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import getReduxDevTools from 'utils/getReduxDevTools';
import rootReducer from 'reducers';
import { asyncMiddle } from 'utils/asyncMiddle';

var middlewares = [thunkMiddleware, asyncMiddle];

export default function configureStore(initialState) {
	var store = createStore(rootReducer, initialState, compose(applyMiddleware.apply(undefined, middlewares), getReduxDevTools()));

	// Enable Webpack hot module replacement for reducers
	// this will be cut out in production
	if (module.hot) {
		module.hot.accept('./reducers', function () {
			var nextRootReducer = require('./reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(middlewares, 'middlewares', 'src/store.js');

	__REACT_HOT_LOADER__.register(configureStore, 'configureStore', 'src/store.js');
}();

;