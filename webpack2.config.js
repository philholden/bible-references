const { resolve, join } = require('path')
const webpack = require('webpack')

module.exports = env => ({
  entry: (env.dev && [
    'react-hot-loader/patch',
    'babel-polyfill',
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    'index',
  ]) || (env.prod && [
    './src/index',
  ]),
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    pathinfo: !env.prod,
    publicPath: '/static/',
  },
  plugins: (env.dev && [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]) || (env.prod && [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ]),
  context: resolve(__dirname, 'src'),
  resolve: {
    modulesDirectories: [
      join(__dirname, 'src'),
      'node_modules',
      'node_modules/component-archetype/node_modules',
    ],
  },
  devtool: env.prod ? 'source-map' : 'eval',
  bail: env.prod,
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: resolve('babel-loader'),
        include: join(__dirname, 'src'),
      },
      {
        test: /\.png$/,
        loader: `${resolve('url-loader')}'?limit=100000`,
      },
    ],
  },
})
