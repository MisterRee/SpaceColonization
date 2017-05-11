const Tree = require( './tree.js' );

const cvs = document.querySelector( 'canvas' );
const ctx = cvs.getContext( '2d' );

cvs.width = cvs.clientWidth;
cvs.height = cvs.clientHeight;

let tree;
const maxDist = 100;
const minDist = 10;

const setup = function(){
  tree = new Tree( cvs, ctx, minDist, maxDist );
  draw();
};

const draw = function(){
  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, cvs.width, cvs.height );
  tree.show();
  tree.grow();
  requestAnimationFrame( draw );
};

setup();
