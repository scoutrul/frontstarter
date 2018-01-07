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
		sortedList: [],
		stack: ['react', 'redux', 'javascript', 'html5', 'css3', 'sass'],
		tools: ['webpack', 'webstorm', 'git', 'npm', 'chrome', 'google'],
		stackMap: [],
		toolsMap: []
	};
	
	componentWillMount() {
		
		let sortedList = this.state.initialList.filter(curr => {
			return !this.state.stack.some(item => item === curr.label) && !this.state.tools.some(item => item === curr.label)
		});
		
		let stackMap = this.state.initialList.filter(curr => {
			return this.state.stack.some(item => item === curr.label)
		});
		
		let toolsMap = this.state.initialList.filter(curr => {
			return this.state.tools.some(item => item === curr.label)
		});
		
		this.setState({ sortedList, stackMap, toolsMap })
	}
	
	render() {
		let { initialList, sortedList } = this.state;
		
		return (
			<section>
				<div className="contentView">
					<h1>About me</h1>
					<img src="./images/photo.jpg" alt="" height='40px'/>
					<div>
						<p>
							Привет, меня зовут Антон! Я веб-разработчик с более чем трех-летним
							стажем работы во фронтенде. Так же более 10 лет занимаюсь веб-маркетингом
							(разработка, дизайн и продвижение сайтов, построение рекламных сетей, ведение проектов).
							Я владею всеми необходимыми навыками для создания
							современного веб-приложений любой сложности.<br/>
							В 2017-2018 году предпочитаю использовать ReactJS.
						</p>
						
						<p>
							Построение лугких, удобных, реактивных интерфейсов - это та работа,
							которая приносит мне удовольствие.<br/>
							Разработка сложных компонентов для высоконагруженных проектов - то,
							в чем я хочу приуспеть.
						</p>
						
						<p>Вам нужен опытный разработчик с хорошей перспективой?</p>
					
					</div>
					<main className="infoList">
						<div className='block'>
							<h3>Ключевые навыки:</h3>
							<ul className='icons'>
								{this.state.stackMap.map(item =>
									<li key={item.label}>
										<img src={item.url} alt={item.label}/>
									</li>
								)}
							</ul>
							<hr/>
						</div>
						
						<div className='block'>
							<h3>Инструменты:</h3>
							<ul className='icons'>
								{this.state.toolsMap.map(item =>
									<li key={item.label}>
										<img src={item.url} alt={item.label}/>
									</li>)}
							</ul>
							<hr/>
						</div>
						
						<div className='block'>
							<h3>Опционально:</h3>
							<ul className="icons small">
								{sortedList.map(item => {
									return (
										<li key={item.label}>
											<img src={item.url} alt={item.label}/>
										</li>
									);
								})}
							
							</ul>
						</div>
					</main>
				</div>
			</section>
		)
	}
}
