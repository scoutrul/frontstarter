import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'

import './copyright.scss'
import { connect } from "react-redux";

const Copyright = props => {
	const NextLink = () => {
		const NextRoute = () => {
			const menu = props.MenuItems;
			const { pathname } = props.location;
			
			const filterPatch = (item, index) => {
				if (item.url === pathname) {
					return index
				}
			};
			let currentRouteIndex = menu.map(filterPatch).filter(item => item !== undefined);
			let Next = currentRouteIndex[0] + 1;
			
			return (menu[Next] ? menu[Next] : menu[0])
		};
		
		return (
			<NavLink activeClassName="active" to={NextRoute().url}
			>{NextRoute().description}</NavLink>
		)
	};
	
	return (
		[
			<div key='left' className='copyright left'>
				&copy; A find good job project
			</div>,
			<div key='right' className='copyright right'>
				<NextLink/>
			</div>
		])
};


function mapStateToProps(state) {
	return {
		MenuItems: state.ReducerMenu.items
	}
}


export default withRouter(connect(mapStateToProps)(Copyright))