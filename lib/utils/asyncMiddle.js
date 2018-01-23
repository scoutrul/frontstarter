var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export var asyncMiddle = function asyncMiddle(_ref) {
	var dispatch = _ref.dispatch;

	return function (next) {
		return function (action) {
			if (!action.payload || !action.payload.then) {
				// console.log('no async')
				return next(action);
			}
			// console.log('async')
			action.payload.then(function (response) {

				var newAction = _extends({}, action, { payload: response });
				console.log(newAction);
				dispatch(newAction);
			});
		};
	};
};
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(asyncMiddle, "asyncMiddle", "src/utils/asyncMiddle.js");
}();

;