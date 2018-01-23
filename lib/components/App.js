var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as ReducerMenu from '../reducers/ReducerMenu';
import cn from 'classnames';

import Routes from './routes';
import Menu from './ui/Menu/Menu';
import Copyright from './ui/copyright/Copyright';
import './app.scss';

function mapStateToProps(state) {
	return {
		Store: state.ReducerMenu,
		Menu: state.ReducerMenu.items
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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
			fontUnit: '12px'
		}, _this.calcFontSize = function () {
			var _this2;

			return (_this2 = _this).__calcFontSize__REACT_HOT_LOADER__.apply(_this2, arguments);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_default.prototype.__calcFontSize__REACT_HOT_LOADER__ = function __calcFontSize__REACT_HOT_LOADER__() {
		var maxWidth = 1200;
		var minWidth = 200;
		var screenWidth = document.getElementsByClassName('page')[0].offsetWidth;
		var minFont = 8;
		var maxFont = 26;
		var containerW = screenWidth > maxWidth ? maxWidth : screenWidth;
		var cent = (maxFont - minFont) / (maxWidth - minWidth);
		this.setState({
			fontUnit: minFont + cent * (containerW - minWidth) + 'px',
			vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		});
	};

	_default.prototype.componentDidMount = function componentDidMount() {
		var _this3 = this;

		this.calcFontSize();
		window.addEventListener('resize', function () {
			_this3.calcFontSize();
		});
	};

	_default.prototype.render = function render() {
		var _this4 = this;

		var TopBack = function TopBack() {
			return !_this4.props.Store.isMenuHover && _this4.props.history.location.hash.indexOf('#works/') !== -1 && React.createElement(
				'a',
				{ className: 'topBack mobileA11yText ', onClick: function onClick() {
						return _this4.props.history.goBack();
					} },
				'\u041D\u0430\u0437\u0430\u0434'
			);
		};

		var viewPortStyles = {
			height: this.state.vh,
			fontSize: this.state.fontUnit
		};
		return React.createElement(
			HashRouter,
			{ hashType: 'noslash' },
			React.createElement(
				'div',
				{ style: viewPortStyles, className: cn('page', { 'blurbg': this.props.Store.isMenuHover }) },
				React.createElement(Menu, null),
				React.createElement(
					'div',
					{ className: cn('content', { 'blur': this.props.Store.isMenuHover }) },
					React.createElement(TopBack, null),
					React.createElement(Routes, null),
					React.createElement(Copyright, null)
				)
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

	__REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/components/App.js');

	__REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'src/components/App.js');
}();

;