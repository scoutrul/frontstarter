import { createAction, createReducer } from 'redux-act'
export const FetchMenu = createAction('menu items is fetched');
export const MenuHoverOn = createAction('menu is hover on');
export const MenuHoverOff = createAction('menu is hover off');

const initialState = {
	isMenuHover: false,
	items: [
		{label: "/", url: "/"},
		{label: "/Info", url: "/info"},


		{label: "/Connect", url: "/connect"},
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
}, initialState);


