import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './PageChange.scss'

export const PageChange = Page => {
	return props =>
		<ReactCSSTransitionGroup
			transitionAppear={true}
			transitionAppearTimeout={600}
			transitionEnterTimeout={600}
			transitionLeaveTimeout={200}
			transitionName={'SlideIn'}
		>
			<Page {...props} />
		</ReactCSSTransitionGroup>;
};

