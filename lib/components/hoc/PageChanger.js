var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './PageChanger.scss';

import Routes from '../Routes';
import { withRouter } from "react-router";

var _default = withRouter(_class = function (_Component) {
	_inherits(_default, _Component);

	function _default() {
		_classCallCheck(this, _default);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	_default.prototype.render = function render() {
		return React.createElement(
			Switch,
			null,
			Object.entries(Routes).map(function (item) {
				var name = item[0],
				    _component = item[1];

				return React.createElement(Route, {
					key: name,
					path: '/' + name, exact: true,
					component: function component() {
						return _component;
					} });
			})
		);
		// return (
		// 	<Motion
		// 		defaultStyle={{
		// 			opacity: 0.001,
		// 			filter: 30
		//
		// 		}}
		// 		style={{
		// 			opacity: spring(1),
		// 			filter: spring(0, { stiffness: 440, damping: 30 })
		// 		}}
		// 	>
		// 		{style => (
		// 			<div style={{ filter: `blur(${style.filter}px)`, opacity: style.opacity }} className='motion'>
		// 				<RouteComponent />
		// 			</div>
		// 		)}
		// 	</Motion>
		// )
	};

	return _default;
}(Component)) || _class;

export { _default as default };