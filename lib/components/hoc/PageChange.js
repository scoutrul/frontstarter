function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './PageChange.scss';
import { Motion, spring } from 'react-motion';
import Home from '../pages/home/HomePage';
import Info from '../pages/info/Info';
import ToDo from '../pages/todo/ToDo';
import Works from '../pages/works/Works';
import Contacts from '../pages/contacts/Contacts';
import About from '../pages/about/About';
import Blog from '../pages/blog/Blog';
import { Guitar } from '../pages/guitar/Guitar';

var PageChange = function PageChange(ComponentLabel) {
	var RouteComponent = function RouteComponent() {
		var compos = {
			'Info': React.createElement(Info, null),
			'Todo': React.createElement(ToDo, null),
			'Works': React.createElement(Works, null),
			'Contacts': React.createElement(Contacts, null),
			'Blog': React.createElement(Blog, null),
			'/': React.createElement(Home, null),
			'About': React.createElement(About, null),
			'Guitar': React.createElement(Guitar, null)
		};

		return compos[ComponentLabel];
	};
	return function (_Component) {
		_inherits(_class, _Component);

		function _class() {
			_classCallCheck(this, _class);

			return _possibleConstructorReturn(this, _Component.apply(this, arguments));
		}

		_class.prototype.render = function render() {
			return React.createElement(
				Motion,
				{
					defaultStyle: {
						opacity: 0.001,
						filter: 30

					},
					style: {
						opacity: spring(1),
						filter: spring(0, { stiffness: 440, damping: 30 })
					}
				},
				function (style) {
					return React.createElement(
						'div',
						{ style: { filter: 'blur(' + style.filter + 'px)', opacity: style.opacity }, className: 'motion' },
						React.createElement(RouteComponent, null)
					);
				}
			);
		};

		return _class;
	}(Component);
};

export default PageChange;