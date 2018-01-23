import React, {Fragment} from 'react'
import { withRouter, NavLink } from 'react-router-dom'

import './copyright.scss'
import { connect } from "react-redux";

const Copyright = props => {
	let [{ pathname }, { MenuItems }] = [props.location, props];
	
	const FastLink = (props) => {
		
		let { dir } = props;
		
		const FastRouter = () => {
			const filterPath = (item, index) => {
				if (item.url === pathname) {
					return index
				}
			};
			let currentRouteIndex = MenuItems.map(filterPath).filter(item => item !== undefined)[0];
			let Next = currentRouteIndex + 1;
			let Prev = currentRouteIndex - 1;
			
			if (dir === 'left') {
				return (MenuItems[Prev] ? MenuItems[Prev] : MenuItems[MenuItems.length - 1])
			}
			return (MenuItems[Next] ? MenuItems[Next] : MenuItems[0])
		};
		
		return <NavLink activeClassName="active" to={FastRouter().url}>{FastRouter().description}</NavLink>
		
	};
	
	return (<Fragment>
		<div key='left' className='copyright left mobileA11yText'>
			&copy; FrontStarter2018
		</div>
		
		<div key='right' className='copyright right mobileA11yText'>
			<FastLink dir='left'/>
			
			<FastLink dir='right'/>
		</div>
	</Fragment>)
};


function mapStateToProps(state) {
	return {
		MenuItems: state.ReducerMenu.items
	}
}


export default withRouter(connect(mapStateToProps)(Copyright))