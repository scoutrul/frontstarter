const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const SETTINGS = require('./settings');

const production = process.env.NODE_ENV === 'production';


const path = require('path'),
	dist = 'public',
	workboxPlugin = require('workbox-webpack-plugin');

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
	new HtmlWebpackPlugin({ template: 'template.ejs' }),
	
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

	new workboxPlugin({
		globDirectory: dist,
		globPatterns: ['**/*.{html,js}'],
		swDest: path.join(dist, 'service-worker.js'),
		clientsClaim: true,
		skipWaiting: true,
		runtimeCaching: [
			{
				urlPattern: new RegExp('https://hacker-news.firebaseio.com'),
				handler: 'staleWhileRevalidate'
			}
		]
	}),
];

module.exports = {
	devtool: production ? 'cheap-module-source-map' : 'eval',
	
	entry: production
		? './src/index'
		: [
			'react-hot-loader/patch',
			`webpack-dev-server/client?http://localhost:${SETTINGS.PORT}`,
			'webpack/hot/only-dev-server',
			'./src/index',
		],
	
	output: {
		path: SETTINGS.PUBLIC_PATH,
		filename: 'bundle.js',
		publicPath: './',
	},
	
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['.js', '.jsx', '.json'],
	},
	
	module: { loaders },
	plugins: production ? productionPlugins : developmentPlugins,
};
