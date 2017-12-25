import React from 'react'
import './about.scss'

let items = [
	{
		label: 'bootstrap',
		url: '/images/icons/bootstrap.png'
	},
	{
		label: 'chrome',
		url: '/images/icons/chrome.png'
	},
	{
		label: 'cmd',
		url: '/images/icons/cmd.png'
	},
	{
		label: 'css3',
		url: '/images/icons/css3.png'
	},
	{
		label: 'es6',
		url: '/images/icons/es6.png'
	},
	{
		label: 'firebase',
		url: '/images/icons/firebase.png'
	},
	{
		label: 'git',
		url: '/images/icons/git.png'
	},
	{
		label: 'gulp',
		url: '/images/icons/gulp.png'
	},
	{
		label: 'html5',
		url: '/images/icons/html5.png'
	},
	{
		label: 'illustrator',
		url: '/images/icons/illustrator.png'
	},
	{
		label: 'javascript',
		url: '/images/icons/javascript.png'
	},
	{
		label: 'jquery',
		url: '/images/icons/jquery.png'
	},
	{
		label: 'nodejs',
		url: '/images/icons/nodejs.png'
	},
	{
		label: 'npm',
		url: '/images/icons/npm.png'
	},
	{
		label: 'photoshop',
		url: '/images/icons/photoshop.png'
	},
	{
		label: 'php',
		url: '/images/icons/php.png'
	},
	{
		label: 'pug',
		url: '/images/icons/pug.png'
	},
	{
		label: 'react',
		url: '/images/icons/react.png'
	},
	{
		label: 'redux',
		url: '/images/icons/redux.png'
	},
	{
		label: 'responsive',
		url: '/images/icons/responsive.png'
	},
	{
		label: 'sass',
		url: '/images/icons/sass.png'
	},
	{
		label: 'stylus',
		url: '/images/icons/stylus.png'
	},
	{
		label: 'sublime',
		url: '/images/icons/sublime.png'
	},
	{
		label: 'webpack',
		url: '/images/icons/webpack.png'
	},
	{
		label: 'webstorm',
		url: '/images/icons/webstorm.png'
	},
	{
		label: 'wordpress',
		url: '/images/icons/wordpress.png'
	},
];

const AllTech = () => {
	return (
		<ul>
			{items.map(item => {
				return (
					<li key={item.label}><img src={item.url} alt={item.label}/></li>
				)
			})}
		</ul>
	)
}

export default () =>
	<section>
		<div className='contentView'>
			
			<h1>About me</h1>
			<a href="https://frontstarter.ru">foto</a><br/>
			
			<main className='infoList'>
				<div>
					<h3>Technology:</h3>
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
			<AllTech/>
		</div>
	</section>


