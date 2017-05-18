const Victor = require( 'victor' );

const Flow = function( cvs, ctx, split, map ){
  this.cvs = cvs;
  this.ctx = ctx;
  this.split = split;
  this.map = map;
  this.position = { x: Math.random() * this.cvs.width, y: Math.random() * this.cvs.height };

  this.moveWind = function( amt ){
    let xsplit = Math.abs( Math.floor( this.position.x / this.cvs.width * ( this.split - 1 ) ) );
    let ysplit = Math.abs( Math.floor( this.position.y / this.cvs.height * ( this.split - 1 ) ) );
    this.gridslot = { x: xsplit, y: ysplit };
    this.pushDir = new Victor( this.map[ this.gridslot.x ][ this.gridslot.y ].x,
                               this.map[ this.gridslot.x ][ this.gridslot.y ].y ).normalize();

    let xtest = this.position.x + this.pushDir.x * amt;
    let ytest = this.position.y + this.pushDir.y * amt;

    if( xtest < 0 ||
        xtest > this.cvs.width ||
        ytest < 0 ||
        ytest > this.cvs.height ){
      this.position = { x: Math.random() * this.cvs.width, y: Math.random() * this.cvs.height };
      return;
    };

    this.position = { x: xtest, y: ytest };
  };

  this.color = { r:0, g:0, b:0 };
  this.color.r = gencolor();
  this.color.g = gencolor();
  this.color.b = gencolor();

  this.show = function( amt ){
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba( "+ this.color.r +","+ this.color.g +","+ this.color.b +","+ amt +")";
    this.ctx.arc(
      this.position.x,
      this.position.y,
      5,
      0, Math.PI * 2 );
    this.ctx.fill();
  };
};

module.exports = Flow;

function genpos( cvs ){
  let width = cvs.width;
  let height = cvs.height;

  let sum = width * 2 + height * 2;
  let pos = Math.random() * sum;
  let npos;

  if( pos < width ){
    npos = { x: pos, y: 0 };
  } else if ( pos > width && pos < width + height ){
    npos = { x: width, y: pos - width };
  } else if ( pos > width + height && pos < width * 2 + height ){
    npos = { x: pos - ( width + height ), y: height };
  } else {
    npos = { x: 0, y: pos - ( width * 2 + height ) };
  };

  if( isNaN( npos.x ) || isNaN( npos.y ) ){
    genpos( cvs );
  };

  return npos;
};

function gencolor(){
  return Math.round( Math.random() * 255 );
};
