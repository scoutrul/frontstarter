import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import './copyright.scss';
import { connect } from "react-redux";

var Copyright = function Copyright(props) {
	var _ref = [props.location, props],
	    pathname = _ref[0].pathname,
	    MenuItems = _ref[1].MenuItems;


	var FastLink = function FastLink(props) {
		var dir = props.dir;


		var FastRouter = function FastRouter() {
			var filterPath = function filterPath(item, index) {
				if (item.url === pathname) {
					return index;
				}
			};
			var currentRouteIndex = MenuItems.map(filterPath).filter(function (item) {
				return item !== undefined;
			})[0];
			var Next = currentRouteIndex + 1;
			var Prev = currentRouteIndex - 1;

			if (dir === 'left') {
				return MenuItems[Prev] ? MenuItems[Prev] : MenuItems[MenuItems.length - 1];
			}
			return MenuItems[Next] ? MenuItems[Next] : MenuItems[0];
		};

		return React.createElement(
			NavLink,
			{ activeClassName: 'active', to: FastRouter().url },
			FastRouter().description
		);
	};

	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ key: 'left', className: 'copyright left mobileA11yText' },
			'\xA9 FrontStarter2018'
		),
		',',
		React.createElement(
			'div',
			{ key: 'right', className: 'copyright right mobileA11yText' },
			React.createElement(FastLink, { dir: 'left' }),
			React.createElement(FastLink, { dir: 'right' })
		)
	);
};

function mapStateToProps(state) {
	return {
		MenuItems: state.ReducerMenu.items
	};
}

var _default = withRouter(connect(mapStateToProps)(Copyright));

export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Copyright, 'Copyright', 'src/components/ui/copyright/Copyright.js');

	__REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/components/ui/copyright/Copyright.js');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/components/ui/copyright/Copyright.js');
}();

;