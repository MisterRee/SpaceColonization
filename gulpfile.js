var gulp = require( 'gulp' ),
    browserify = require( 'browserify' ),
    babelify = require( 'babelify' ),
    source = require( 'vinyl-source-stream' ),
    buffer = require( 'vinyl-buffer' ),
    babel = require( 'gulp-babel' ),
    notify = require( 'gulp-notify' );

gulp.task( 'js', function(){
  browserify({
    entries: './js/index.js'
  })
    .transform( babelify, { presets: [ 'es2015'] } )
    .require( './js/index.js', { entry: true } )
    .bundle()
    .pipe( source( 'bundle.js' ) )
    .pipe( gulp.dest( './dist' ) )
    .pipe( notify({
      message: 'Build Complete',
      onLast: true
    }) )
});

gulp.task( 'default', ['js'] );
