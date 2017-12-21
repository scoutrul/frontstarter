import React from 'react'
import { Link } from 'react-router-dom'
import './works.scss'


let items = [
	{
		label: 'This site',
		inner: 'Info'
	},
	{
		label: 'Blackur',
		inner: 'Web-agency'
	},
	{
		label: 'Naurasha',
		inner: 'Landing Single Page'
	},
	{
		label: 'Guardsman',
		inner: 'Single Page Application'
	},
	{
		label: 'InfoSvyaz',
		inner: 'description'
	}
];

function IterateItems() {
	return items.map((item, i) => {
		return (
			<div className='item' key={i}>
				<label>{item.label}</label>
				<div className='info'>{item.inner}</div>
				<div className='bg'>{null}</div>
			</div>
		)
	})
}

export default class extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	
	render() {
		return (
			
			<section>
				<div className='contentView'>
					<h1>
						Works
					</h1>
					<div id='worksGrid'>
						<IterateItems/>
					</div>
				</div>
			
			</section>
		
		)
	}
}
