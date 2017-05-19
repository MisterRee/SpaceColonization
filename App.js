const express = require( 'express' );
const App = express();

const server = require( 'http' ).createServer( App );

App.use( express.static( __dirname + '/dist' ) );

App.get( '/', function( req, res ){
  res.sendFile( __dirname + '/dist/index.html' );
});

server.listen( 3000 );

// This was used solely for local development purposes to avoid CORS errors
