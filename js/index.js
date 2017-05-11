const Tree = require( './tree.js' );
const perlin = require( 'perlin-noise' );

const cvs = document.querySelector( 'canvas' );
const ctx = cvs.getContext( '2d' );

cvs.width = cvs.clientWidth;
cvs.height = cvs.clientHeight;

let tree;
let amount = 0;
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
    amount = 50;
  } else {
    amount = 0;
  }
});

let actx, audio, audioSrc, analyser, frequencyData;

const setup = function(){
  actx = new AudioContext();
  audio = document.getElementById( 'audio' );
  audioSrc = actx.createMediaElementSource( audio );
  analyser = actx.createAnalyser();
  audioSrc.connect( analyser );
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  audio.play();
  tree = new Tree( numLeaf, cvs, ctx, minDist, maxDist, noiseSplit, perlinArray );
  draw();
};

const draw = function(){
  console.log( analyser.getByteFrequencyData( frequencyData ) );
  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, cvs.width, cvs.height );
  tree.movewind( amount );
  tree.show();
  tree.grow();
  requestAnimationFrame( draw );
};

setup();
