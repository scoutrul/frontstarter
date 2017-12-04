import React from 'react'
import { Link } from 'react-router-dom'

export default () =>
	<section>
		<div className='contentView'>
			<h1>Contact</h1>
			<main>
				It easy to find me via: <br/>
				<ul>
					<li>telegram: <a href="https://t.me/antonGolova" target="_blank">@antonGolova</a></li>
					<li>gmail: <a href="mailto:antongolova@gmail.com">antongolova@gmail.com</a></li>
					<li>Or just call me by phone number: +7(965)178-47-38;</li>
				</ul>
			</main>
		</div>
		<div className="links">
			<Link to="/">home</Link>
		</div>
	</section>
	

