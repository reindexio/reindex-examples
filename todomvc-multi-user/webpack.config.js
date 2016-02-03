const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'public', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'react-hot-loader',
          'babel-loader?stage=0&plugins=./build/babelRelayPlugin',
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        ),
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'REINDEX_URL': JSON.stringify(process.env.REINDEX_URL)
    }),
    new ExtractTextPlugin('bundle.css'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.debug = false;
  config.entry = [
    './src/index',
  ];
  config.module.loaders[0] = {
    test: /\.js$/,
    include: path.join(__dirname, 'src'),
    loaders: [
      'babel-loader?stage=0&plugins=./build/babelRelayPlugin',
    ],
  },
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.DedupePlugin()
  );
}

module.exports = config;
