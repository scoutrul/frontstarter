import React from 'react'
import { connect } from 'react-redux'
import './home.scss'
import { Link } from 'react-router-dom'

const Home = (props) =>
	<section className='home'>
		<div className='contentView'>
			<h1>
				Start<br/>
				<span>Your</span><br/>
				FrontEnd
			</h1>
		</div>
		<div className="links">
			<Link to="/about">About Me</Link>
		</div>
	</section>;


function mapStateToProps(state) {
	return {
		isMenuHover: state.ReducerMenu.isMenuHover,
		
	}
}

export default connect(mapStateToProps)(Home)