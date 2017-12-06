import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import cn from 'classnames'
import './menu.scss'
import * as ReducerMenu from '../../../reducers/ReducerMenu';

import Swipe from 'react-easy-swipe';

class Menu extends Component {
	menuHoverOn = () => {
		this.props.actions.MenuHoverOn();
		window.navigator.vibrate(200); // Вибрировать 200ms
	};
	menuHoverOff = () => {
		this.props.actions.MenuHoverOff()
	};
	
	onSwipeRight = () => {
		this.props.actions.MenuHoverOn()
	};
	onSwipeLeft = () => {
		this.props.actions.MenuHoverOff()
	};
	
	
	render() {
		let menuList = this.props.MenuItems.map(item => {
			return (
				<li onClick={this.menuHoverOff} key={item.label}>
					<div>
						<NavLink to={item.url} exact activeClassName='active'>{item.label}</NavLink>
					</div>
				</li>
			)
		});
		return (
			
			<Swipe onSwipeRight={this.onSwipeRight}
			       onSwipeLeft={this.onSwipeLeft}>
				<div id='menu' className={cn({ 'active': this.props.Store.isMenuHover })}>
					<div id='burger' onClick={this.menuHoverOn} className={cn({ 'hover': this.props.Store.isMenuHover })}>
						<span>&#9776;</span>
					</div>
					<div className='close' onClick={this.menuHoverOff}>
						&#9029;
					</div>
					<ul id='menuList'
					    onMouseEnter={this.menuHoverOn}
					    onMouseLeave={this.menuHoverOff}
					    className={cn({ 'active': this.props.Store.isMenuHover })}>
						{menuList}
					</ul>
					
					<div id='menuHoverZoneHor' onMouseEnter={this.menuHoverOn}>
						<div id='menuHoverZoneVert' onMouseEnter={this.menuHoverOn}>
							{null}
						</div>
					</div>
				</div>
			</Swipe>
		
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