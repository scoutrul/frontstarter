var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import cn from 'classnames';
import './menu.scss';
import * as ReducerMenu from '../../../reducers/ReducerMenu';

function mapStateToProps(state) {
	return {
		Store: state.ReducerMenu,
		MenuItems: state.ReducerMenu.items
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ReducerMenu, dispatch)
	};
}

var _default = (_dec = connect(mapStateToProps, mapDispatchToProps), withRouter(_class = _dec(_class = function (_Component) {
	_inherits(_default, _Component);

	function _default() {
		var _temp, _this, _ret;

		_classCallCheck(this, _default);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.menuOn = function () {
			var _this2;

			return (_this2 = _this).__menuOn__REACT_HOT_LOADER__.apply(_this2, arguments);
		}, _this.menuOff = function () {
			var _this3;

			return (_this3 = _this).__menuOff__REACT_HOT_LOADER__.apply(_this3, arguments);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_default.prototype.__menuOn__REACT_HOT_LOADER__ = function __menuOn__REACT_HOT_LOADER__() {
		this.props.actions.MenuHoverOn();
		"vibrate" in navigator && window.navigator.vibrate(100);
	};

	_default.prototype.__menuOff__REACT_HOT_LOADER__ = function __menuOff__REACT_HOT_LOADER__() {
		this.props.Store.isMenuHover && this.props.actions.MenuHoverOff();
	};

	_default.prototype.render = function render() {
		var _this4 = this;

		var MenuList = function MenuList(item) {
			return React.createElement(
				'li',
				{ key: item.label },
				React.createElement(
					'div',
					{ onClick: _this4.menuOff },
					React.createElement(
						NavLink,
						{ to: item.url, exact: true, activeClassName: 'active',
							replace: true },
						item.label
					)
				)
			);
		};

		return React.createElement(
			'div',
			{ id: 'menu', onMouseLeave: this.menuOff,
				className: cn({ 'active': this.props.Store.isMenuHover }) },
			React.createElement(
				'div',
				{ id: 'burger', onClick: this.menuOn, onMouseOver: this.menuOn,
					className: cn({ 'hover': this.props.Store.isMenuHover }) },
				React.createElement(
					'span',
					null,
					'\u2630'
				)
			),
			React.createElement(
				'div',
				{ className: 'close', onClick: this.menuOff },
				'\u2345'
			),
			React.createElement(
				'ul',
				{ id: 'menuList',
					className: cn({ 'active': this.props.Store.isMenuHover }) },
				this.props.MenuItems.map(MenuList)
			)
		);
	};

	return _default;
}(Component)) || _class) || _class);

export { _default as default };
;

var _temp2 = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/components/ui/Menu/Menu.js');

	__REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'src/components/ui/Menu/Menu.js');
}();

;