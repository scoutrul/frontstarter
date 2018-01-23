import * as functions from 'firebase-functions';
import React from 'react';
import ReactDOM from 'react-dom/server';
import * as express from 'express';

import App from './components/App';
import template from './template';

var app = express();

app.use(express.static('public'));

app.get('.', function (req, res) {
	var body = ReactDOM.renderToString(React.createElement(App, null));
	var html = template(body);
	res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
	res.send(html);
});

app.listen(4000, function () {
	console.log('Listening on port 3000');
});

export var ssrapp = functions.https.onRequest(app);
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(app, 'app', 'src/server.js');

	__REACT_HOT_LOADER__.register(ssrapp, 'ssrapp', 'src/server.js');
}();

;