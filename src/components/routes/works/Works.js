import React from 'react'
import { Link } from 'react-router-dom'

export default () =>
	<section>
		<div className='contentView'>
			<h1>
				Start<br/>
				<span>Your</span><br/>
				FrontEnd
			</h1>
		</div>
		<div className="links">
			<Link to="/contact">contact</Link>
		</div>
	
	</section>

