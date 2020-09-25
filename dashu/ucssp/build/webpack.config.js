// webpack.config.js
// 'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
require("babel-polyfill");
const nodeExternals = require('webpack-node-externals')
const vueLoaderConfig = require('./vue-loader.conf')
var isCoverage = process.env.NODE_ENV === 'coverage';

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    // 先禁用
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

module.exports = {
  // ...
  externals: [nodeExternals()],
  devtool: 'inline-cheap-module-source-map',
  output: {
    // ...
    // 在源码表中使用绝对路径 (对于在 IDE 中调试时很重要)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    rules: [].concat(
    isCoverage ? {
          test: /\.(js|ts)/,
          include: path.resolve('src'), // instrument only testing sources with Istanbul, after ts-loader runs
          loader: 'istanbul-instrumenter-loader'
      }: [],
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    )
  },
  target: 'node',
  externals: [nodeExternals()],
  // devtool: 'inline-cheap-module-source-map',
  devtool: 'source-map',
}