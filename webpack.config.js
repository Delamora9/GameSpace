let webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
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
    path: __dirname + '/dist/'
  }
};
