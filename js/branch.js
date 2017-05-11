const Victor = require( 'victor' );

function Branch( parent, position, direction, cvs, ctx, num, split, perlin ){
  this.cvs = cvs;
  this.ctx = ctx;
  this.parent = parent;
  this.position = position;
  this.drawPos = position;
  this.direction = direction;
  this.originalDir = direction;
  this.count = 0;
  this.length = 10;
  this.num = num;
  this.split = split;
  this.perlin = perlin;

  this.next = function(){
    let nextDir = { x: this.direction.x * this.length,
                    y: this.direction.y * this.length };
    let nextPos = { x: this.position.x + nextDir.x,
                    y: this.position.y + nextDir.y };
    let nextBranch = new Branch( this, nextPos, this.direction, this.cvs, this.ctx, this.num + 1, this.split, this.perlin );
    return nextBranch;
  };

  this.reset = function(){
    this.direction = this.originalDir;
    this.count = 0;
  };

  this.wind = function( amt ){
    this.drawPos = { x: this.position.x, y: this.position.y };
    let xsplit = Math.abs( Math.floor( this.position.x / this.cvs.width * ( this.split - 1 ) ) );
    let ysplit = Math.abs( Math.floor( this.position.y / this.cvs.height * ( this.split - 1 ) ) );
    this.gridslot = { x: xsplit, y: ysplit };
    
    this.pushDir = new Victor( this.perlin[ this.gridslot.x ][ this.gridslot.y ].x,
                               this.perlin[ this.gridslot.x ][ this.gridslot.y ].y ).normalize();

    let xtest = this.position.x + this.pushDir.x * this.length * amt;
    let ytest = this.position.y + this.pushDir.y * this.length * amt

    if( xtest < 0 || xtest > this.cvs.width || ytest < 0 || ytest > this.cvs.height ){
      this.drawPos = {
        x: this.position.x,
        y: this.position.y
      };
    };

    this.drawPos = {
      x: this.position.x + this.pushDir.x * this.length * amt,
      y: this.position.y + this.pushDir.y * this.length * amt,
    }
  };

  this.show = function(){
    if( this.parent != null ){
      this.ctx.strokeStyle = "white";
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.drawPos.x,
        this.drawPos.y
      );
      this.ctx.lineTo(
        this.parent.drawPos.x,
        this.parent.drawPos.y
      );
      this.ctx.closePath();
      this.ctx.stroke();
    };
  };
};

module.exports = Branch;
