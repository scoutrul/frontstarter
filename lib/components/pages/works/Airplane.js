function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './airplane.scss';

var api = {
	"airplane": "A320",
	"seats": [{
		"number": "1A",
		"free": true
	}, {
		"number": "1C",
		"free": true
	}, {
		"number": "2A",
		"free": true
	}, {
		"number": "2C",
		"free": true
	}, {
		"number": "2D",
		"free": true
	}, {
		"number": "2F",
		"free": true
	}, {
		"number": "3A",
		"free": true
	}, {
		"number": "3C",
		"free": true
	}, {
		"number": "3D",
		"free": true
	}, {
		"number": "3F",
		"free": true
	}, {
		"number": "4A",
		"free": true
	}, {
		"number": "4B",
		"free": true
	}, {
		"number": "4C",
		"free": true
	}, {
		"number": "4D",
		"free": true
	}, {
		"number": "4E",
		"free": true
	}, {
		"number": "4F",
		"free": true
	}, {
		"number": "29A",
		"free": true
	}, {
		"number": "29B",
		"free": true
	}, {
		"number": "29C",
		"free": true
	}, {
		"number": "29D",
		"free": true
	}, {
		"number": "29E",
		"free": true
	}, {
		"number": "29F",
		"free": true
	}]
};

var _default = function (_Component) {
	_inherits(_default, _Component);

	function _default() {
		var _temp, _this, _ret;

		_classCallCheck(this, _default);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			seats: [],
			cols: ['A', 'B', 'C', 'D', 'E', 'F'],
			rows: 29,
			filteredSeats: [],
			notLuckyNumber: 13,
			selectedNumber: 'Не выбран номер'
		}, _this.onSelect = function () {
			var _this2;

			return (_this2 = _this).__onSelect__REACT_HOT_LOADER__.apply(_this2, arguments);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_default.prototype.componentWillMount = function componentWillMount() {
		var _this3 = this;

		var GenerateSeats = function GenerateSeats(cols, rows) {

			//generate all seats
			var SeatsMap = new Map();

			var _loop = function _loop(i) {
				cols.forEach(function (col) {
					return i !== _this3.state.notLuckyNumber && SeatsMap.set('' + i + col, { free: false });
				});
			};

			for (var i = rows; i >= 1; i--) {
				_loop(i);
			}

			//concat all seats with api data
			api.seats.forEach(function (seat) {
				return SeatsMap.set(seat.number, { free: seat.free });
			});

			//make new object seats data
			var seats = [];
			for (var _iterator = SeatsMap, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;

				if (_isArray) {
					if (_i >= _iterator.length) break;
					_ref = _iterator[_i++];
				} else {
					_i = _iterator.next();
					if (_i.done) break;
					_ref = _i.value;
				}

				var _ref2 = _ref,
				    key = _ref2[0],
				    value = _ref2[1];

				seats = [].concat(seats, [{
					number: key, free: value.free
				}]);
			}

			var filteredSeats = cols.map(function (col) {
				return seats.filter(function (seat) {
					return seat.number.indexOf(col) !== -1;
				}).reverse();
			});

			_this3.setState({ seats: seats, filteredSeats: filteredSeats });
		};

		GenerateSeats(this.state.cols, this.state.rows);
	};

	_default.prototype.__onSelect__REACT_HOT_LOADER__ = function __onSelect__REACT_HOT_LOADER__(number) {
		this.setState({ selectedNumber: number });
	};

	_default.prototype.render = function render() {
		var _this4 = this;

		var RenderSeats = function RenderSeats() {
			var some = _this4.state.filteredSeats.map(function (x, i) {
				return React.createElement(
					'ul',
					{ key: i },
					x.map(function (seat, i) {

						var active = seat.number === _this4.state.selectedNumber && 'green';

						return React.createElement(
							'li',
							{ key: seat.number,
								onClick: function onClick() {
									return _this4.onSelect(seat.number);
								},
								style: { backgroundColor: active } },
							'x'
						);
					})
				);
			});
			return some;
		};

		return React.createElement(
			'section',
			null,
			React.createElement(
				'div',
				{ className: 'contentView plane' },
				React.createElement(
					'h1',
					null,
					'Airplane seats '
				),
				React.createElement(
					'div',
					{ className: 'plane_container' },
					React.createElement(
						'div',
						{ className: 'plane_view' },
						React.createElement(
							'div',
							{ className: 'plane_seats' },
							React.createElement(RenderSeats, null)
						),
						React.createElement(
							'div',
							{ className: 'plane_image' },
							React.createElement('img', {
								src: 'https://user-images.githubusercontent.com/35366061/34867937-1717d17c-f793-11e7-897f-ca1fd886b913.jpg',
								alt: '' })
						)
					),
					React.createElement(
						'div',
						{ className: 'plane_goal' },
						React.createElement(
							'div',
							{ className: 'goal_content' },
							React.createElement(
								'div',
								null,
								'"\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u0443 \u0441\u0430\u043C\u043E\u043B\u0435\u0442\u0430 \u0441 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\u043C \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0445 \u043C\u0435\u0441\u0442 \u0438 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C\u044E \u0438\u0445 \u0432\u044B\u0431\u043E\u0440\u0430 \u043A\u043B\u0438\u043A\u0443 \u0434\u043B\u044F \u043A\u0430\u0440\u0442\u044B \u0441\u0430\u043C\u043E\u043B\u0435\u0442\u0430"'
							),
							React.createElement(
								'div',
								{ className: 'goal_result' },
								React.createElement(
									'div',
									{ className: 'selectedNumber' },
									this.state.selectedNumber
								)
							),
							React.createElement(
								'a',
								{ href: 'https://github.com/scoutrul/frontstart/blob/master/src/components/pages/works/Airplane.js',
									target: '_blank' },
								'GitHub'
							)
						)
					)
				)
			)
		);
	};

	return _default;
}(Component);

export { _default as default };
;

var _temp2 = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(api, 'api', 'src/components/pages/works/Airplane.js');
}();

;