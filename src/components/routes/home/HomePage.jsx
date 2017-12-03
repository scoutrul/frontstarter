import React from 'react'
import './home.scss'
import { Link } from 'react-router-dom'

export default () =>
	<section className='home'>
		<h1>
			Start<br/>
			<span>Your</span><br/>
			FrontEnd
		</h1>
		<div className="links">
			<Link to="/todo">ToDo</Link>
			<Link to="/Text">Text</Link>
		</div>
	</section>


