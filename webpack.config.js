const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const SETTINGS = require('./settings');
const workboxPlugin = require('workbox-webpack-plugin');
const nodeExternals = require('webpack-node-externals')

const production = process.env.NODE_ENV === 'production';


const path = require('path');
const dist = 'public';
const PUBLIC_PATH = '.';

const stylesLoaders = [
	{
		loader: 'css-loader',
		options: {
			minimize: production,
		},
	},
	'postcss-loader',
	'sass-loader',
	{
		loader: 'sass-resources-loader',
		options: {
			resources: [
				'./src/styles/variables.scss',
				'./src/styles/mixins.scss',
			],
		},
	},
];

const loaders = [
	{
		test: /\.(js|jsx)$/,
		loader: 'babel-loader',
		include: path.join(__dirname, 'src'),
		exclude: /node_modules/,
	},
	
	{
		test: /\.(css|scss)$/,
		loader: production
			? ExtractTextPlugin.extract({ fallback: 'style-loader', use: stylesLoaders })
			: ['style-loader', ...stylesLoaders],
	},
	
	{
		test: /\.(svg|png|jpg|gif|woff|woff2|otf|ttf|eot)$/,
		loader: 'file-loader',
	},
];

const pluginsBase = [
	new HtmlWebpackPlugin({
		template: 'template.ejs',
		inject: 'body',
		minify: {
			minifyCSS: true,
			collapseWhitespace: true
		}
	}),
	
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV || ''),
		},
	}),
];

const developmentPlugins = [
	...pluginsBase,
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new OpenBrowserPlugin({ url: `http://localhost:${SETTINGS.PORT}` }),
];

const productionPlugins = [
	...pluginsBase,
	new LodashModuleReplacementPlugin(),
	new ExtractTextPlugin('[name].css'),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		beautify: false,
		comments: false,
		compress: {
			sequences: true,
			booleans: true,
			loops: true,
			unused: false,
			warnings: false,
			drop_console: true,
			unsafe: true,
		},
	}),
	
	new ScriptExtHtmlWebpackPlugin({
		defaultAttribute: 'defer'
	}),
	new webpack.optimize.ModuleConcatenationPlugin(),
	new WebpackPwaManifest({
		"name": "Frontend developer from Moscow",
		"short_name": "Frontstarter",
		"start_url": ".",
		"display": "standalone",
		"background_color": "#1c1b1a",
		"theme_color": "#1c1b1a",
		"description": "Frontend developer from Moscow looking for good job. Here is my site example.",
		"icons": [
			{
				"src": "icons/48.png",
				"sizes": "48x48",
				"type": "image/png"
			},
			{
				"src": "icons/64.png",
				"sizes": "64x64",
				"type": "image/png"
			},
			{
				"src": "icons/128.png",
				"sizes": "128x128",
				"type": "image/png"
			},
			{
				"src": "icons/144.png",
				"sizes": "144x144",
				"type": "image/png"
			},
			{
				"src": "icons/152.png",
				"sizes": "152x152",
				"type": "image/png"
			},
			{
				"src": "icons/192.png",
				"sizes": "192x192",
				"type": "image/png"
			},
			{
				"src": "icons/512.png",
				"sizes": "512x512",
				"type": "image/png"
			}
		],
		"orientation": "portrait",
		"gcm_sender_id": "213381411867",
		fingerprints: false
	}),
	new workboxPlugin({
		globDirectory: dist,
		globPatterns: ['**/*.{html,js,css,json}'],
		swDest: path.join(dist, 'sw.js'),
		swSrc: './src/sw.js'
	}),

];

module.exports = [
	{
		devtool: production ? 'cheap-module-source-map' : 'eval',
		
		entry: production
			? './src/client.js'
			: [
				'react-hot-loader/patch',
				`webpack-dev-server/client?http://localhost:${SETTINGS.PORT}`,
				'webpack/hot/only-dev-server',
				'./src/client.js',
			],
		
		output: {
			path: SETTINGS.PUBLIC_PATH,
			filename: 'bundle.js',
			publicPath: PUBLIC_PATH,
		},
		
		resolve: {
			modules: [path.join(__dirname, 'src'), 'node_modules'],
			extensions: ['.js', '.jsx', '.json'],
		},
		
		module: { loaders },
		plugins: production ? productionPlugins : developmentPlugins,
	},
	// {
	// 	entry: './src/server.js',
	//
	// 	output: {
	// 		path: SETTINGS.PUBLIC_PATH,
	// 		filename: 'server.js',
	// 		publicPath: PUBLIC_PATH,
	// 	},
	//
	// 	module: { loaders },
	// 	plugins: production ? productionPlugins : developmentPlugins,
	// 	target: 'node',
	//
	// 	externals: [nodeExternals()],
	// }
];
