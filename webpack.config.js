const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const bourbon = require('bourbon').includePaths
// const bitters = require('bourbon-bitters').includePaths

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
        // options: {
        //   loaders: {
        //     scss: `vue-style-loader!css-loader!sass-loader?includePaths[]=${bourbon}&includePaths[]=${bitters}`, // <style lang="scss">
        //     sass: `vue-style-loader!css-loader!sass-loader?indentedSyntax&includePaths[]=${bourbon}&includePaths[]=${bitters}` // <style lang="sass">
        //   }
        // }
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
      // template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    })
  ]
}
