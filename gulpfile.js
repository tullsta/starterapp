var  gulp        = require('gulp'),
        browserSync = require('browser-sync').create(),
        sass        = require('gulp-sass'),
        uglify = require('gulp-uglify'),
        autoprefixer = require('gulp-autoprefixer'),
        imagemin = require('gulp-imagemin'),
        plumber = require('gulp-plumber');

// Static Server + watching scss/html/js files
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: "./"
    }
);
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.js", ['jsUglify']);
    gulp.watch("app/img/*", ['imagemin']);
    gulp.watch("*.html; build/css/*.css").on('change', browserSync.reload);
});

// compile sass into CSS & auto-inject into browser
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
//css autoprefixer
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
            }))
            .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

//uglify JS files & auto-inject into browser
gulp.task('jsUglify', function() {
    gulp.src("app/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

//image compression
gulp.task('imagemin', function() {
    gulp.src("app/img/*")
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.stream());
});

//default task server
gulp.task('default', ['server']);
