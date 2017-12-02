const Tree = require( './tree.js' );
const Leaf = require( './leaf.js' );
const Flow = require( './flow.js' );
const perlin = require( 'perlin-noise' );

const cvs = document.querySelector( 'canvas' );
const ctx = cvs.getContext( '2d' );

cvs.width = cvs.clientWidth;
cvs.height = cvs.clientHeight;

// configurables
const numLeaf = 500;
const numFlows = 125;
const maxDist = 100;
const minDist = 10;
const noiseSplit = 16;

let average = 0;
let trees = [];
let leaves = [];
let flows = [];
let perlinArray = [];
let xvalues = perlin.generatePerlinNoise( noiseSplit, noiseSplit );
let yvalues = perlin.generatePerlinNoise( noiseSplit, noiseSplit );

// audio variables
let actx, req, analyser, jscriptNode, sourceNode, bufferLength, frequencyData;

const setup = function(){
  function setupAudioNodes(){
    jscriptNode = actx.createScriptProcessor( 2048, 1, 1 );
    jscriptNode.connect( actx.destination );

    analyser = actx.createAnalyser();
    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 1024;

    jscriptNode.onaudioprocess = function(){
      let array = new Uint8Array( analyser.frequencyBinCount );
      analyser.getByteFrequencyData( array );
      average = getAverageVolume( array );
    };

    sourceNode = actx.createBufferSource();
    sourceNode.connect( analyser );
    analyser.connect( jscriptNode );
    sourceNode.connect( actx.destination );
  };

  function soundLoad(){
    req = new XMLHttpRequest();

    req.open( 'GET', './wind.mp3' );
    req.responseType = 'arraybuffer';

    req.onload = function(){
      actx.decodeAudioData( req.response, function( buffer ){
        sourceNode.buffer = buffer;
        sourceNode.start( 0 );
        sourceNode.loop = true;
      });
    };

    req.send();
  };

  function getAverageVolume( array ){
    let values = 0;
    let naverage;
    let length = array.length;

    for( let i = 0; i < length; i++ ){
      values += array[ i ];
    };

    naverage = values / length;
    return naverage;
  };

  // populating leaves
  for( let i = 0; i < numLeaf; i++ ){
    leaves.push( new Leaf( cvs, ctx ) );
  };

  // perlin wind setup
  for( let x = 0; x < noiseSplit; x++ ){
    perlinArray[ x ] = [];
    for( let y = 0; y < noiseSplit; y++ ){
      perlinArray[ x ][ y ] = { x: ( xvalues[ x ] - 0.5 ) * 2, y: ( yvalues[ y ] - 0.5 ) * 2 };
    };
  };

  for( let i = 0; i < numFlows; i++ ){
    flows.push( new Flow( cvs, ctx, noiseSplit, perlinArray ) );
  };

  actx = new ( window.AudioContext || window.webkitAudioContext )();
  setupAudioNodes();
  soundLoad();

  // looks a little gross, but just placing the trees at each corner of the canvas
  let start, dir;
  let rand = Math.random() * Math.PI * 2;
  start = { x: cvs.width / 2, y: cvs.height / 2 };
  dir = { x: Math.cos( rand ), y: Math.sin( rand ) };

  trees.push( new Tree( start, dir, leaves, cvs, ctx, minDist, maxDist, noiseSplit, perlinArray ) );

  draw();
};

const draw = function(){
  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, cvs.width, cvs.height );

  for( let i = 0; i < trees.length; i++ ){
    trees[ i ].grow();
  };
  for( let i = 0; i < trees.length; i++ ){
    trees[ i ].movewind( ( average - 50 ) * 10 );
  };
  for( let i = 0; i < trees.length; i++ ){
    trees[ i ].show();
  };

  for( let i = 0; i < flows.length; i++ ){
    flows[ i ].moveWind( average / 100 );
  };
  for( let i = 0; i < flows.length; i++ ){
    flows[ i ].show( average / 100 );
  };

  requestAnimationFrame( draw );
};

// setup controls
document.addEventListener("keydown", function( e ){
  trees = [];
  flows = [];
  xvalues = perlin.generatePerlinNoise( noiseSplit, noiseSplit );
  yvalues = perlin.generatePerlinNoise( noiseSplit, noiseSplit );

  if( e.keyCode === 32 ){
    setup();
  }
});

setup();
