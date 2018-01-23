import { createAction, createReducer } from 'redux-act';

var initialState = [{
	label: "bootstrap",
	url: "/images/icons/bootstrap.png"
}, {
	label: "chrome",
	url: "/images/icons/chrome.png"
}, {
	label: "google",
	url: "/images/icons/google.png"
}, {
	label: "router4",
	url: "/images/icons/router4.svg"
}, {
	label: "cmd",
	url: "/images/icons/cmd.png"
}, {
	label: "css3",
	url: "/images/icons/css3.png"
}, {
	label: "es6",
	url: "/images/icons/es6.png"
}, {
	label: "firebase",
	url: "/images/icons/firebase.png"
}, {
	label: "git",
	url: "/images/icons/git.png"
}, {
	label: "gulp",
	url: "/images/icons/gulp.png"
}, {
	label: "html5",
	url: "/images/icons/html5.png"
}, {
	label: "illustrator",
	url: "/images/icons/illustrator.png"
}, {
	label: "javascript",
	url: "/images/icons/javascript.png"
}, {
	label: "jquery",
	url: "/images/icons/jquery.png"
}, {
	label: "nodejs",
	url: "/images/icons/nodejs.png"
}, {
	label: "npm",
	url: "/images/icons/npm.png"
}, {
	label: "yarn",
	url: "/images/icons/yarn.png"
}, {
	label: "photoshop",
	url: "/images/icons/photoshop.png"
}, {
	label: "php",
	url: "/images/icons/php.png"
}, {
	label: "pug",
	url: "/images/icons/pug.png"
}, {
	label: "react",
	url: "/images/icons/react.png"
}, {
	label: "redux",
	url: "/images/icons/redux.png"
}, {
	label: "responsive",
	url: "/images/icons/responsive.png"
}, {
	label: "pwa",
	url: "/images/icons/pwa.png"
}, {
	label: "sass",
	url: "/images/icons/sass.png"
}, {
	label: "stylus",
	url: "/images/icons/stylus.png"
}, {
	label: "sublime",
	url: "/images/icons/sublime.png"
}, {
	label: "webpack",
	url: "/images/icons/webpack.png"
}, {
	label: "webstorm",
	url: "/images/icons/webstorm.png"
}, {
	label: "wordpress",
	url: "/images/icons/wordpress.png"
}, {
	label: "bem",
	url: "/images/icons/bem.png"
}, {
	label: "rest",
	url: "/images/icons/rest.png"
}, {
	label: "ajax",
	url: "/images/icons/ajax.png"
}, {
	label: "English",
	url: "/images/icons/english.png"
}];

var _default = createReducer({}, initialState);

export default _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(initialState, "initialState", "src/reducers/technology.js");

	__REACT_HOT_LOADER__.register(_default, "default", "src/reducers/technology.js");
}();

;