import firebase from './firebase.js'

export default FireMenuItems = () => {
	firebase.database().ref('Menu').on('value', snap => {
		let result = [];
		snap.forEach(childNodes => {
			result.push({ label: childNodes.key, url: childNodes.val() })
		});
		this.props.actions.FetchMenu(result)
	});
};