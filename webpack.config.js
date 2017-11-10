const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { EnvironmentPlugin } = webpack;
const isProduction = () => process.env.NODE_ENV === 'production';


const plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title: 'A million times clock'
    }),
    new EnvironmentPlugin({
        NODE_ENV: 'development'
    })
];

if (isProduction()) {
    plugins.push(new UglifyJSPlugin());
}

module.exports = {
    entry: './src/main.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: plugins,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
