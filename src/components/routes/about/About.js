import React from 'react'
import { Link } from 'react-router-dom'
import './about.scss'

export default () =>
	<section>
		<div className='contentView'>
			<main>
				<h1>This site</h1>
				link: https://frontstarter.ru
				
				<h2>Used technologies</h2>

				<h3>Viewing:</h3>
				<ul>
					<li>SPA</li>
					<li>Adaptive design</li>
					<li>Mobile application</li>
					<li>Responsive text size</li>
					<li>CSSAnimation</li>
					<li>Minimalism</li>
				</ul>

				<h3>Hosting:</h3>
				<ul>
					<li>SSL, .ru,</li>
					<li>Firebase, gh-pages,</li>
					<li>Service Workers Ready</li>
				</ul>
				
				<h3>Production:</h3>
				<ul>
					<li>WebStrom</li>
					<li>NPM, WebPack</li>
					<li>SCSS, AutoPrefixer</li>
					<li>GIT</li>
					<li>Optimized deploying</li>
				</ul>

				<h3>Environment:</h3>
				<ul>
					<li>ReactJS v16</li>
					<li>Redux-act</li>
					<li>Router v4</li>
					<li>ES6, Babel</li>
					<li>Eslint</li>
				</ul>
				
			</main>
		</div>
	</section>

