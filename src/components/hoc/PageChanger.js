import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './PageChanger.scss'

import Routes from '../Routes'
import { withRouter } from "react-router";


@withRouter
export default class extends Component {
	
	render() {
		return (
			
			<Switch>
				{
					Object.entries(Routes).map(item => {
						let [name, component] = item;
						return <Route
							key={name}
							path={`/${name}`} exact
							component={() => component}/>
					})
				}
			</Switch>
		
		)
		// return (
		// 	<Motion
		// 		defaultStyle={{
		// 			opacity: 0.001,
		// 			filter: 30
		//
		// 		}}
		// 		style={{
		// 			opacity: spring(1),
		// 			filter: spring(0, { stiffness: 440, damping: 30 })
		// 		}}
		// 	>
		// 		{style => (
		// 			<div style={{ filter: `blur(${style.filter}px)`, opacity: style.opacity }} className='motion'>
		// 				<RouteComponent />
		// 			</div>
		// 		)}
		// 	</Motion>
		// )
	}
}

