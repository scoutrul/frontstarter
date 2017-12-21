import React from 'react'
import { connect } from 'react-redux'
import './home.scss'
import { Link } from 'react-router-dom'

const Home = (props) =>
	<section className='home'>
		<div className='contentView'>
			<h1>
				Start
			</h1>
			<h1>
				<span>Your</span>
			</h1>
			<h1>
				FrontEnd
			</h1>
		</div>
		<div className="links">
			<Link to="/info">Info =></Link>
		</div>
	</section>;


function mapStateToProps(state) {
	return {
		isMenuHover: state.ReducerMenu.isMenuHover,
		
	}
}

export default connect(mapStateToProps)(Home)