const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});


const plugins = [ 
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new ExtractTextPlugin('style.css'),
    new webpack.ProvidePlugin({
		THREE: 'three'
	})
];
// plugins.push(new UglifyJsPlugin());

module.exports = {
    entry: './src/main.js',
    devtool: 'eval-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader']
              })
            }
          ]
    },
    plugins,
    devServer : {
        host: '0.0.0.0',
        port: 9000,
        open: true
    }
};