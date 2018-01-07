import { combineReducers } from 'redux';
import ReducerMenu from './ReducerMenu.js'
import english from './english.js'
import russian from './russian.js'

export default combineReducers({
	ReducerMenu,
	english,
	russian
});
