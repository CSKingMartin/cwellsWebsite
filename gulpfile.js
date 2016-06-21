//cwells 6.2016
var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass')
var sequence = require('run-sequence');
var browserSync = require('browser-sync');
var ccsmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var data = require('gulp-data');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rimraf = require('gulp-rimraf');
var ignore = require('gulp-ignore');


gulp.task('test', function(){
	console.log('Congratulations! Gulp is working correctly!');
});

var manageEnvironment = function(environment) {
	
	environment.addFilter('getArticle', function(id) {
		return '{% include articles[' + id + '].content ignore missing %}';
	});
	 
	environment.addGlobal('globalTitle', 'My global title')	
	}

//compiles to html
gulp.task('nunjucks', function() {

	/*Nunjucks is the tool that takes the Nunjucks part of our HTML code
	(the partials, modules, and blocks) and compiles them into a single
 	HTML document in the 'dist' directory for deployment. */


	return gulp.src('src/pages/**/*.html')
		.pipe(data(function() {
			return require('./data.json')
		}))
		// render template with nunjucks
		.pipe(nunjucksRender({
			path: ['src/templates/','src/templates/partials/', 'src/articles/'],
			manageEnv: manageEnvironment
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

//uglify and lint js
gulp.task('java', function(){
	gulp.src('./src/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'));
});


//moves images and articles
gulp.task('moveImages', function() {

	gulp.src('./src/images/**/*.*')
	.pipe(gulp.dest('dist/images'));
});

gulp.task('moveArticles', function() {
	gulp.src('./src/articles/**/*')
	.pipe(gulp.dest('dist/articles'));
});

// gulp.task('renderArticles', function() {
// 	return gulp.src('./src/articles/*')
// 	.pipe(data(function() {
// 			return require('./data.json')
// 		}))
// 	.pipe(nunjucksRender({
// 		path: ['src/articles/']
// 	}))
// 	.pipe(gulp.dest('dist/articles'))
// });



gulp.task('clean', function() {
	return gulp.src('./dist/*', {read: false})
	.pipe(ignore('./dist/.git'))
	.pipe(rimraf());
});


//default task
gulp.task('default', function(done) {
	//default task compiles for dev
	sequence('nunjucks', 'styles', 'java', 'moveImages', 'moveArticles', done);
});

gulp.task('build', function(done) {
	//default task compiles for dev
	sequence('clean', 'default', done);
});

//watch task
gulp.task('watch', ['default', 'browserSync'], function(){
	gulp.watch('src/templates/**/*.html',['default']);
	gulp.watch('src/pages/**/*.html', ['default']);
	gulp.watch('src/stylesheets/**/*.+(scss|css)', ['default']);
	gulp.watch('./data.json', ['default']);
	gulp.watch('src/articles/**/*.html',['default']);
	gulp.watch('src/js/**/*.js', ['default']);
});

//browserSync
gulp.task('browserSync', function()	{
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
});


