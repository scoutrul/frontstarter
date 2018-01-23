var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { withRouter } from "react-router";

import Home from './pages/home/HomePage';
import ToDo from './pages/todo/ToDo';
import Works from './pages/works/Works';
import Contacts from './pages/contacts/Contacts';
import About from './pages/about/About';

import Frontstart from './pages/works/Frontstart';
import Guitar from './pages/works/Guitar';
import Blackur from './pages/works/Blackur';
import Guardsman from './pages/works/Guardsman';
import Naurasha from './pages/works/Naurasha';
import Airplane from './pages/works/Airplane';

var _default = withRouter(_class = function (_Component) {
	_inherits(_default, _Component);

	function _default() {
		_classCallCheck(this, _default);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	_default.prototype.render = function render() {
		var RoutesPages = {
			'Todo': React.createElement(ToDo, null),
			'Works': React.createElement(Works, null),
			'Contacts': React.createElement(Contacts, null),
			'/': React.createElement(Home, null),
			'About': React.createElement(About, null)
		};
		var RoutesWorks = {
			'Frontstart': React.createElement(Frontstart, null),
			'Guitar': React.createElement(Guitar, null),
			'Blackur': React.createElement(Blackur, null),
			'Guardsman': React.createElement(Guardsman, null),
			'Naurasha': React.createElement(Naurasha, null),
			'Airplane': React.createElement(Airplane, null)
		};
		return React.createElement(
			Switch,
			null,
			Object.entries(RoutesPages).map(function (item) {
				var name = item[0],
				    _component = item[1];

				return React.createElement(Route, {
					key: name,
					path: '/' + name, exact: true,
					component: function component() {
						return _component;
					} });
			}),
			Object.entries(RoutesWorks).map(function (item) {
				var name = item[0],
				    _component2 = item[1];

				return React.createElement(Route, {
					key: name,
					path: '/works/' + name, exact: true,
					component: function component() {
						return _component2;
					} });
			})
		);
	};

	return _default;
}(Component)) || _class;

export { _default as default };
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}
}();

;