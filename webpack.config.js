const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const bourbon = require('bourbon').includePaths
const bitters = require('bourbon-bitters').includePaths

module.exports = {
  entry: {
    popup: path.join(__dirname, 'src', 'js', 'popup.js'),
    options: path.join(__dirname, 'src', 'js', 'options.js'),
    background: path.join(__dirname, 'src', 'js', 'background.js'),
    'content-script': path.join(__dirname, 'src', 'js', 'content-script.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: `sass-loader?includePaths[]=${bourbon}&includePaths[]=${bitters}` // compiles Sass to CSS
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(
      'dist'
    ),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([{
      from: 'src/manifest.json'
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      // template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      // template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    })
  ]
}
