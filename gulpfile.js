var gulp = require( 'gulp' ),
    notify = require( 'gulp-notify' ),
    rename = require( 'gulp-rename' ),
    uglify = require( 'gulp-uglify' ),

    babel = require( 'babelify' ),
    browserify = require( 'browserify' ),
    del = require( 'del' ),
    buffer = require( 'vinyl-buffer' ),
    source = require( 'vinyl-source-stream' ),

    runSequence = require( 'run-sequence' );

gulp.task( 'clean', function(){
  return del( './dist/bundle.min.js' );
});

gulp.task( 'build', function(){
  return browserify( './js/main.js' )
    .transform( "babelify", { presets: [ "env" ] } )
    .bundle()
    .pipe( source( 'main.js' ) )
    .pipe( buffer() )
    .pipe( uglify() )
    .pipe( rename( 'bundle.min.js' ) )
    .pipe( gulp.dest( './dist' ) )
});

gulp.task( 'route', function( done ){
  runSequence( 'clean', 'build', function(){
    done();
  });
});

gulp.task( 'watch', function(){
  gulp.watch( [ './js/**.js' ], [ 'route' ] );
});

gulp.task( 'default', ['watch'] );
