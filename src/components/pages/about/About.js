import React from "react";
import "./about.scss";
import { withRouter} from "react-router";
import { Link} from "react-router-dom";
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
		let { sortedList, stackMap, toolsMap} = this.state;
		
		const ItemsRender = (array) =>
			<ul className='icons'>
				{array.map(item =>
					<li key={item.label}>
						<span>{item.label}</span>
						<img src={item.url} alt={item.label}/>
					</li>
				)}
			</ul>
		;
		
		return (
			<section>
				<div className="contentView about">
					<div className="fotostatus">
						<div className="photo">
							<img src="./images/photo.jpg"/>
							<p className='slogan'>
								"Построение легких, удобных, реактивных интерфейсов<br/>
								— это та работа,
								которая доставляет мне удовольствие."<br/>
								&copy; MySelf
							</p>
						</div>
						<div className="info">
							<h1>Головачев Антон Александрович</h1>
							<h2 className='status'>Статус: <span>доступен для найма</span></h2>
							{ItemsRender(stackMap)}
							
							
							<h2>Персона</h2>
							<ul>
								<li>31 год, Москва, холост</li>
								<li>сериалы, гитара, велосипед, покер, старкрафт</li>
								<li>карьера, отношения, путешествия</li>
							</ul>
						
						</div>
					</div>
					<div>
						<p>
							Привет, меня зовут Антон! Веб-разработчик с трех-летним
							стажем во фронтенде. Я придерживаюсь современных технологий JavaScript
							и постоянно изучаю что-то новое.<br/>
							Так же более 10 лет занимаюсь веб-маркетингом
							(разработка, дизайн и продвижение сайтов, построение рекламных сетей, ведение проектов).
							Владею всеми необходимыми навыками для создания
							современного веб-приложения. В 2017—2018 году предпочитаю использовать стек ReactJS + Redux + ES6.<br/>
							В поиске работы в творческом коллективе для совместной реализации крутых проектов!<br/>
							<Link to="/contacts">Пригласить</Link>
						</p>
					
					</div>
					<main className="infoList">
						
						<div className='block'>
							<h3>Инструменты:</h3>
							{ItemsRender(toolsMap)}
						</div>
						
						<div className='block'>
							<h3>Опционально:</h3>
							{ItemsRender(sortedList)}
						</div>

					</main>
				</div>
			</section>
		)
	}
}
