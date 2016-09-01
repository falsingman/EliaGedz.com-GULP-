// start var
var
gulp = require('gulp'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
sass =  require('gulp-sass'),
concatCss = require('gulp-concat-css'),
watch = require('gulp-watch'),
notify = require('gulp-notify'),
htmlmin = require('gulp-htmlmin'),
imagemin = require('gulp-imagemin');
// end var
// --------------------------------------
// direct
dirs = {
'src': {
      'html': ['./src/*.html'],
      'sass':['src/sass/*.sass'],
      'img':['src/img']
    },
'build': {
      'css':['build/css/*.css'],
      'allmincss':['build/all-css/*.css']
    }
};
// start tast ---------------------------
gulp.task('sass', function(){
    return gulp.src('src/sass/**/*.sass')
    	.pipe(sass())
    	.pipe(gulp.dest('build/sass/'));
});

gulp.task('concat', function(){
   return gulp.src('build/css/*.css')
        .pipe(concatCss('main.css'))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('minify', function(){
    gulp.src('build/css/main.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/all-css'));
});

gulp.task('minifyhtml', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
gulp.watch(dirs.src.html, ['minifyhtml']);
gulp.watch(dirs.src.sass, ['sass']);

});

gulp.task('img', function(){
    gulp.src('build/img/event/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});

gulp.task('default', ['sass','concat','minify','watch','minifyhtml']);
