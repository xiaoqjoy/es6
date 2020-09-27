'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://111.230.162.174:3180/ucssp'
      },
      '/ftb/api': {
        target: 'http://111.230.162.174:4180'
      },
      '/uat/*': {
        target: 'http://dsapp18.intuat.dsfdc.com/h5',
        pathRewrite: {
          '/uat': '/'
        }
      },
      '/dev1': {
        target: 'http://111.230.162.174:5180/ucssp',
        pathRewrite: {
          '/dev1': '/'
        }
      },
      '/sit2': {
        target: 'http://dsapp57.intsit.dsfdc.com:8080/h5',
        pathRewrite: {
          '/sit2': '/'
        }
      },
      '/sit3': {
        target: 'http://111.230.162.174:4180/ucssp',
        pathRewrite: {
          '/sit3': '/'
        }
      },
      '/sit6': {
        target: 'http://111.230.162.174:6180/ucssp',
        pathRewrite: {
          '/sit6': '/'
        }
      },
      '/dpms': {
        target: 'http://10.3.114.136:8097'
      },
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

