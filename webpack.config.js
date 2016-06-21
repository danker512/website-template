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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.js'],
    alias: {
      'bxSlider': path.resolve(
        __dirname,
        'node_modules/bxslider/dist/jquery.bxslider.min.js'
      )
    }
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader'}
    ]
  },
  devtool: '#source-map'
};

module.exports = config;
