const Tree = require( './tree.js' );
const perlin = require( 'perlin-noise' );

const cvs = document.querySelector( 'canvas' );
const ctx = cvs.getContext( '2d' );

cvs.width = cvs.clientWidth;
cvs.height = cvs.clientHeight;

let tree;
let amount = 100;
const maxDist = 100;
const minDist = 10;
const numLeaf = 1000;
const noiseSplit = 16;

let xvalues = perlin.generatePerlinNoise( noiseSplit, noiseSplit );
let yvalues = perlin.generatePerlinNoise( noiseSplit, noiseSplit );
let perlinArray = [];

for( let x = 0; x < noiseSplit; x++ ){
  perlinArray[ x ] = [];
  for( let y = 0; y < noiseSplit; y++ ){
    perlinArray[ x ][ y ] = { x: ( xvalues[ x ] - 0.5 ) * 2, y: ( yvalues[ y ] - 0.5 ) * 2 };
  }
}

document.addEventListener("keydown", function( e ){
  console.log( e.keycode );
  if( e.keyCode === 32 ){
    setup();
  }
});

cvs.addEventListener("click", function( e ){
  if( amount === 0 ){
    amount = 100;
  } else {
    amount = 0;
  }
});

let actx, req, analyser, jscriptNode, sourceNode, bufferLength, frequencyData;
let average = 0;

const setup = function(){
  actx = new ( window.AudioContext || window.webkitAudioContext )();
  setupAudioNodes();
  soundLoad();
  tree = new Tree( numLeaf, cvs, ctx, minDist, maxDist, noiseSplit, perlinArray );
  draw();
};

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

const draw = function(){
  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, cvs.width, cvs.height );

  console.log(average );
  tree.movewind( average - 50 );
  tree.show();
  tree.grow();
  requestAnimationFrame( draw );
};

setup();
