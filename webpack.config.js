let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: [
    './src/app.js',
    'webpack-dev-server/client?http://localhost:8081/'
  ],
  devServer: {
    historyApiFallback: true,
    host: 'localhost', 
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/',
    publicPath : 'http://localhost:8081/dist/'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js']
  },
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};