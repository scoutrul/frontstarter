import React from 'react'
import { Link } from 'react-router-dom'
import './works.scss'


let items = [
	{
		label: 'This site',
		inner: 'Info'
	},
	{
		label: 'label1',
		inner: 'description'
	},
	{
		label: 'label2',
		inner: 'description'
	},
	{
		label: 'label3',
		inner: 'description'
	},
	{
		label: 'label4',
		inner: 'description'
	}
];

function IterateItems() {
	return items.map((item, i) => {
		return (
			<div className="item" key={i}>
				<label>{item.label}</label>
				<main>{item.inner}</main>
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
					<div id="worksGrid">
						<IterateItems/>
					</div>
				</div>
			
			</section>
		
		)
	}
}
