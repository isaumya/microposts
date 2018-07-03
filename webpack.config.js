module.exports = {
	mode: 'development',
	devtool: "source-map",
	entry: ["babel-polyfill", './src/app.js'],
	output: {
		path: __dirname + '/build',
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	}
};