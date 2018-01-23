var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { createAction, createReducer } from 'redux-act';

export var FetchMenu = createAction('menu items is fetched');

var initialState = {
	pages: {
		about: {
			technology: [{
				label: "bootstrap",
				url: "/images/icons/bootstrap.png"
			}, {
				label: "chrome",
				url: "/images/icons/chrome.png"
			}, {
				label: "google",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png"
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
				url: "https://pbs.twimg.com/profile_images/778422085639032832/44mC-kJ3.jpg"
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
				url: "https://waverleysoftware.com/wp-content/uploads/2016/12/PWA-logo.jpg"
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
			}]
		}
	}

};

export default createReducer((_createReducer = {}, _createReducer[FetchMenu] = function (state, payload) {
	return _extends({}, state, { items: [].concat(payload)
	});
}, _createReducer), initialState);