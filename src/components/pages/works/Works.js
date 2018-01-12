import React from 'react'
import { withRouter } from "react-router";
import {
	Switch, HashRouter,
	Route, Link
} from "react-router-dom";

import './works.scss'


@withRouter
class Component extends React.Component {
	

	render() {

		const IterateItems = () => {
			return (
				<div className='contentView'>
					<h1>Works</h1>
					
					<div id='worksGrid'>
						{items.map(item => {
							return (
								<div className='item mobileA11yText' key={item.label}>
									<div className='content'>
										<label>{item.label}</label>
										<div className='info'>
											<div>{item.inner}</div>
										</div>
										<Link to={`/works/${item.label}`} className='link'>show details</Link>
									</div>
									<div className='bg' style={{ backgroundImage: `url(${item.img})` }}>{null}</div>
								</div>
							)
						})}
					</div>
				</div>)
		};
		
		return (
			<section>
				
				<Switch >
					<Route patch='/works' component={IterateItems}/>
					<Route path='/works/:id' exact render={()=> <h1>h2 </h1>}/>
				</Switch>
			
			</section>
		
		)
	}
}

let items = [
	{
		label: 'Frontstart',
		inner: 'Info',
		features: [],
		img: '/images/w_frontstarter.png'
	},
	{
		label: 'Blackur',
		inner: 'Web-agency',
		img: '/images/w_blackur.png'
	},
	{
		label: 'Naurasha',
		inner: 'Product Landing Page',
		img: '/images/w_naurasha.png'
	},
	{
		label: 'Guardsman',
		inner: 'Single Page Application',
		img: '/images/w_guardsman.png'
	},
	{
		label: 'Guitar',
		inner: 'Chord Book Interface',
		img: '/images/w_guitar.png'
	}
];

export default () => (
	<HashRouter hashType='noslash'>
		<Route component={Component}/>
	</HashRouter>
)