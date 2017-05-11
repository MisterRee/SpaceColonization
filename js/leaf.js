const Victor = require( 'victor' );

const Leaf = function( cvs, ctx, radius ){
  this.position = new Victor(
    Math.random() * cvs.width,
    Math.random() * cvs.height );
  this.status = false;
  // TODO remove code below after display not needed
  this.radius = radius;
  this.display = function(){
    ctx.beginPath();
    if( status ){
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0, 2 * Math.PI,
      false );
    ctx.closePath();
    ctx.fill();
  };
};

module.exports = Leaf;
