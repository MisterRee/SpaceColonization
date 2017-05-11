const Victor = require( 'victor' );
const Tree = require( './tree.js' );

const cvs = document.querySelector( 'canvas' );
const ctx = cvs.getContext( '2d' );

function resize(){
  cvs.width = cvs.clientWidth;
  cvs.height = cvs.clientHeight;
};

window.onresize = resize;
resize();

// configurables
const maxLeaves = 100;
const minDist = 0.01;
const maxDist = 0.1;

const Colony = new Tree(
  new Victor( cvs.width * 0.5, cvs.height * 0.75 ),
  new Victor( 0, -1 ),
  minDist,
  maxDist,
  cvs,
  ctx,
  maxLeaves );

const draw = function(){
  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, cvs.width, cvs.height );
  Colony.displayLeaves();
  Colony.branchLoop();
  Colony.drawBranches();

};

const setup = function(){
  Colony.createLeaves();
  draw();
};

setup();
