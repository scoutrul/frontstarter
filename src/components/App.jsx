import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as ReducerMenu from '../reducers/ReducerMenu';
import cn from 'classnames'
import Swipe from 'react-easy-swipe';
import HomePage from 'components/routes/home/HomePage'
import AboutPage from 'components/routes/about/AboutPage'
import ToDo from 'components/routes/todo/ToDo'
import Menu from './ui/Menu/Menu'
import './app.scss'


class App extends Component {
	onSwipeRight = () => {
		this.props.actions.MenuHoverOn()
	};
	onSwipeLeft = () => {
		this.props.actions.MenuHoverOff()
	};
	
	componentDidMount() {
		console.log(this)
	};
	
	menuHoverOff = () => {
		this.props.actions.MenuHoverOff()
	};
	
	render() {
		return (
			<Swipe onSwipeRight={this.onSwipeRight}
			       onSwipeLeft={this.onSwipeLeft}>
				<Menu/>
				<div id="content" onClick={this.menuHoverOff} className={cn({ 'blur': this.props.Store.isMenuHover })}>
					<BrowserRouter>
						<Switch>
							<Route path="/" component={HomePage}/>
							<Route path="/about" component={AboutPage}/>
							<Route path="/todo" component={ToDo}/>
						</Switch>
					</BrowserRouter>
				</div>
			
			</Swipe>
		
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

export default connect(mapStateToProps, mapDispatchToProps)(App)