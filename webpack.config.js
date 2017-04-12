let webpack = require('webpack');

module.exports = {
  entry: [
    './src/app.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8081'
  ],
  devServer: {
    historyApiFallback: true
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
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/',
    //publicPath: 'http://localhost:8081/assets/'
  }
};
