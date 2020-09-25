var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
	browserSync.init({
		port: 3000,
		server: {
			baseDir: "./"
		},
	});
});

gulp.task('my-watch', function() {
	gulp.watch('./dsWebsite/**/*.html', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		browserSync.reload();
	});
	gulp.watch('./dsWebsite/files/css/*.css', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		browserSync.reload();
	});
	gulp.watch('./dsWebsite/files/js/*.js', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		browserSync.reload();
	});	
})

gulp.task("default", ["browser-sync", "my-watch"], function() {
	console.log("运行");
});