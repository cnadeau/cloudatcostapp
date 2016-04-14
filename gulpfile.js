'use strict';

var gulp = require('gulp');
var bower = require('bower');
var bowerFiles = require('main-bower-files');
var sh = require('shelljs');

var loadPlugins = require('gulp-load-plugins')({
  DEBUG: false,
  lazy: true
});

var paths = {
  sass: ['./scss/**/*.scss']
};

// Default task that will ensure sass is called and inject all generated files + bower dependencies into index.html
gulp.task('default', ['inject']);

// inject js files into index.html
gulp.task('inject', ['sass'], function() {
  return gulp.src('www/index.html')
    .pipe(loadPlugins.inject(gulp.src(bowerFiles({
      paths: {
        bowerrc: './.bowerrc',
        bowerJson: './bower.json'
      }
    }), {
      read: false
    }), {
      name: 'bower',
      relative: true
    }))
    // Inject static libs before angular source files
    .pipe(loadPlugins.inject(gulp.src(['www/js/lib/*.js'])
      // ensure angular files order (if any)
      .pipe(loadPlugins.angularFilesort())
      .on('error', function(e) {
        // Log the error
        loadPlugins.util.log(e);
        // call end() on pipe to continue without breaking the gulp flow
        this.end();
      }), {
        name: 'static-libs',
        relative: true
      }))
    .pipe(loadPlugins.inject(gulp.src(['!www/js/lib/*.js', 'www/js/**/*.js'])
      .pipe(loadPlugins.angularFilesort())
      .on('error', function(e) {
        // Log the error
        loadPlugins.util.log(e);
        // call end() on pipe to continue without breaking the gulp flow
        this.end();
      }), {
        relative: true
      }))
    .pipe(loadPlugins.inject(gulp.src(['www/css/**/*.min.css', 'www/css/style.css']), {
      relative: true
    }))
    .pipe(gulp.dest('www'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/*.scss')
    .pipe(loadPlugins.sass().on('error', loadPlugins.sass.logError))
    .pipe(loadPlugins.concat('app.style.css'))
    .pipe(gulp.dest('./www/css/'))
    .pipe(loadPlugins.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(loadPlugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      loadPlugins.util.log('bower', loadPlugins.util.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + loadPlugins.util.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', loadPlugins.util.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + loadPlugins.util.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
