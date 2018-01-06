import React, { Component } from 'react';
import './PageChange.scss'
import { Motion, spring } from 'react-motion';

const PageChange = (WrappedComponent) => {
	return class extends Component {
		constructor(props) {
			super(props);
		}
		
		shouldComponentUpdate() {
			return false;
			// not working
		}
		
		render() {
			return (
				<Motion
					defaultStyle={{
						opacity: 0.01,
						filter: 30

					}}
					style={{
						opacity: spring(1),
						filter: spring(0, {stiffness: 440, damping: 30})
					}}
					>
					{style => (
						<div style={{filter:`blur(${style.filter}px)`, opacity: style.opacity}} className='motion'>
							<WrappedComponent {...this.props} />
						</div>
					)}
				</Motion>
			)
		}
	}
};

export default PageChange