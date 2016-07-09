const path = require('path')
const join = path.join
const resolve = path.resolve
const webpack = require('webpack')

module.exports = env => {
  return {
    entry: (env.dev && [
      'react-hot-loader/patch',
      'babel-polyfill',
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      'index',
    ]) || (env.prod && [
      'index',
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
    ])
    // || (env.prod && [
    //   new webpack.optimize.OccurrenceOrderPlugin(),
    //   // sets react to production build
    //   // for conditional include:
    //   // if (process.env.NODE_ENV === 'production')
    //   new webpack.DefinePlugin({
    //     'process.env': {
    //       'NODE_ENV': JSON.stringify('production'),
    //     },
    //   }),
    //   new webpack.optimize.UglifyJsPlugin({
    //     compressor: {
    //       warnings: false,
    //     },
    //   }),
    // ])
    ,
    context: resolve(__dirname, 'src'),
    resolve: {
      modules: [
        join(__dirname, 'src'),
        'node_modules',
//        'node_modules/component-archetype/node_modules',
      ],
    },
    devtool: env.prod ? 'cheap-module-source-map' : 'cheap-eval-source-map',
    bail: env.prod,
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          loader: 'babel-loader',
          include: join(__dirname, 'src'),
        },
        {
          test: /\.png$/,
          loader: 'url-loader?limit=100000',
        },
      ],
    },
  }
}
