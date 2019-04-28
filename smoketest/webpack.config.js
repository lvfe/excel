const path = require('path');
const webpack = require('webpack');
const  HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './smoketest/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  optimization: {
    namedChunks: true,
    minimize: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './smoketest/index.html'
    })
  ]
};
