var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './about.scss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return {
		initialList: state.technology
	};
}

var _default = (_dec = connect(mapStateToProps), withRouter(_class = _dec(_class = function (_React$Component) {
	_inherits(_default, _React$Component);

	function _default() {
		var _temp, _this, _ret;

		_classCallCheck(this, _default);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
			initialList: _this.props.initialList,
			sortedList: [],
			stack: ['react', 'redux', 'javascript', 'html5', 'css3', 'sass'],
			tools: ['webpack', 'webstorm', 'git', 'npm', 'chrome', 'google'],
			stackMap: [],
			toolsMap: []
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_default.prototype.componentWillMount = function componentWillMount() {
		var _this2 = this;

		var sortedList = this.state.initialList.filter(function (curr) {
			return !_this2.state.stack.some(function (item) {
				return item === curr.label;
			}) && !_this2.state.tools.some(function (item) {
				return item === curr.label;
			});
		});

		var stackMap = this.state.initialList.filter(function (curr) {
			return _this2.state.stack.some(function (item) {
				return item === curr.label;
			});
		});

		var toolsMap = this.state.initialList.filter(function (curr) {
			return _this2.state.tools.some(function (item) {
				return item === curr.label;
			});
		});

		this.setState({ sortedList: sortedList, stackMap: stackMap, toolsMap: toolsMap });
	};

	_default.prototype.render = function render() {
		var _state = this.state,
		    sortedList = _state.sortedList,
		    stackMap = _state.stackMap,
		    toolsMap = _state.toolsMap;


		var ItemsRender = function ItemsRender(array) {
			return React.createElement(
				'ul',
				{ className: 'icons' },
				array.map(function (item) {
					return React.createElement(
						'li',
						{ key: item.label },
						React.createElement(
							'span',
							null,
							item.label
						),
						React.createElement('img', { src: item.url, alt: item.label })
					);
				})
			);
		};

		return React.createElement(
			'section',
			null,
			React.createElement(
				'div',
				{ className: 'contentView about mobileA11yText' },
				React.createElement(
					'div',
					{ className: 'fotostatus' },
					React.createElement('div', { className: 'photo', title: '\u0413\u0435\u0440\u043E\u0439-\u0445\u0430\u043A\u0435\u0440 \u0441\u0435\u0440\u0438\u0430\u043B\u0430 MR.ROBOT' }),
					React.createElement(
						'div',
						{ className: 'info' },
						React.createElement(
							'h1',
							null,
							'\u0413\u043E\u043B\u043E\u0432\u0430\u0447\u0435\u0432 \u0410\u043D\u0442\u043E\u043D \u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440\u043E\u0432\u0438\u0447'
						),
						React.createElement(
							'h2',
							null,
							'\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043D\u0432\u044B\u043A\u0438:'
						),
						ItemsRender(stackMap),
						React.createElement(
							'h2',
							null,
							'\u041F\u043E\u0440\u0442\u0440\u0435\u0442:'
						),
						React.createElement(
							'ul',
							null,
							React.createElement(
								'li',
								null,
								'31 \u0433\u043E\u0434, \u041C\u043E\u0441\u043A\u0432\u0430, \u0445\u043E\u043B\u043E\u0441\u0442'
							),
							React.createElement(
								'li',
								null,
								'\u0441\u0435\u0440\u0438\u0430\u043B\u044B, \u0433\u0438\u0442\u0430\u0440\u0430, \u0432\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434, \u043F\u043E\u043A\u0435\u0440, \u0441\u0442\u0430\u0440\u043A\u0440\u0430\u0444\u0442'
							),
							React.createElement(
								'li',
								null,
								'\u043A\u0430\u0440\u044C\u0435\u0440\u0430, \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F, \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F'
							)
						),
						React.createElement(
							'h2',
							{ className: 'status' },
							'\u0421\u0442\u0430\u0442\u0443\u0441: ',
							React.createElement(
								'span',
								null,
								'\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0434\u043B\u044F \u043D\u0430\u0439\u043C\u0430'
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'hello' },
					React.createElement(
						'p',
						null,
						'\u041F\u0440\u0438\u0432\u0435\u0442! \u042F \u0444\u0440\u043E\u043D\u0442\u0435\u043D\u0434-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u0441 \u0442\u0440\u0435\u0445-\u043B\u0435\u0442\u043D\u0438\u043C \u0441\u0442\u0430\u0436\u0435\u043C. \u041F\u0440\u0438\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0441\u044C \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 JavaScript, \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0441\u044C \u043D\u043E\u0432\u044B\u043C\u0438 \u043C\u0435\u0442\u043E\u0434\u0438\u043A\u0430\u043C\u0438 \u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438. \u0422\u0430\u043A \u0436\u0435 \u0431\u043E\u043B\u0435\u0435 10 \u043B\u0435\u0442 \u0437\u0430\u043D\u0438\u043C\u0430\u044E\u0441\u044C \u0432\u0435\u0431-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u043C: \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430, \u0434\u0438\u0437\u0430\u0439\u043D \u0438 \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u043E\u0432, \u043F\u043E\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u0435 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0445 \u0441\u0435\u0442\u0435\u0439, \u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432.'
					),
					React.createElement(
						'p',
						null,
						'\u0412\u043B\u0430\u0434\u0435\u044E \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u043C\u0438 \u0437\u043D\u0430\u043D\u0438\u044F\u043C\u0438 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0432\u0435\u0431-\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F (\u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0438\u0432\u043D\u043E, \u0430\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u043E, \u043E\u0431\u043B\u0430\u0447\u043D\u043E, \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E). \u0412 2017\u20142018 \u0433\u043E\u0434\u0443 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u044E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0435\u043A \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 ReactJS + Redux + ES6 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 WebPack.'
					),
					React.createElement(
						'p',
						null,
						'\u042F \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0438\u0448\u0443 \u043A\u043E\u0434 \u043A\u0430\u043A \u0444\u0440\u043E\u043D\u0442\u0435\u044D\u043D\u0434 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A, \u043D\u043E \u0438 \u0430\u043A\u0442\u0438\u0432\u043D\u043E \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0441\u044C \u0438 \u0432\u043D\u0435\u0434\u0440\u044F\u044E \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0442\u0440\u0435\u043D\u0434\u044B \u0434\u0438\u0437\u0430\u0439\u043D\u0430 \u0438 \u044E\u0437\u0430\u0431\u0438\u043B\u0438\u0442\u0438 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043E\u0432 \u0432 \u0441\u0432\u043E\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u044B. \u041B\u044E\u0431\u043B\u044E \u0432\u0435\u0440\u0441\u0442\u0430\u0442\u044C \u0438 \u0430\u043D\u0438\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C. \u0417\u043D\u0430\u044E \u043E \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0438\u043A\u0435 \u0438 \u043C\u043E\u0434\u0443\u043B\u044C\u043D\u044B\u0445 \u0441\u0435\u0442\u043A\u0430\u0445.'
					),
					React.createElement(
						'p',
						null,
						'\u0412 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u043D\u0430\u0445\u043E\u0436\u0443\u0441\u044C \u0432 \u043F\u043E\u0438\u0441\u043A\u0435 \u0442\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043A\u043E\u043B\u043B\u0435\u043A\u0442\u0438\u0432\u0430 \u0434\u043B\u044F \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u043D\u043E\u0439 \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043A\u0440\u0443\u0442\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432!'
					),
					React.createElement(
						'p',
						null,
						'\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0440\u0430\u0431\u043E\u0442 \u0438 \u043A\u043E\u0434\u0430 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043D\u0430 \u043C\u043E\u0435\u043C \u0441\u0430\u0439\u0442\u0435: https://frontstarter.ru'
					),
					React.createElement(
						'p',
						{ className: 'slogan' },
						'\'\u041F\u043E\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u0435 \u043B\u0435\u0433\u043A\u0438\u0445, \u0443\u0434\u043E\u0431\u043D\u044B\u0445, \u0440\u0435\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043E\u0432',
						React.createElement('br', null),
						'\u2014 \u044D\u0442\u043E \u0442\u0430 \u0440\u0430\u0431\u043E\u0442\u0430, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043C\u043D\u0435 \u0443\u0434\u043E\u0432\u043E\u043B\u044C\u0441\u0442\u0432\u0438\u0435.\'',
						React.createElement('br', null),
						'\xA9 \u0413\u043E\u043B\u043E\u0432\u0430\u0447\u0435\u0432 \u0410\u043D\u0442\u043E\u043D'
					),
					React.createElement(
						Link,
						{ to: '/contacts' },
						'\u041F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u044C \u043C\u0435\u043D\u044F'
					)
				),
				React.createElement(
					'main',
					{ className: 'infoList' },
					React.createElement(
						'div',
						{ className: 'block' },
						React.createElement(
							'h3',
							null,
							'\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B:'
						),
						ItemsRender(toolsMap)
					),
					React.createElement(
						'div',
						{ className: 'block' },
						React.createElement(
							'h3',
							null,
							'\u041E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E:'
						),
						ItemsRender(sortedList)
					)
				)
			)
		);
	};

	return _default;
}(React.Component)) || _class) || _class);

export { _default as default };
;

var _temp2 = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/components/pages/about/About.js');
}();

;