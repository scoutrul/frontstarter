var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { createAction, createReducer } from 'redux-act';
export var FetchMenu = createAction('menu items is fetched');
export var MenuHoverOn = createAction('menu is hover on');
export var MenuHoverOff = createAction('menu is hover off');

var initialState = {
	isMenuHover: false,
	items: [{ label: '/', url: '/', description: 'Index' }, { label: 'About', url: '/about', description: 'About' }, { label: 'Works', url: '/works', description: 'Works' }, { label: 'Contacts', url: '/contacts', description: 'Contacts' }]

};

var _default = createReducer((_createReducer = {}, _createReducer[FetchMenu] = function (state, payload) {
	return _extends({}, state, { items: [].concat(payload)
	});
}, _createReducer[MenuHoverOn] = function (state) {
	return _extends({}, state, { isMenuHover: true
	});
}, _createReducer[MenuHoverOff] = function (state) {
	return _extends({}, state, { isMenuHover: false
	});
}, _createReducer), initialState);

export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(FetchMenu, 'FetchMenu', 'src/reducers/ReducerMenu.js');

	__REACT_HOT_LOADER__.register(MenuHoverOn, 'MenuHoverOn', 'src/reducers/ReducerMenu.js');

	__REACT_HOT_LOADER__.register(MenuHoverOff, 'MenuHoverOff', 'src/reducers/ReducerMenu.js');

	__REACT_HOT_LOADER__.register(initialState, 'initialState', 'src/reducers/ReducerMenu.js');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/reducers/ReducerMenu.js');
}();

;