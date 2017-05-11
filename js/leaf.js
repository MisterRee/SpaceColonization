
const Leaf = function( cvs, ctx ){
  this.position = { x: Math.random() * cvs.width,
                    y: Math.random() * cvs.height };
  this.status = false;
  this.ctx = ctx;

  this.show = function(){
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(
      this.position.x,
      this.position.y,
      2,
      0, Math.PI * 2 );
    this.ctx.fill();
  };
};

module.exports = Leaf;
