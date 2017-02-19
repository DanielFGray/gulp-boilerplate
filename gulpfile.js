const babelify = require('babelify');
const browserify = require('browserify');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const nested = require('postcss-nested');
const postcss = require('gulp-postcss');
const pump = require('pump');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');
const through2 = require('through2');
const uglify = require('gulp-uglify');

/* eslint-disable comma-dangle */

const log = (...args) => {
  if (args.filter(e => e).length > 0) {
    console.log(...args); // eslint-disable-line no-console
  }
};

gulp.task('clean', () =>
  del(['dist/*'])
);

gulp.task('lint', ['lint:js', 'lint:css']);

gulp.task('lint:js', () =>
  gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('lint:css', () =>
  gulp.src('src/**/*.css')
    .pipe(plumber())
    .pipe(stylelint({
      reporters: [{
        formatter: 'string',
        console: true,
      }]
    }))
);

gulp.task('build:css', () =>
  pump([
    gulp.src('src/**/*.css'),
    concat('bundle.css'),
    postcss([nested(), cssnext()]),
    gulp.dest('dist'),
    rename({ suffix: '.min' }),
    postcss([cssnano()]),
    sourcemaps.write('.', { includeContent: false }),
    gulp.dest('dist'),
  ], log)
);

gulp.task('build:js', () =>
  pump([
    gulp.src('src/**/*.js'),
    sourcemaps.init({ loadMaps: true }),
    through2.obj((file, enc, next) => {
      browserify(file.path)
        .transform(babelify)
        .bundle((err, res) => {
          if (err) return next(err);
          file.contents = res; // eslint-disable-line no-param-reassign
          return next(null, file);
        });
    }),
    rename('bundle.js'),
    gulp.dest('dist'),
    rename({ suffix: '.min' }),
    uglify(),
    sourcemaps.write('.', { includeContent: false }),
    gulp.dest('dist'),
  ], log)
);

gulp.task('build', ['build:js', 'build:css']);

gulp.task('default', ['clean'], () =>
  gulp.start('build')
);
