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
		this.props.actions.MenuHoverOn()
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
		return (
			<div id="menu" className={cn({ 'active': this.props.Store.isMenuHover })}>
				<div id="burger" onClick={this.menuHoverOn} className={cn({ 'hover': this.props.Store.isMenuHover })}>
					<span>&#9776;</span>
				</div>
				<div className="close" onClick={this.menuHoverOff}>
					&#9029;
				</div>
				<ul id="menuList"
				    onMouseEnter={this.menuHoverOn}
				    onMouseLeave={this.menuHoverOff}
				    className={cn({ 'active': this.props.Store.isMenuHover })}>
					<li onClick={this.menuHoverOff}>
						<div>
							<NavLink to='/' exact activeClassName="active">Start</NavLink>
						</div>
					</li>
					<li onClick={this.menuHoverOff}>
						<div>
							<NavLink to='/about/' exact activeClassName="active">About</NavLink>
						</div>
					</li>
					<li onClick={this.menuHoverOff}>
						<div>
							<NavLink to='/works/' exact activeClassName="active">Works</NavLink>
						</div>
					</li>
					<li onClick={this.menuHoverOff}>
						<div>
							<NavLink to='/contact' exact activeClassName="active">Contact</NavLink>
						</div>
					</li>
				</ul>
				<div id="menuHoverZoneHor" onMouseEnter={this.menuHoverOn}>
					<Swipe onSwipeRight={this.onSwipeRight}
					       onSwipeLeft={this.onSwipeLeft}>
						<div id="menuHoverZoneVert" onMouseEnter={this.menuHoverOn}>
							{null}
						</div>
					</Swipe>
				</div>
			</div>
		
		)
	}
}

function mapStateToProps(state) {
	return {
		Store: state.ReducerMenu,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ReducerMenu, dispatch)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))