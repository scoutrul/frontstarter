import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import cn from 'classnames'
import './menu.scss'
import * as ReducerMenu from '../../../reducers/ReducerMenu';
import { spring, TransitionMotion } from 'react-motion';


class Menu extends Component {
	menuHoverOn = () => {
		this.props.actions.MenuHoverOn();
		!!window.navigator.vibrate && window.navigator.vibrate(100);
	};
	
	
	menuHoverOff = () => {
		this.props.Store.isMenuHover && this.props.actions.MenuHoverOff()
	};
	
	render() {
		
		const MenuList = item =>
			<li key={item.label}>
				<div>
					<NavLink to={item.url} exact activeClassName='active'
							 onClick={this.menuHoverOff}>{item.label}</NavLink>
				</div>
			</li>;
		const newMenu = item => {
			
			const willLeave = () => ({
				borderWidth: 0
			});
			
			return (
				<TransitionMotion
					defaultStyles={[
						{ style: { borderWidth: 0 } },
					]}
					styles={[
						{ style: { borderWidth: spring(10) }, data: item.label },
					]}
					willLeave={willLeave}>
					
					{(styles) => (
						<li>
							{styles.map(({ style, data }) => (
								<div key={item.url} style={{
									borderColor: 'black',
									borderStyle: 'solid',
									...style
								}}>
									<NavLink to={item.url} exact activeClassName='active'
											 onClick={this.menuHoverOff}>{data}</NavLink>
								</div>
							))}
						</li>
					)}
				</TransitionMotion>)
		};
		
		return (
			<div id='menu' onMouseLeave={this.menuHoverOff}
				 className={cn({ 'active': this.props.Store.isMenuHover })}>
				<div id='burger' onClick={this.menuHoverOn}
					 className={cn({ 'hover': this.props.Store.isMenuHover })}>
					<span>&#9776;</span>
				</div>
				{this.props.Store.isMenuHover && <div className='close' onClick={this.menuHoverOff}>
					&#9029;
				</div>}
				<ul id='menuList' onClick={this.menuHoverOn}
					className={cn({ 'active': this.props.Store.isMenuHover })}>
					{
						this.props.MenuItems.map(MenuList)
					}
				</ul>
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