import React, { Component } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'components/routes/home/HomePage'
import AboutPage from 'components/routes/about/AboutPage'

import Menu from './ui/Menu/Menu'
import './app.scss'

class App extends Component {


	render() {
		return (
			<div id="view">
			  	<Menu/>
			  	<div id="content" className={cn({'blur': this.props.Store.isMenuHover})}>
				    <HashRouter>
				      <Switch>
				        <Route exact path="/" component={HomePage} />
				        <Route exact path="/about" component={AboutPage} />
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

export default connect(mapStateToProps)(App)