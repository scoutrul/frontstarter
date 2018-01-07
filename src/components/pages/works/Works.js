import React from 'react'
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './works.scss'


let items = [
	{
		label: 'This site',
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
	}
];


function mapStateToProps(state) {
	return {
		initialList: state.russian.pages.about.technology,
	}
}

@withRouter
@connect(mapStateToProps)
export default class extends React.Component {

	render() {
		const IterateItems = () => {
			return items.map((item, i) => {
				return (
					<div className='item' key={i}>
						<div className='content'>
							<label>{item.label}</label>
							<div className='info'>
								<div>{item.inner}</div>
							</div>
							<div className='link'>show details</div>
						</div>
						<div className='bg' style={{ backgroundImage: `url(${item.img})` }}>{null}</div>
					</div>
				)
			})
		};
		
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
