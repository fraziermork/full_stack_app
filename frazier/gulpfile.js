'use strict';
const gulp    = require('gulp');
const eslint  = require('gulp-eslint');

//MODULES FOR BACKEND TESTING
const mocha   = require('gulp-mocha');

//MODULES FOR REBUILD
const webpack = require('webpack-stream');
const del     = require('del');

//MODULES FOR FRONT END TESTING
// const protractor = require('gulp-protractor');



// let lintPaths = [__dirname + '/lib/*.js', __dirname + '/test/*.js', __dirname + '/server.js', __dirname + '/server.js', __dirname + '/server.js', __dirname + '/server.js', __dirname + '/server.js'];

//https://gist.github.com/justinmc/9149719
let paths = {  
  'frontend': [__dirname + '/app/*.js', __dirname + '/app/controllers/*.js', __dirname + '/app/services/*.js', __dirname + '/app/directives/*.js'],
  'backend': [__dirname + '/server.js', __dirname + '/lib/*.js', __dirname + '/test/*.js', __dirname + '/routes/*.js', __dirname + '/models/*.js'],
  'html': [__dirname + '/app/views/*.html'],
  'css': [__dirname + '/app/css/*.css']
};





//__________________________________________________________________
//RUN ESLINT
//__________________________________________________________________
gulp.task('eslint', () => {
  gulp.src(paths.frontend.concat(paths.backend))
  .pipe(eslint())
  .pipe(eslint.format());
});






//__________________________________________________________________
//RUN TESTS
//__________________________________________________________________
//TODO: write E2E tests using protractor and selenium
//TODO: write unit tests using karma, jasmine, angular-mocks
gulp.task('test:api', () => { //TESTS THE BACKEND
  return gulp.src(__dirname + '/test/backend/api/*.js')
  .pipe(mocha());
});
// gulp.task('test:unit', () => {
//   return gulp.src(__dirname + '/test/frontend/unit/*.js')
//   .pipe();
// });
// gulp.task('test:e2e', () => {
//   return gulp.src(__dirname + '/test/frontend/e2e/*.js')
//   .pipe();
// });
gulp.task('test', ['test:api'], () => { //'test:unit', 'test:e2e'
  console.log('__________________________________________________________________');
  console.log('TESTING');
  console.log('__________________________________________________________________');
});






//__________________________________________________________________
//REBUILD TEST FILES FOR E2E AND UNIT TESTS
//__________________________________________________________________
gulp.task('build:clear-test', () => {
  return del([__dirname + '/test/frontend/bundles/*']);
});
gulp.task('build:unit-tests', () => {
  return gulp.src(__dirname + '/test/frontend/unit/*_spec.js')
    .pipe(webpack({ output: { filename: 'unit_bundle.js' } }))
    .pipe(gulp.dest(__dirname + '/test/bundles'));
});
gulp.task('build:e2e-tests', () => {
  return gulp.src(__dirname + '/test/frontend/e2e/*_spec.js')
    .pipe(webpack({ output: { filename: 'e2e_bundle.js' } }))
    .pipe(gulp.dest(__dirname + '/test/bundles'));
});
gulp.task('rebuild:tests', ['build:clear-test', 'build:unit-tests', 'build:e2e-tests'], () => {
  console.log('__________________________________________________________________');
  console.log('BUILD TESTS');
  console.log('__________________________________________________________________');
});
gulp.task('watch:tests', () => {
  gulp.watch( [__dirname + '/test/frontend/e2e/*_spec.js', __dirname + '/test/frontend/unit/*_spec.js'], ['rebuild:tests']);
});






//__________________________________________________________________
//REBUILD APP FRONTEND ON FILE CHANGES
//__________________________________________________________________
gulp.task('build:clear-app', () => { //empty the build directory
  return del([__dirname + '/build/*']);
});
gulp.task('build:html', () => { //copy the index.html file over
  return gulp.src(paths.html)
    .pipe(gulp.dest(__dirname + '/build'));
});
gulp.task('build:css', () => { //copy the index.html file over
  return gulp.src(paths.css)
    .pipe(gulp.dest(__dirname + '/build'));
});
gulp.task('build:js', () => { //copy over the js and css files
  return gulp.src(__dirname + '/app/entry.js')
    .pipe(webpack(require(__dirname + '/webpack.config.js')))
    .pipe(gulp.dest(__dirname + '/build/'));
});
gulp.task('rebuild:app', ['build:clear-app', 'build:html', 'build:css', 'build:js'], () => { //clears the build directory and repopulates it
  console.log('__________________________________________________________________');
  console.log('REBUILT');
  console.log('__________________________________________________________________');
});
gulp.task('watch-app', () => { //watches for file changes and rebuilds the build directory
  gulp.watch(paths.frontend.concat(paths.html), ['rebuild:app']);
});
