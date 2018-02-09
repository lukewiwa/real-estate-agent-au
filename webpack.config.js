const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    popup: path.join(__dirname, 'src', 'popup', 'popup.js'),
    options: path.join(__dirname, 'src', 'options', 'options.js'),
    background: path.join(__dirname, 'src', 'background', 'background.js'),
    'content-script': path.join(__dirname, 'src', 'content-scripts', 'content-script.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      'dist'
    ),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([{
      from: 'src/manifest.json'
    }]),
    // Use html template files for final html files
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      filename: 'background.html',
      chunks: ['background']
    })
  ]
}
