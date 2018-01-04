import React from "react";
import "./about.scss";

let technology = [
	{
		label: "bootstrap",
		url: "/images/icons/bootstrap.png"
	},
	{
		label: "chrome",
		url: "/images/icons/chrome.png"
	},
	{
		label: "cmd",
		url: "/images/icons/cmd.png"
	},
	{
		label: "css3",
		url: "/images/icons/css3.png"
	},
	{
		label: "es6",
		url: "/images/icons/es6.png"
	},
	{
		label: "firebase",
		url: "/images/icons/firebase.png"
	},
	{
		label: "git",
		url: "/images/icons/git.png"
	},
	{
		label: "gulp",
		url: "/images/icons/gulp.png"
	},
	{
		label: "html5",
		url: "/images/icons/html5.png"
	},
	{
		label: "illustrator",
		url: "/images/icons/illustrator.png"
	},
	{
		label: "javascript",
		url: "/images/icons/javascript.png"
	},
	{
		label: "jquery",
		url: "/images/icons/jquery.png"
	},
	{
		label: "nodejs",
		url: "/images/icons/nodejs.png"
	},
	{
		label: "npm",
		url: "/images/icons/npm.png"
	},
	{
		label: "photoshop",
		url: "/images/icons/photoshop.png"
	},
	{
		label: "php",
		url: "/images/icons/php.png"
	},
	{
		label: "pug",
		url: "/images/icons/pug.png"
	},
	{
		label: "react",
		url: "/images/icons/react.png"
	},
	{
		label: "redux",
		url: "/images/icons/redux.png"
	},
	{
		label: "responsive",
		url: "/images/icons/responsive.png"
	},
	{
		label: "sass",
		url: "/images/icons/sass.png"
	},
	{
		label: "stylus",
		url: "/images/icons/stylus.png"
	},
	{
		label: "sublime",
		url: "/images/icons/sublime.png"
	},
	{
		label: "webpack",
		url: "/images/icons/webpack.png"
	},
	{
		label: "webstorm",
		url: "/images/icons/webstorm.png"
	},
	{
		label: "wordpress",
		url: "/images/icons/wordpress.png"
	}
];

const AllTech = props => {
	return (
		<ul className="icons">
			{props.items.map(item => {
				return (
					<li key={item.label}>
						<img src={item.url} alt={item.label}/>
					</li>
				);
			})}
		</ul>
	);
};

const getItem = (tech, name) => {
	let result = tech.filter(item => item.label === name);
	return <img src={result.url} alt={result.label}/>;
};
export default () => (
	<section>
		<div className="contentView">
			<h1>About me</h1>
			{/*<img src="./images/photo.jpg" alt=""/>*/}
			<div>
				<p>
					This letter is to express my interest in the job posted on your
					website for an experienced, detailed-oriented, front-end web
					developer. As you'll see, I have six years of hands-on experience
					efficiently coding websites and applications using modern HTML, CSS,
					and JavaScript.
				</p>
				
				<p>
					Building state-of-the-art, easy to use, user-friendly websites and
					applications is truly a passion of mine and I am confident I would be
					an excellent addition to your organization. In addition to my
					knowledge base, I actively seek out new technologies and stay
					up-to-date on industry trends and advancements. This has allowed me to
					stay ahead of the curve and deliver exceptional work to all of my
					employers, including those I've worked for on a project basis.
				</p>
				<p>
					- es2015+, css (stylus), nodejs (express), webpack
					- опыт разработки SPA с серверным рендерингом
					+ опыт разработки с использованием react, react-router, redux
					+ опыт адаптивной верстки сложных проектов
				</p>
			</div>
			<main className="infoList">
				<div>
					<h3>Technology:</h3>
					<ul>
						<li>
							<img src={technology[0].url} alt=""/>
						</li>
						<li>{getItem(technology, "html")}</li>
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
						<li>{getItem(technology, "react")}</li>
						<li>{getItem(technology, "redux")}</li>
					</ul>
				</div>
			</main>
			<AllTech items={technology}/>
		</div>
	</section>
);
