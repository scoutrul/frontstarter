import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import cn from 'classnames'
import './Menu.scss'
import * as ReducerMenu from '../../../reducers/ReducerMenu';

class Menu extends Component {
    menuHoverOn = () => {
        this.props.actions.MenuHoverOn()
    }
    menuHoverOff = () => {
         this.props.actions.MenuHoverOff()
    }

    render() {
        return (
	    	<div id="menu" className={cn({'active': this.props.Store.isMenuHover})}>
				<Router>
			  		<ul id="menuList"  
			  			onMouseEnter={this.menuHoverOn} 
			  			onMouseLeave={this.menuHoverOff}
			  			className={cn({'active': this.props.Store.isMenuHover})}>
			  			<li>
			  				<NavLink to='/' activeClassName="active">Start</NavLink>
			  			</li>
			  			<li>
			  				<NavLink to='about' activeClassName="active">About</NavLink>
			  			</li>
			  			<li>
			  				<NavLink to='works' activeClassName="active">Works</NavLink>
			  			</li>
			  			<li>
			  				<NavLink to='contact' activeClassName="active">Contact</NavLink>
			  			</li>
			  		</ul>
		  		</Router>
		  		<div id="menuHoverZoneVert" 
		  			onMouseEnter={this.menuHoverOn} 
		  			>
		  			<div id="menuHoverZoneHor" 
		  			onMouseEnter={this.menuHoverOn} 
		  			></div>
			  		<div id="burger" className={cn({'hover': this.props.Store.isMenuHover})}>
			  			<span>&#9776;</span>
					</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu)