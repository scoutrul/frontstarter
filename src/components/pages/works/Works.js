import React from 'react'
import { withRouter } from "react-router";
import {
	BrowserRouter as Router,
	Switch, HashRouter,
	Route, Link
} from "react-router-dom";
import { connect } from "react-redux";
import './works.scss'


function mapStateToProps(state) {
	return {
		initialList: state.russian.pages.about.technology,
	}
}


@withRouter
@connect(mapStateToProps)
class Component extends React.Component {
	
	previousLocation = this.props.location;
	
	componentWillUpdate(nextProps) {
		const { location } = this.props;
		// set previousLocation if props.location is not modal
		if (
			nextProps.history.action !== 'POP' &&
			(!location.state || !location.state.modal)
		) {
			this.previousLocation = this.props.location
		}
	}
	
	render() {
		const { location } = this.props;
		
		const isModal = (
			location.state &&
			location.state.modal &&
			this.previousLocation !== location
		);
		console.log(location)
		
		const IterateItems = () => {
			return (
				<div className='contentView'>
					<h1>
						Works
					</h1>
					
					<div id='worksGrid'>
						{items.map((item, i) => {
							return (
								<div className='item' key={i}>
									<div className='content'>
										<label>{item.label}</label>
										<div className='info'>
											<div>{item.inner}</div>
										</div>
										<Link to={`${item.label}`} className='link'>show details</Link>
									</div>
									<div className='bg' style={{ backgroundImage: `url(${item.img})` }}>{null}</div>
								</div>
							)
						})}
					</div>
				</div>)
		};
		
		return (
			<section>
				
				<Switch location={isModal ? this.previousLocation : location}>
					<Route exact path='/works' component={IterateItems}/>
					
					
					<Route path='/works/:id' component={Modal}/>
				</Switch>
			
			</section>
		
		)
	}
}

let items = [
	{
		label: 'This site',
		inner: 'Info',
		features: [],
		img: '/images/w_frontstarter.png'
	},
	{
		label: 'Blackur',
		inner: 'Web-agency',
		img: '/images/w_blackur.png'
	},
	{
		label: 'Naurasha',
		inner: 'Product Landing Page',
		img: '/images/w_naurasha.png'
	},
	{
		label: 'Guardsman',
		inner: 'Single Page Application',
		img: '/images/w_guardsman.png'
	},
	{
		label: 'Guitar',
		inner: 'Chord Book Interface',
		img: '/images/w_guardsman.png'
	}
];

const Modal = ({ match, history }) => {

	const back = (e) => {
		e.stopPropagation()
		history.goBack()
	}
	return (
		<div onClick={back}>
			back
		</div>
	)
};

const ImageView = ({ match }) => {
	const image = items[parseInt(match.params.id, 10)]
	
	
	return (
		<div>
			<h1>{image.title}</h1>
		</div>
	)
}

export default () => (
	<HashRouter hashType='noslash'>
		<Route component={Component}/>
	</HashRouter>
)