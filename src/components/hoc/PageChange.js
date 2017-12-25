import React, { Component } from 'react';
import './PageChange.scss'
import { Motion, spring } from 'react-motion';

const PageChange = Wrapped => {
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
						filter: 5

					}}
					style={{
						opacity: spring(1),
						filter: spring(0, {stiffness: 270, damping: 40})
					}}
					>
					{style => (
						<div style={{filter:`blur(${style.filter}px)`, opacity: style.opacity}} className='motion'>
							<Wrapped {...this.props} />
						</div>
					)}
				</Motion>
			)
		}
	}
};

export default PageChange