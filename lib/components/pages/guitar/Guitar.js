function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import './guitar.scss';

export var Guitar = function (_React$Component) {
	_inherits(Guitar, _React$Component);

	function Guitar() {
		var _temp, _this, _ret;

		_classCallCheck(this, Guitar);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
			showChord: [],
			currKey: 'C',
			currType: 'Major',
			intervals: [],
			AllNotes: [],
			mask: [],
			types: [],
			Octaves: []
		}, _this.changeChord = function () {
			var _ref = [_this.state.currKey, _this.state.currType],
			    key = _ref[0],
			    type = _ref[1];

			var doubleOctave = [].concat(_this.state.mask, _this.state.mask);

			var findAllNotes = function findAllNotes(key, type) {
				var result = function result() {
					var firstNoteIndex = Object.values(doubleOctave).indexOf(key);
					var firstNote = doubleOctave[firstNoteIndex + type[0]];
					var secondNote = doubleOctave[firstNoteIndex + type[1]];
					var thirdNote = doubleOctave[firstNoteIndex + type[2]];
					var fourNote = doubleOctave[firstNoteIndex + type[3]];

					return [firstNote, secondNote, thirdNote, fourNote];
				};
				_this.setState({ showChord: result() });
			};

			_this.state.types.forEach(function (item) {
				item.name === type && findAllNotes(key, item.intervals);
			});
		}, _this.changeKey = function (key) {
			_this.setState({ currKey: key }, function () {
				return _this.changeChord();
			});
		}, _this.changeType = function (type) {
			_this.setState({ currType: type }, function () {
				return _this.changeChord();
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Guitar.prototype.componentDidMount = function componentDidMount() {
		var mask = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#'];
		var Octaves = [mask, mask, mask, mask, mask, mask, mask, mask, mask];
		var AllNotes = [];
		for (var _iterator = Octaves, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref2;

			if (_isArray) {
				if (_i >= _iterator.length) break;
				_ref2 = _iterator[_i++];
			} else {
				_i = _iterator.next();
				if (_i.done) break;
				_ref2 = _i.value;
			}

			var item = _ref2;

			AllNotes = [].concat(AllNotes, item);
		}

		var intervals = {
			P0: 0,
			S1: 1,
			S2: 2,
			T3: 3,
			T4: 4,
			Q1: 5,
			Q2: 6,
			QE1: 6,
			QE2: 7,
			SX1: 8,
			SX2: 9,
			SE1: 10,
			SE2: 11,
			O: 12
		};

		this.setState({
			intervals: intervals,
			AllNotes: AllNotes,
			mask: mask,
			Octaves: Octaves,
			types: [{
				name: 'Major',
				intervals: [intervals.P0, intervals.T4, intervals.QE2]
			}, {
				name: 'Minor',
				intervals: [intervals.P0, intervals.T3, intervals.QE2]
			}, {
				name: 'Sept',
				intervals: [intervals.P0, intervals.T4, intervals.QE2, intervals.SE1]
			}]

		}, this.changeChord());
	};

	Guitar.prototype.render = function render() {
		var _this2 = this;

		var _state$intervals = this.state.intervals,
		    P0 = _state$intervals.P0,
		    T4 = _state$intervals.T4,
		    Q1 = _state$intervals.Q1,
		    Q2 = _state$intervals.Q2,
		    O = _state$intervals.O;
		var String6 = P0,
		    String5 = Q1,
		    String4 = Q1 + Q1,
		    String3 = Q1 + Q1 + Q1,
		    String2 = Q1 + Q1 + Q1 + T4,
		    String1 = O + O;


		var String = function String(note) {
			var guitarOctave = O * 4;
			var index = note + guitarOctave;
			return {
				key: _this2.state.AllNotes[index],
				index: index
			};
		};
		var guitarTuning = [String(String1), String(String2), String(String3), String(String4), String(String5), String(String6)];

		var CurrString = function CurrString(note) {
			return _this2.state.AllNotes.slice(note.index, note.index + O * 1.5).map(function (key) {
				return React.createElement(
					'li',
					{ key: '' + ++note.index + key, onClick: function onClick() {
							return _this2.changeKey(key);
						} },
					_this2.state.showChord.includes(key) ? React.createElement(
						'span',
						{ className: 'active' },
						key
					) : React.createElement(
						'span',
						null,
						key
					)
				);
			});
		};

		var CurrFret = function CurrFret(note) {
			function iterateReduce(item, i) {
				var frets = {};
				frets[i] = item;
				return frets;
			}

			var frets = guitarTuning.map(iterateReduce);
			console.log(frets);
			return _this2.state.AllNotes.slice(note.index, note.index + 1.5).map(function (key) {
				return React.createElement(
					'li',
					{ key: '' + ++note.index + key, onClick: function onClick() {
							return _this2.changeKey(key);
						} },
					_this2.state.showChord.includes(key) ? React.createElement(
						'span',
						{ className: 'active' },
						key
					) : React.createElement(
						'span',
						null,
						key
					)
				);
			});
		};

		var ButtonsType = function ButtonsType() {
			return _this2.state.types.map(function (type, i) {
				var bgcolor = type.name === _this2.state.currType ? '#CCC' : '#AAA';
				return React.createElement(
					'button',
					{ key: type.name + '+1',
						onClick: function onClick() {
							return _this2.changeType(type.name);
						},
						style: { backgroundColor: bgcolor } },
					type.name
				);
			});
		};

		var ButtonsKeys = function ButtonsKeys() {
			return _this2.state.mask.map(function (key, i) {
				var bgcolor = key === _this2.state.currKey ? '#CCC' : '#AAA';
				return React.createElement(
					'button',
					{ key: i + '+1', onClick: function onClick() {
							return _this2.changeKey(key);
						},
						style: { backgroundColor: bgcolor } },
					key
				);
			});
		};

		var RenderStrings = function RenderStrings() {
			return guitarTuning.map(function (note, i) {
				return React.createElement(
					'ul',
					{ key: i, className: 'StringRow_list' },
					CurrString(note)
				);
			});
		};

		return React.createElement(
			'section',
			null,
			React.createElement(
				'div',
				{ className: 'contentView' },
				React.createElement(
					'h1',
					null,
					'Guitar'
				),
				React.createElement(
					'div',
					{ className: 'guitar' },
					React.createElement(
						'div',
						{ className: 'info' },
						React.createElement(
							'div',
							{ className: 'keytype' },
							React.createElement(
								'div',
								{ className: 'key' },
								this.state.currKey,
								' '
							),
							React.createElement(
								'div',
								{ className: 'type' },
								this.state.currType
							)
						),
						React.createElement(
							'div',
							{ className: 'buttons' },
							React.createElement(ButtonsType, null),
							React.createElement('hr', null),
							React.createElement(ButtonsKeys, null)
						)
					),
					React.createElement(
						'div',
						{ className: 'StringRow' },
						React.createElement(RenderStrings, null)
					)
				)
			)
		);
	};

	return Guitar;
}(React.Component);