var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { withRouter } from "react-router";
import { Switch, HashRouter, Route, Link } from "react-router-dom";

import './works.scss';

var Component = withRouter(_class = function (_React$Component) {
	_inherits(Component, _React$Component);

	function Component() {
		_classCallCheck(this, Component);

		return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	}

	Component.prototype.render = function render() {

		var IterateItems = function IterateItems() {
			return React.createElement(
				"div",
				{ className: "contentView" },
				React.createElement(
					"h1",
					null,
					"Works"
				),
				React.createElement(
					"div",
					{ id: "worksGrid" },
					items.map(function (item) {
						return React.createElement(
							"div",
							{ className: "item mobileA11yText", key: item.label },
							React.createElement(
								"div",
								{ className: "content" },
								React.createElement(
									"label",
									null,
									item.label
								),
								React.createElement(
									"div",
									{ className: "info" },
									React.createElement(
										"div",
										null,
										item.inner
									)
								),
								React.createElement(
									Link,
									{ to: "/works/" + item.label, className: "link" },
									"show details"
								)
							),
							React.createElement(
								"div",
								{ className: "bg", style: { backgroundImage: "url(" + item.img + ")" } },
								null
							)
						);
					})
				)
			);
		};

		return React.createElement(
			"section",
			null,
			React.createElement(
				Switch,
				null,
				React.createElement(Route, { patch: "/works", component: IterateItems })
			)
		);
	};

	return Component;
}(React.Component)) || _class;

var items = [{
	label: 'Frontstart',
	inner: 'Info',
	features: [],
	img: '/images/w_frontstarter.png'
}, {
	label: 'Blackur',
	inner: 'Web-agency',
	img: '/images/w_blackur.png'
}, {
	label: 'Naurasha',
	inner: 'Product Landing Page',
	img: '/images/w_naurasha.png'
}, {
	label: 'Guardsman',
	inner: 'Single Page Application',
	img: '/images/w_guardsman.png'
}, {
	label: 'Guitar',
	inner: 'Chord Book Interface',
	img: '/images/w_guitar.png'
}];

var _default = function _default() {
	return React.createElement(
		HashRouter,
		{ hashType: "noslash" },
		React.createElement(Route, { component: Component })
	);
};

export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Component, "Component", "src/components/pages/works/Works.js");

	__REACT_HOT_LOADER__.register(items, "items", "src/components/pages/works/Works.js");

	__REACT_HOT_LOADER__.register(_default, "default", "src/components/pages/works/Works.js");
}();

;