import React, {Component} from 'react'
import './home.scss'

class Home extends Component {
	state = {
		mX: null,
		mY: null,
	}

	onMouseListener = (e) => {
		const mX = e.x;
		const mY = e.y;

		this.setState({
			mX,
			mY
		});
		
	}

	componentDidMount(){
		console.log('hi');

		this.view.addEventListener('mouseover', this.onMouseListener);
	}

	componentWillUnmount(){
		console.log('bb');

		this.view.removeEventListener('mouseover', this.onMouseListener);
	}

	render(){
		const shadow = this.state.mY / 1000;
		const frontend = {
			'textShadow' : `-0.5rem 0.4rem ${shadow}rem rgba(28, 17, 53, 0.6)`,
			'top' : -this.state.mX/100,
			'left' : this.state.mY/100,
		}
		const developer = {
			'top' : this.state.mX/100,
			'left' : -this.state.mY/100,
		}
		return(
			<section className='home' >
				<div className='contentView' ref={elem => this.view = elem} >
					<h1>
						<span className='high' style={frontend}>FrontEnd</span><br/>
						
						<span className='low' id='developer' style={developer}>Moscow developer</span>
					</h1>
				</div>
			</section>
			)
		}
	}

export default Home;