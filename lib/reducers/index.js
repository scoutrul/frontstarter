import { combineReducers } from 'redux';
import ReducerMenu from './ReducerMenu.js';
import english from './english.js';
import technology from './technology.js';

var _default = combineReducers({
	ReducerMenu: ReducerMenu,
	english: english,
	technology: technology
});

export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/reducers/index.js');
}();

;