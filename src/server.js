import * as functions from 'firebase-functions';
import React from 'react'
import ReactDOM from 'react-dom/server'
import * as express from 'express'

import App from './components/App'
import template from './template'

const app = express();

app.use(express.static('public'));

app.get('.', (req, res) => {
	const body = ReactDOM.renderToString(<App />);
	const html = template(body);
	res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
	res.send(html)
});

app.listen(4000, () => {
	console.log('Listening on port 3000')
});

export let ssrapp = functions.https.onRequest(app)