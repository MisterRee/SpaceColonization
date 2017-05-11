function Branch( parent, position, direction, ctx ){
  this.ctx = ctx;
  this.parent = parent;
  this.position = position;
  this.direction = direction;
  this.originalDir = direction;
  this.count = 0;
  this.length = 10;

  this.next = function(){
    let nextDir = { x: this.direction.x * this.length,
                    y: this.direction.y * this.length };
    let nextPos = { x: this.position.x + nextDir.x,
                    y: this.position.y + nextDir.y };
    let nextBranch = new Branch( this, nextPos, this.direction, this.ctx );
    return nextBranch;
  };

  this.reset = function(){
    this.direction = this.originalDir;
    this.count = 0;
  };

  this.show = function(){
    if( this.parent != null ){
      this.ctx.strokeStyle = "white";
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.position.x,
        this.position.y
      );
      this.ctx.lineTo(
        this.parent.position.x,
        this.parent.position.y
      );
      this.ctx.closePath();
      this.ctx.stroke();
    };
  };
};

module.exports = Branch;
