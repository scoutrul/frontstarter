var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { createAction, createReducer } from 'redux-act';
export var FetchMenu = createAction('menu items is fetched');

var initialState = {
	pages: {
		about: {}
	}

};

var _default = createReducer((_createReducer = {}, _createReducer[FetchMenu] = function (state, payload) {
	return _extends({}, state, { items: [].concat(payload)
	});
}, _createReducer), initialState);

export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(FetchMenu, 'FetchMenu', 'src/reducers/english.js');

	__REACT_HOT_LOADER__.register(initialState, 'initialState', 'src/reducers/english.js');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/reducers/english.js');
}();

;