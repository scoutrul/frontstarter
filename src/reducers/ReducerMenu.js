import { createAction, createReducer } from 'redux-act';

export const MenuHoverOn = createAction('menu is hover on');
export const MenuHoverOff = createAction('menu is hover off');

const initialState = {
	isMenuHover: false,
	items: [
		{ label: 'Home', url: '/' },
		{ label: 'About', url: '/about' },
		{ label: 'Works', url: '/works' },
		{ label: 'Contact', url: '/contact' },
	]
};

export default createReducer({
	[MenuHoverOn]: (state) => {
		return {
			...state, isMenuHover: true
		}
	},
	[MenuHoverOff]: (state) => {
		return {
			...state, isMenuHover: false
		}
	},
}, initialState); 