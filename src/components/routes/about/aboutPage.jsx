import React, { Component } from 'react'
import Transition from 'react-transition-group/Transition'
import './about.scss'


export default class AboutPage extends Component {
	
	state = { show: false }
	
	fadeHandler = () => this.setState({ show: !this.state.show })
	
	render() {
		return (
			<section>
				<h1>Hello! My name is Anton</h1>
				<div>HTML -> CSS -> JQUERY -> JSX -> REACT -> REDUX</div>
				<div>Year 2000 2010 2015 2017</div>
			</section>
		)
	}
}
