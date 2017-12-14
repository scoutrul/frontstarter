import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './PageChange.scss'

const PageChange = Wrapped => {
	return class extends React.Component {
		constructor(props) {
			super(props);
		}
		shouldComponentUpdate() {
			return false;
			// not working
		}
		render() {
			return (
				
				
				<ReactCSSTransitionGroup
					transitionAppear={true}
					transitionAppearTimeout={200}
					transitionEnterTimeout={200}
					transitionLeaveTimeout={200}
					transitionName={'SlideIn'}
				>
					<Wrapped {...this.props} />
				</ReactCSSTransitionGroup>
			)
		}
	}
};

export default PageChange