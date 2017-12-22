import React from 'react'
import './about.scss'

export default () =>
	<section>
		<div className='contentView'>
			
			<h1>About me</h1>
			<a href="https://frontstarter.ru">foto</a><br/>
			
			<main className='infoList'>
				<div>
					<h3>Skills:</h3>
					<ul>
						<li>JavaScript </li>
						<li>HTML</li>
						<li>CSS</li>
						<li>Design</li>
					</ul>
				</div>
				<div>
					<h3>Tools:</h3>
					<ul>
						<li>WebPack, Gulp</li>
						<li>NPM, Yarn, Terminal</li>
						<li>GIT</li>
						<li>WebStorm IDE</li>
						<li>Chrome Dev</li>
						<li>Google Search</li>
						<li>PhotoShop</li>
					</ul>
				</div>
				<div>
					<h3>Stack:</h3>
					<ul>
						<li>React</li>
						<li>Redux</li>
					</ul>
				</div>
			
			</main>
		</div>
	</section>


