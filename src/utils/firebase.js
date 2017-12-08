import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyA4s0qtHXnb90RYnuER2TcE_8qXrfbayDA",
	authDomain: "frontender-ce689.firebaseapp.com",
	databaseURL: "https://frontender-ce689.firebaseio.com",
	projectId: "frontender-ce689",
	storageBucket: "frontender-ce689.appspot.com",
	messagingSenderId: "213381411867"
};
firebase.initializeApp(config).database();
export default firebase;