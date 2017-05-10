const Tree = require( './tree.js' );

const cvs = document.querySelector( 'canvas' );
const ctx = cvs.getContext( '2d' );

function resize(){
  cvs.width = cvs.clientWidth;
  cvs.height = cvs.clientHeight;
};

window.onresize = resize;
resize();

const Colony = new Tree( ctx, 100, { x: cvs.width, y: cvs.height } );

const draw = function(){
  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, cvs.width, cvs.height );
  Colony.display();
};

const setup = function(){
  Colony.create();
  draw();
};

setup();
