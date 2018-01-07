import React from "react";
import "./about.scss";
import { withRouter } from "react-router";
import { connect } from "react-redux";


function mapStateToProps(state) {
	return {
		initialList: state.russian.pages.about.technology,
	}
}

@withRouter
@connect(mapStateToProps)
export default class extends React.Component {
	
	state = {
		initialList: this.props.initialList,
		sortedList: this.props.initialList
	};
	
	render() {
		let { initialList, sortedList } = this.state;
		
		const getItem = (name) => {
			let Item = initialList.filter(item => item.label === name)[0];
			let sortedArr = sortedList.filter(out => out !== Item);
			this.setState({ sortedList: sortedArr });
			return <img src={Item.url} alt={Item.label}/>;
		};
		
		const SortedList = (props) => {
			return (
				<ul className="icons">
					{props.List.map(item => {
						return (
							<li key={item.label}>
								<img src={item.url} alt={item.label}/>
							</li>
						);
					})}
				</ul>
			);
		};
		
		const Stack = () =>
			<div>
				<h3>Stack:</h3>
				<ul className='icons up'>
					<li>{getItem("react")}</li>
					<li>{getItem("redux")}</li>
					<li>{getItem("es6")}</li>
					<li>{getItem("html5")}</li>
					<li>{getItem("css3")}</li>
					<li>{getItem("sass")}</li>
				</ul>
			</div>;
		
		const Tools = () =>
			<div>
				<h3>Tools:</h3>
				<ul className='icons up'>
					<li>{getItem("webpack")}</li>
					<li>{getItem("webstorm")}</li>
					<li>{getItem("git")}</li>
					<li>{getItem("npm")}</li>
					<li>{getItem("chrome")}</li>
					<li>{getItem("google")}</li>
					<li>{getItem("photoshop")}</li>
				</ul>
			</div>;
		
		return (
			<section>
				<div className="contentView">
					<h1>About me</h1>
					<img src="./images/photo.jpg" alt=""/>
					<div>
						<p>
							Привет, меня зовут Антон! Я веб-разработчик с более чем трех летним
							стажем работы во фронтенде. Так же более 10 лет занимался веб-маркетингом
							(разработка, дизайн и продвижение сайтов, построение рекламных сетей, ведение проектов).
							На сегодняшний день я владею всеми необходимыми навыками для создания
							сайта любой сложности, с адаптацией под мобильные устройства.
							В 2017-2018 году предпочитаю использовать ReactJS.
						
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
						<Stack/>
						<Tools/>
					
					</main>
					<SortedList List={sortedList}/>
				</div>
			</section>
		)
	}
}
