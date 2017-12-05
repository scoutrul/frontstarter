import React from 'react'
import { Link } from 'react-router-dom'
import './about.scss'

export default () =>
	<section>
		<div className='contentView'>
			<main>
				<h1>Hello! My name is Anton</h1>
				<div>I'm looking for frontend-developer job position in Moscow.</div>
				<div>My favorite framework is ReactJS.</div>
				<div>I have great experience with building progressive <br/>flexibility design templates for desktop and mobile
					platforms.
				</div>
				<h2>Basic skills</h2>
				
				<ul>
					<li>JavaScript (ES6+)</li>
					<li>React & Redux</li>
					<li>HTML5, CSS3</li>
				</ul>
			</main>
		</div>
		<div className="links">
			<Link to="/works">Works</Link>
		</div>
	</section>

