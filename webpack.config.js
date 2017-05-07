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
    proxy: {
           "/api": {
             host: 'localhost',
             target: "https://api.steampowered.com/",
             pathRewrite: {"^/api/" : ""},
             secure: false,
             changeOrigin: true
           }
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
