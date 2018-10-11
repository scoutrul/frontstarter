import React, {Component} from 'react'
import './home.scss'


// надо что бы от мыши была дистанция по радиусу от центра элемента
// от этой цифры будет тень гулять цсс

class Home extends Component {

	calculateDistance = (elem, mouseX, mouseY, ofsX, ofsY) => {
		console.log(elem);
        return Math.floor(
			Math.sqrt(
				Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)
			)
		);
	}

	onMouseListener = (e, el) => {
		console.log(e);
		const mX = e.x;
		const mY = e.y;
		const ofsX = e.offsetX;
		const ofsY = e.offsetY;
		const distance = this.calculateDistance(el, mX, mY, ofsX, ofsY);
		console.log(distance);    
	}

	componentDidMount(){
		console.log('hi');

		this.home.addEventListener('mouseover', (e) => this.onMouseListener(e, this.frontend));
	}

	componentWillUnmount(){
		console.log('bb');

		this.home.removeEventListener('mouseover', (e) => this.onMouseListener(e, this.frontend));
	}

	render(){
		return(
			<section className='home' ref={elem => this.home = elem}>
				<div className='contentView' >
					<h1>
						<span className='high' ref={elem => this.frontend = elem}>FrontEnd</span><br/>
						
						<span className='low' id='developer'>Moscow developer</span>
					</h1>
				</div>
			</section>
			)
		}
	}

export default Home;