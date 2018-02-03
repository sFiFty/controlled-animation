const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: {
		app: [
			path.join(__dirname, 'assets', 'index.js')
		]
	},
	output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
		filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                  {
                    loader: 'babel-loader',
                  },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' }
        ]
    }
}
