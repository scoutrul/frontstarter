import { createAction, createReducer } from 'redux-act'
export const FetchMenu = createAction('menu items is fetched');
export const MenuHoverOn = createAction('menu is hover on');
export const MenuHoverOff = createAction('menu is hover off');
export const MenuClicked = createAction('menu is clicked');

const initialState = {
	isMenuHover: false,
	items: [
		{label: '/', url: '/', description: 'Index'},
		{label: 'About', url: '/about', description: 'About'},
		{label: 'Works', url: '/works', description: 'Works'},
		{label: 'Contacts', url: '/contacts', description: 'Contacts'},
	],
	
};

export default createReducer({
	[FetchMenu]: (state, payload) => {
		return {
			...state, items: [...payload]
		}
		
	},
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
	[MenuClicked]: (state) => {
		return {
			...state, isMenuHover: !state.isMenuHover
		}
	},
}, initialState);


