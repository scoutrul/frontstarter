import { combineReducers } from 'redux';
import ReducerMenu from './ReducerMenu.js'
import english from './english.js'
import technology from './technology.js'

export default combineReducers({
	ReducerMenu,
	english,
	technology
});
