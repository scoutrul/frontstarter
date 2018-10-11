import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import cn from 'classnames'
import './menu.scss'
import * as ReducerMenu from '../../../reducers/ReducerMenu';


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

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component {
	
	menuOn = () => {
		this.props.actions.MenuHoverOn();
		("vibrate" in navigator) && window.navigator.vibrate(100);
	};
	
	menuOff = () => {
		this.props.Store.isMenuHover && this.props.actions.MenuHoverOff()
	};
	
	render() {
		
		const MenuList = item =>
			<li key={item.label}>
				<div onClick={this.menuOff}>
					<NavLink to={item.url} exact activeClassName='active'
							 replace >{item.label}</NavLink>
				</div>
			</li>;
			
		return (
			<div id='menu' onMouseLeave={this.menuOff}
				 className={cn({ 'active': this.props.Store.isMenuHover })}>
				<div id='burger' onClick={this.menuOn}
					 className={cn({ 'hover': this.props.Store.isMenuHover })}>
					<span>&#9776;</span>
				</div>
				<div className='close' onClick={this.menuOff}>
					&#9029;
				</div>

				<ul id='menuList'
					className={cn({ 'active': this.props.Store.isMenuHover })}>
					{
						this.props.MenuItems.map(MenuList)
					}
				</ul>
			</div>
		
		)
	}
}

