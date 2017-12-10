import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as ReducerMenu from '../reducers/ReducerMenu';
import cn from 'classnames'
import firebase from '../utils/firebase.js'
import Home from 'components/routes/home/HomePage'
import About from 'components/routes/about/About'
import ToDo from 'components/routes/todo/ToDo'
import Text from 'components/routes/text/Text'
import Works from 'components/routes/works/Works'
import Connect from 'components/routes/connect/Connect'
import Blog from 'components/routes/blog/Blog'
import { PageChange } from './hoc/PageChange'
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
		let screenWidth = document.getElementById('page').offsetWidth;
		let minFont = 8;
		let maxFont = 26;
		let containerW = (screenWidth > maxWidth) ? maxWidth : screenWidth;
		let cent = (maxFont - minFont) / (maxWidth - minWidth);
		this.setState({
			fontUnit: minFont + cent * (containerW - minWidth) + 'px',
			vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		});
	};
	
	FireMenuItems = () => {
		firebase.database().ref('Menu').on('value', snap => {
			let result = [];
			snap.forEach(childNodes => {
				result.push({ label: childNodes.key, url: childNodes.val() })
			});
			this.props.actions.FetchMenu(result)
		});
	};
	
	componentWillMount() {
		this.FireMenuItems()
	}
	
	componentDidMount() {
		this.calcFontSize();
		window.addEventListener('resize', () => {
			this.calcFontSize()
		});
		
	};
	
	menuHoverOff = () => {
		this.props.actions.MenuHoverOff()
	};
	
	appRouting = () => {
		return (
			<Switch>
				<Route path="/" exact component={PageChange(Home)}/>
				<Route path="/about" component={PageChange(About)}/>
				<Route path="/todo" component={PageChange(ToDo)}/>
				<Route path="/text" component={PageChange(Text)}/>
				<Route path="/works" component={PageChange(Works)}/>
				<Route path="/connect" component={PageChange(Connect)}/>
				<Route path="/blog" component={PageChange(Blog)}/>
			</Switch>
		)
	};
	
	render() {
		
		let viewPortStyles = {
			height: this.state.vh,
			fontSize: this.state.fontUnit
		};
		return (
			<HashRouter hashType="noslash">
				<div id="page" style={viewPortStyles} className={cn({ 'blurbg': this.props.Store.isMenuHover })}>
					<Menu/>
					<div id="content" onClick={this.menuHoverOff} className={cn({ 'blur': this.props.Store.isMenuHover })}>
						
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