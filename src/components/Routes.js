import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import { withRouter } from "react-router";


import Home from './pages/home/HomePage'
import ToDo from './pages/todo/ToDo'
import Works from './pages/works/Works'
import Contacts from './pages/contacts/Contacts'
import About from './pages/about/About'

import Frontstart from './pages/works/Frontstart'
import Guitar from './pages/works/Guitar'
import Blackur from './pages/works/Blackur'
import Guardsman from './pages/works/Guardsman'
import Naurasha from './pages/works/Naurasha'
import Airplane from './pages/works/Airplane'


@withRouter
export default class extends Component {
	
	render() {
		let RoutesPages = {
			'Todo': <ToDo/>,
			'Works': <Works/>,
			'Contacts': <Contacts/>,
			'/': <Home/>,
			'About': <About/>,
		};
		let RoutesWorks = {
			'Frontstart': <Frontstart/>,
			'Guitar': <Guitar/>,
			'Blackur': <Blackur/>,
			'Guardsman': <Guardsman/>,
			'Naurasha': <Naurasha/>,
			'Airplane': <Airplane/>,
		};
		return (
			<Switch>
				{
					Object.entries(RoutesPages).map(item => {
						let [name, component] = item;
						return <Route
							key={name}
							path={`/${name}`} exact
							component={() => component}/>
					})
					
				}
				{
					Object.entries(RoutesWorks).map(item => {
						let [name, component] = item;
						return <Route
							key={name}
							path={`/works/${name}`} exact
							component={() => component}/>
					})
					
				}
			
			</Switch>
		)
		
	}
}
