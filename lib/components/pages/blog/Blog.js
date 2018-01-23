import React from 'react';
import { Link } from 'react-router-dom';

export default (function () {
	return React.createElement(
		'section',
		null,
		React.createElement(
			'div',
			{ className: 'contentView' },
			React.createElement(
				'h1',
				null,
				'Blog'
			)
		),
		React.createElement(
			'div',
			{ className: 'links' },
			React.createElement(
				Link,
				{ to: '/' },
				'Start again'
			)
		)
	);
});