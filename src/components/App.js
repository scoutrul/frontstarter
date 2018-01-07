import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as ReducerMenu from '../reducers/ReducerMenu';
import cn from 'classnames'

import PageChange from './hoc/PageChange'
import Menu from './ui/Menu/Menu'
import Copyright from './ui/copyright/Copyright'
import './app.scss'


class App extends Component {
	
	state = {
		vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		fontUnit: '12px'
	};
	
	calcFontSize = () => {
		let maxWidth = 1200;
		let minWidth = 200;
		let screenWidth = document.getElementsByClassName('page')[0].offsetWidth;
		let minFont = 8;
		let maxFont = 26;
		let containerW = (screenWidth > maxWidth) ? maxWidth : screenWidth;
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
	
	appRouting = () => {
		return (
			<Switch>
				{
					this.props.Store.items.map(item =>
						<Route key={item.label} path={item.url} exact component={PageChange(item.label)}/>
					)
				}
			</Switch>
		)
	};
	
	
	render() {
		
		let viewPortStyles = {
			height: this.state.vh,
			fontSize: this.state.fontUnit
		};
		return (
			<HashRouter hashType='noslash'>
				<div style={viewPortStyles} className={cn('page', { 'blurbg': this.props.Store.isMenuHover })}>
					<Menu/>
					<div className={cn('content', { 'blur': this.props.Store.isMenuHover })}>
						{this.appRouting()}
					</div>
					<Copyright/>
				</div>
			</HashRouter>
		)
	}
}

function mapStateToProps(state) {
	return {
		Store: state.ReducerMenu,
		Menu: state.ReducerMenu.items,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ReducerMenu, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)