
  const express = require( 'express' );
  const http  = require( 'http' );
  const fs = require( 'fs' );

  const App = express();

App.use( express.static( __dirname + '/dist' ) );

App.get( '/', function( req, res ){
  res.sendFile( __dirname + '/dist/index.html' );
});

App.set( 'port', process.env.PORT || process.env.NODE_PORT || 3000 );

App.listen( App.get( 'port' ) );
// This was used solely for local development purposes to avoid CORS errors
