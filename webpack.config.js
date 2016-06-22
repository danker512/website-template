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
      output: {
        comments: require('uglify-save-license')
      },
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.js'],
    alias: {
      'bootstrap': path.resolve(
        __dirname,
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
      )
    }
  },
  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint-loader'}
    ],
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader'}
    ]
  },
  devtool: '#source-map'
};

module.exports = config;
