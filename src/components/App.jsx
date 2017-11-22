import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as ReducerMenu from '../reducers/ReducerMenu';
import cn from 'classnames'

import HomePage from 'components/routes/home/HomePage'
import AboutPage from 'components/routes/about/AboutPage'
import ToDo from 'components/routes/todo/ToDo'
import Menu from './ui/Menu/Menu'
import './app.scss'

class App extends Component {
	
	state = {
		vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		fontUnit: '12px'
	};
	
	calcFontSize = () => {
		let maxWidth = 900;
		let minWidth = 200;
		let minFont = 8;
		let maxFont = 26;
		let containerW = document.getElementById('page').offsetWidth;
		let cent = (maxFont - minFont) / (maxWidth - minWidth);
		this.setState({
			fontUnit: minFont + cent * (containerW - minWidth) + 'px',
			vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		});
	};
	
	componentDidMount() {
		this.calcFontSize();
		window.addEventListener('resize', () => {
			this.calcFontSize()
		});
		
	};
	
	menuHoverOff = () => {
		this.props.actions.MenuHoverOff()
	};
	
	render() {
		
		let styles = {
			height: this.state.vh,
			fontSize: this.state.fontUnit
		};
		return (
			<div id="page" style={styles}>
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