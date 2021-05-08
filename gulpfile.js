const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require( 'gulp-rm' )
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => {
    return src( 'docs/**/*', { read: false }).pipe(rm());
});

task('copy:html', () => {
    return src("./*.html").pipe(dest('docs')).pipe(reload({stream: true}));
});

task('copy:image', () => {
    return src("img/**/*.png").pipe(dest('docs/images/')).pipe(reload({stream: true}));
});

const allStyles = [
    'node_modules/normalize.css/normalize.css',
    'scss/main.scss'
];

task('styles', () => {
    return src(allStyles)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        //.pipe(px2rem())
        .pipe(gulpif(env === 'prod', autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('docs/css/'))
        .pipe(reload({stream: true}));
});

task('icons', () => {
    return src('img/**/*.svg')
      .pipe(svgo({
        plugins: [
          {
            removeAttrs: {
              attrs: '(fill|stroke|style|width|height|data.*)'
            }
          }
        ]
      }))
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg'
          }
        }
      }))
      .pipe(dest('docs/images/icons'));
   });

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bxslider-ncl/dist/jquery.bxslider.js',
    'node_modules/mobile-detect/mobile-detect.js',
    './JS/*.js'
];

task('scripts', () => {
    return src(libs)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('docs/js/'))
        .pipe(reload({stream: true}));

});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./docs"
        },
        open: false
    });
});


task("watch", () => {
    watch('./scss/**/*.scss', series('styles'));
    watch('./JS/*.js', series('scripts'));
    watch('./*.html', series('copy:html'));
    watch('./img/**/*.svg', series('icons'));
});

task(
    'default',
    series('clean',
        parallel('copy:html', 'copy:image', 'styles', 'scripts', 'icons'),
        parallel('watch', 'server')
    )
);

task(
    'build',
    series('clean', parallel('copy:html', 'copy:image', 'styles', 'scripts', 'icons'))
);