export const asyncMiddle = ({ dispatch }) => {
	return next => action => {
		if (!action.payload || !action.payload.then) {
			console.log('no async')
			return next(action)
		}
		console.log('async')
		action.payload
			.then(function (response) {
				
				const newAction = { ...action, payload: response };
				console.log(newAction);
				dispatch(newAction);
			})
	};
};
