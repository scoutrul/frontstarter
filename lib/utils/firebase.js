import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyA4s0qtHXnb90RYnuER2TcE_8qXrfbayDA",
	authDomain: "frontender-ce689.firebaseapp.com",
	databaseURL: "https://frontender-ce689.firebaseio.com",
	projectId: "frontender-ce689",
	storageBucket: "frontender-ce689.appspot.com",
	messagingSenderId: "213381411867"
};
firebase.initializeApp(config).database();
var _default = firebase;
export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(config, "config", "src/utils/firebase.js");

	__REACT_HOT_LOADER__.register(_default, "default", "src/utils/firebase.js");
}();

;