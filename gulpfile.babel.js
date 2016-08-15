import gulp from 'gulp';
import { logger } from 'utility-node-log';

import minStyle from 'gulp-clean-css';
import minScript from 'gulp-uglify';
import minHtml from 'gulp-htmlmin';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import inline from 'gulp-inline';

logger.logLevel = 'DEBUG';

let appIndex = [ 'main.html' ];
let appOutput = 'index.html';

gulp.task( 'default', ( ) => {
  return gulp.src( appIndex )
    .pipe( inline( {
      base: './',
      js: minScript,
      css: minStyle,
      disabledTypes: [ 'svg', 'img' ], // Only inline css and js files 
      ignore: [ ]
    } ) )
    .pipe( minHtml( {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true
    }) )
    .pipe( rename( appOutput ) )
    .pipe( gulp.dest( './' ) );
} );
