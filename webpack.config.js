var webpack = require('webpack');
var path = require('path');

var config = {
  entry: './dev/ts/main.ts',
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['', '.ts', '.js'],
    alias: {
      'bxSlider': path.resolve(
        __dirname,
        'node_modules/bxslider/dist/jquery.bxslider.min.js'
      )
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: {test: /\.ts$/, loader: 'ts-loader' }}
    ]
  },
  devtool: '#source-map'
};

module.exports = config;
