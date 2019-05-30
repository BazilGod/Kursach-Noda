let webpack = require('webpack');
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, '../../scripts');
let APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'registration-bundle.js'
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        loader : 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;