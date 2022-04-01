const gulp = require('gulp')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')


function buildJs() {
	return gulp.src('./public/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/dist/js'))
}

function buildCss() {
	return gulp.src('./public/css/*.css')
		.pipe(concat('styles.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('public/dist/css'))
}

function buildImages() {
	return gulp.src('./public/images/*.{png,jpg,svg}')
		.pipe(gulp.dest('./public/dist/images'))
}

exports.build = gulp.parallel(buildCss, buildJs, buildImages)