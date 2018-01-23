import React from 'react';
import { connect } from 'react-redux';
import './home.scss';

var Home = function Home() {
	return React.createElement(
		'section',
		{ className: 'home' },
		React.createElement(
			'div',
			{ className: 'contentView' },
			React.createElement(
				'h1',
				null,
				React.createElement(
					'span',
					{ className: 'high' },
					'FrontEnd'
				),
				React.createElement('br', null),
				React.createElement(
					'span',
					{ className: 'low' },
					'Moscow developer'
				)
			)
		)
	);
};

var _default = Home;
export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Home, 'Home', 'src/components/pages/home/HomePage.jsx');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/components/pages/home/HomePage.jsx');
}();

;