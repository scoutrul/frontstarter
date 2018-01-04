import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import cn from 'classnames'
import './menu.scss'
import * as ReducerMenu from '../../../reducers/ReducerMenu';
import { Motion, spring } from 'react-motion';

import Swipe from 'react-easy-swipe';

class Menu extends Component {
	menuHoverOn = () => {
		this.props.actions.MenuHoverOn();
		!!window.navigator.vibrate && window.navigator.vibrate(100);
	};
	menuHoverOff = () => {
		this.props.actions.MenuHoverOff()
	};
	
	
	MenuList = item =>
		<li onClick={this.menuHoverOff} key={item.label}>
			<div>
				<NavLink to={item.url} exact activeClassName='active'>{item.label}</NavLink>
			</div>
		</li>;
	
	
	render() {
		const DopEvents = () =>
			<Swipe onSwipeRight={this.menuHoverOn}
				   onSwipeLeft={this.menuHoverOff}>
				<div id='menuHoverZoneHor' onMouseEnter={this.menuHoverOn}>
					<div id='menuHoverZoneVert' onMouseEnter={this.menuHoverOn}>
						{null}
					</div>
				</div>
			</Swipe>;
			
		return (
			<div id='menu'
				 className={cn({ 'active': this.props.Store.isMenuHover })}>
				<div id='burger' onClick={this.menuHoverOn} onMouseEnter={this.menuHoverOn}
					 className={cn({ 'hover': this.props.Store.isMenuHover })}>
					<span>&#9776;</span>
				</div>
				<div className='close' onClick={this.menuHoverOff}>
					&#9029;
				</div>
				<ul id='menuList'
					onMouseEnter={this.menuHoverOn}
					onMouseLeave={this.menuHoverOff}
					className={cn({ 'active': this.props.Store.isMenuHover })}>
					{
						this.props.MenuItems.map(this.MenuList)
					}
				</ul>
				{/*<DopEvents/>*/}
			</div>
		
		)
	}
}

function mapStateToProps(state) {
	return {
		Store: state.ReducerMenu,
		MenuItems: state.ReducerMenu.items
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ReducerMenu, dispatch)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))