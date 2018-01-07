import { createAction, createReducer } from 'redux-act'
export const FetchMenu = createAction('menu items is fetched');


const initialState = {
	pages: {
		about: {
		
		}
	}
	
};

export default createReducer({
	[FetchMenu]: (state, payload) => {
		return {
			...state, items: [...payload]
		}
	},
	
}, initialState);


