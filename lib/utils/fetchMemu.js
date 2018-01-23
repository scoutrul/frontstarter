var _this = this;

import firebase from './firebase.js';

var _default = FireMenuItems = function FireMenuItems() {
	firebase.database().ref('Menu').on('value', function (snap) {
		var result = [];
		snap.forEach(function (childNodes) {
			result.push({ label: childNodes.key, url: childNodes.val() });
		});
		_this.props.actions.FetchMenu(result);
	});
};

export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/utils/fetchMemu.js');
}();

;