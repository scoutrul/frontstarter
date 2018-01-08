import React, { Component } from 'react';
import './PageChange.scss'
import { Motion, spring } from 'react-motion';
import Home from '../pages/home/HomePage'
import Info from '../pages/info/Info'
import ToDo from '../pages/todo/ToDo'
import Works from '../pages/works/Works'
import Contacts from '../pages/contacts/Contacts'
import About from '../pages/about/About'
import Blog from '../pages/blog/Blog'
import { Guitar } from '../pages/guitar/Guitar'

const PageChange = (ComponentLabel) => {
	const RouteComponent = () => {
		let Routes = {
			'Info': <Info/>,
			'Todo': <ToDo/>,
			'Works': <Works/>,
			'Contacts': <Contacts/>,
			'Blog': <Blog/>,
			'/': <Home/>,
			'About': <About/>,
			'Guitar': <Guitar/>
		};

		return Routes[ComponentLabel]
	};
	return class extends Component {
		render() {
			return <RouteComponent />
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
};

export default PageChange