// Purpose of a gulpfile is to describe 'tasks' that convert from 'deeloper mode' to production mode. Things like converting Sass => CSS, removing comments, mergin files, etc.

//Step 1: import gulp
let gulp = require('gulp');
let sass = require('gulp-sass'); //another plug in that needs to be installed, to gulp sass.
let browser = require('gulp-browser');

//Step 2: create default tasks
gulp.task('default', ['html',
'css',
'js']);

//Step 3: create subtasks
gulp.task('html', function (){ //when someone types 'gulp html' run this function
  // Copy index.html into the public/directory.
  return gulp.src('index.html')
  .pipe(gulp.dest('public/'));
})

gulp.task('css', function(){
  //Convert main.scss to main.css
  //Copy to public/
  return gulp.src('scss/main.scss')
    .pipe(sass()) //requires gulp-sass
    .pipe(gulp.dest('public/'));
})

gulp.task('js', function(){
  //Copy js file into public/
  return gulp.src('js/app.js')
  .pipe(browser.browserify())
  .pipe(gulp.dest('public/'));
})

gulp.task('watch', ['default'], function(){
  gulp.watch('js/*/*.js', ['js']);
  gulp.watch('scss/*.scss', ['css']);
  gulp.watch('*.html', ['html']);
})
