import React from 'react';
import './contacts.scss';

var _default = function _default() {
	return React.createElement(
		'section',
		null,
		React.createElement(
			'div',
			{ className: 'contentView' },
			React.createElement(
				'h1',
				null,
				'Connect me'
			),
			'It easy to find me via: ',
			React.createElement('br', null),
			React.createElement(
				'ul',
				{ className: 'contacts' },
				React.createElement(
					'li',
					null,
					'Telegram: ',
					React.createElement(
						'a',
						{ href: 'https://t.me/antonGolova', target: '_blank' },
						'@antonGolova'
					)
				),
				React.createElement(
					'li',
					null,
					'Mail: ',
					React.createElement(
						'a',
						{ href: 'mailto:antongolova@gmail.com' },
						'antongolova@gmail.com'
					)
				),
				React.createElement(
					'li',
					null,
					'Or just call me by phone number: +7(965)178-47-38;'
				)
			)
		)
	);
};

export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/components/pages/contacts/Contacts.js');
}();

;