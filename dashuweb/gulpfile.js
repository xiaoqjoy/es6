var { series } = require('gulp');
var browserSync = require('browser-sync').create();
const { createProxyMiddleware } = require('http-proxy-middleware');

const xhr = createProxyMiddleware('/api', {
	target: 'http://10.20.0.9:8300',
	changeOrigin: true
});

const img = createProxyMiddleware('/image', {
	target: 'http://10.20.0.9:8300',
	changeOrigin: true
});

const reload = () => {
  browserSync.init({
    server: {
			baseDir: "./",
			port: 3000,
			open: false,
			middleware: [xhr, img]
    }
  });
}

exports.default = series(reload)