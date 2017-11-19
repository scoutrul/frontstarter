import React, { Component } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'

import { HashRouter, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as ReducerMenu from '../reducers/ReducerMenu';
import HomePage from 'components/routes/home/HomePage'
import AboutPage from 'components/routes/about/AboutPage'
import ToDo from 'components/routes/todo/ToDo'

import Menu from './ui/Menu/Menu'
import './app.scss'

class App extends Component {
	
	componentDidMount() {
		console.log(this)
	}
	
	menuHoverOff = () => {
		this.props.actions.MenuHoverOff()
	};
	
	render() {
		return (
			<div id="view">
				<Menu/>
				<div id="content" onClick={this.menuHoverOff} className={cn({ 'blur': this.props.Store.isMenuHover })}>
					
					<HashRouter>
						<Switch>
							<Route exact path="/" component={HomePage}/>
							<Route path="/about" component={AboutPage}/>
							<Route path="/todo" component={ToDo}/>
						</Switch>
					</HashRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)