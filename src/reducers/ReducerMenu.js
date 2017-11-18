import { createAction, createReducer } from 'redux-act';

export const MenuHoverOn = createAction('menu is hover on');
export const MenuHoverOff = createAction('menu is hover off');

const initialState = {
	isMenuHover: false
}

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