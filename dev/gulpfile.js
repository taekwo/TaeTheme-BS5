// Gulp Plugins
var
  pref = 'tae-',
  gulp = require('gulp'),
  minify = require('gulp-minifier'),
  concat = require('gulp-concat'),
  reload = require('gulp-livereload'),
  htmlImport = require('gulp-html-import'),
  autoprefixer = require('gulp-autoprefixer'),
  replace = require('gulp-string-replace'),
  rename = require("gulp-rename"),
  clean = require('gulp-clean'),
  zip = require('gulp-zip'),
  tinypng = require('gulp-tinypng-compress');
const sass = require('gulp-sass')(require('sass'));

// Replacing "pref" prefix
gulp.task('replace', function (done) {
  return gulp.src(['assets/scss/**/*.*', 'assets/js/*.js', 'page-builder/*.html', 'libs/**/*.*', '*.html'])
    .pipe(replace('tae-', pref))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
  done();
});

// Rename main SCSS file to match site prefix defined in <pref> var
gulp.task('rename-scss', function () {
  return gulp.src('./assets/scss/tae-main.scss')
    .pipe(rename((pref + 'main.scss')))
    .pipe(gulp.dest('./assets/scss'))
})

// Delete Original SCSS file renamed in previous task
gulp.task('delete-scss', function () {
  return gulp.src('./assets/scss/tae-main.scss', { read: false })
    .pipe(clean());
})

// Delete Original CSS file renamed in previous task
gulp.task('delete-css', function () {
  return gulp.src('../dist/assets/css/tae-main.css', { read: false })
    .pipe(clean({ force: true }));
})

// Rename main JS file to match site prefix defined in <pref> var
gulp.task('rename-js', function () {
  return gulp.src('./assets/js/tae-main.js')
    .pipe(rename((pref + 'main.js')))
    .pipe(gulp.dest('./assets/js'));
})

// Delete Original DIV JS file renamed in previous task
gulp.task('delete-dv-js', function () {
  return gulp.src('./assets/js/tae-main.js', { read: false })
    .pipe(clean());
})

// Delete Original DIST JS file renamed in previous task
gulp.task('delete-ds-js', function () {
  return gulp.src('../dist/assets/js/tae-main.js', { read: false })
    .pipe(clean({ force: true }));
})

// Firing Plugin TinyPNG
gulp.task('tinypng', function () {
  return gulp.src('./assets/imgs/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'SRjGxB4NDv9vfgkN4YnHtwv57d2j7bMs',
      sigFile: './assets/imgs/.tinypng-sigs',
      log: true
    }))
    .pipe(gulp.dest('../dist/assets/imgs'));
});

// Watching any changes in HTML files, import components, 
// move pages to <dist> and reload in browser
gulp.task('html', function () {
  return gulp.src('./*.html')
    .pipe(gulp.dest('../dist/'))
    .pipe(htmlImport('page-builder/'))
    .pipe(gulp.dest('../dist/'))
    .pipe(reload({ start: true }));
})

// Watching any changes in images folder, 
// move images to <dist/imgs> and reload in browser
gulp.task('imgs', function () {
  return gulp.src('./assets/imgs/**')
    .pipe(gulp.dest('../dist/assets/imgs'))
    .pipe(reload({ start: true }));
})

// Compiling & minifying main scss and move compiled minified file to <css> folder
// and reload in browser
gulp.task('sass', function () {
  return gulp.src('assets/scss/*.scss')
    .pipe(sass())
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
    }))
    .pipe(autoprefixer({
      browsersList: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat(pref + 'main.css'))
    .pipe(gulp.dest('../dist/assets/css'))
    .pipe(reload({ start: true }));
})

// Minifying main custom js file and move minified file to <js> folder
gulp.task('scripts', function () {
  return gulp.src('assets/js/*.js')
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
    }))
    .pipe(concat(pref + 'main.js'))
    .pipe(gulp.dest('../dist/assets/js'))
    .pipe(reload({ start: true }));
})

// Compressing 'Dev' folder for backup
gulp.task('zip', function () {
  return gulp.src('./**/**')
    .pipe(zip('bcp-.zip'))
    .pipe(gulp.dest('../../BCP'))
})

// Gulp Default Task
gulp.task('watch', function () {
  require('./server.js');
  reload.listen();
  gulp.watch('./**/*.html', gulp.series('html'));
  gulp.watch('./**/assets/imgs/**', gulp.series('imgs'));
  gulp.watch('assets/scss/**/**/*.scss', gulp.series('sass'));
  gulp.watch('assets/js/**/*.js', gulp.series('scripts'));
})

gulp.task('start', gulp.series('replace', 'rename-scss', 'delete-scss', 'delete-css', 'rename-js', 'delete-dv-js', 'delete-ds-js'))
gulp.task('default', gulp.series('html', 'imgs', 'sass', 'scripts', 'watch'))