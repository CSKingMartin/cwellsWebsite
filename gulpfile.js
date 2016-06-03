//cwells 6.2016
var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass')
var sequence = require('run-sequence');
var browserSync = require('browser-sync');
var ccsmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('test', function(){
	console.log('Congratulations! Gulp is working correctly!');
});


//compiles to html
gulp.task('nunjucks', function() {

	/*Nunjucks is the tool that takes the Nunjucks part of our HTML code
	(the partials, modules, and blocks) and compiles them into a single
 	HTML document in the 'dist' directory for deployment. */

	console.log('Compiling HTML');

	return gulp.src('src/pages/**/*.html')
	// render template with nunjucks
	.pipe(nunjucksRender({
		path: ['src/templates/','src/templates/partials/'],
	}))
	// output files in 'dist' directory
	.pipe(gulp.dest('dist'))
	//refresh the browser with updated HTML file
	.pipe(browserSync.reload({
		stream: true
	}));
});

//compiles to css/minify
gulp.task('styles', function(){

	/*SASS is developer-friendly formatted CSS, unreadable by web browwers.
	gulp-sass takes these files, and creates a single master .css file
	in the 'dist' directory for deployment.
	Additionally, before the .css file is finished, our plugin gulp-cssmin
	minifies the css as well. */

	console.log('Compiling CSS')

	return gulp.src('src/stylesheets/*.scss')
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
	//default task compiles for dev
	sequence('nunjucks', 'styles', done);
});

//watch task
gulp.task('watch', ['default', 'browserSync'], function(){
	gulp.watch('src/templates/**/*.html',['default'],
	['browserSync']);
	gulp.watch('src/pages/**/*.html', ['default']);
	gulp.watch('src/stylesheets/**/*.+(scss|css)', ['default']);
});

//browserSync
gulp.task('browserSync', function()	{
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
});

