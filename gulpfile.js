var gulp = require('gulp'); //required for gulp
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass')
var sequence = require('run-sequence');
var browserSync = require('browser-sync');
var ccsmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('test', function(){
	console.log('Congratulations! Gulp is working correctly!');
});

//does nunjucks.
//Nunjucks is the tool that takes the Nunjucks part of our HTML code
//(the partials, modules, and blocks) and compiles them into a single
//HTML document in the 'dist' directory for deployment.
gulp.task('nunjucks', function() {

	console.log('Compiling HTML');

	return gulp.src('app/pages/**/*.html')
	// render template with nunjucks
	.pipe(nunjucksRender({
		path: ['app/templates/','app/templates/partials/'],
		data: { css_path: 'app/templates/style.css'}
	}))
	// output files in 'dist' directory
	.pipe(gulp.dest('dist'))
	//refresh the browser with updated HTML file
	.pipe(browserSync.reload({
		stream: true
	}));


});

//compiles sass, then minify the css files.
//SASS is developer-friendly formatted CSS, unreadable by web browwers.
//gulp-sass takes these files, and creates a single master .css file
//in the 'dist' directory for deployment.
//Additionally, before the .css file is finished, our plugin gulp-cssmin
//minifies the css as well.
gulp.task('styles', function(){

	console.log('Compiling CSS')

	return gulp.src('app/templates/sass/*.scss')
		//compiles sass
		.pipe(sass().on('error', sass.logError))
		//minivfies css
		.pipe(ccsmin())
		//puts .min suffix
		.pipe(rename({suffix:'.min'}))
		//put in directory
		.pipe(gulp.dest('dist'))
		//refresh browser with changes
		.pipe(browserSync.reload({
			stream: true
		}));
});

//default task
gulp.task('default', function(done) {

	//console.log('running default')

	sequence('nunjucks', 'styles', done);
	
});

//watch task
gulp.task('watch', ['default', 'browserSync'], function(){
	gulp.watch('app/templates/**/*.+(scss|html)',['default'],
	['browsersync']);
	gulp.watch('app/pages/**/*.html', ['default'])
});

//browsersync
gulp.task('browserSync', function()	{
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
});
