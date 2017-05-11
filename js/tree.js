const Victor = require( 'victor' );
const Leaf = require( './leaf.js' );
const Branch = require( './branch.js' );

const Tree = function( startPosition, startDirection, minRatio, maxRatio, cvs, ctx, leafCount ){
  this.cvs = cvs;
  this.ctx = ctx;
  this.maxLeaves = leafCount;
  this.leaves = [];
  this.branches = [];
  this.root = new Branch( new Victor( this.cvs.width / 2, this.cvs.height), startPosition, startDirection );
  this.branches.push( this.root );
  this.minRatio = minRatio;
  this.maxRatio = maxRatio;
  this.dimension = dim( cvs );

  this.createLeaves = function(){
    for( let i = 0; i < this.maxLeaves; i++ ){
      this.leaves.push( new Leaf( this.cvs, this.ctx, 10 ) );
    };
  };

  this.branchLoop = function(){
    const minDist = this.dimension * this.minRatio;
    const maxDist = this.dimension * this.maxRatio;

    for( let i = 0; i < this.branches.length; i++ ){
      const c = this.branches[ i ];
      let leafList = [];

      for( let o = 0; o < this.leaves.length; o++ ){
        let d = c.position.distance( this.leaves[ o ].position );
        if( d <= maxDist && d >= minDist ){
          leafList.push( o );
        };
      };

      if( leafList.length === 0 ){
        continue;
      };

      let closest = 0;
      let closestDist = maxDist;
      let newForce = new Victor( c.position.x, c.position.y );
      for( let p = 0; p < leafList.length; p++ ){
        this.ctx.beginPath();
        this.ctx.strokeStyle = "yellow";
        this.ctx.moveTo( this.leaves[ leafList[ p ] ].position.x, this.leaves[ leafList[ p ] ].position.y );
        this.ctx.lineTo( this.branches[ i ].position.x, this.branches[ i ].position.y );
        this.ctx.stroke();

        let d = new Victor( c.position.x, c.position.y ).distance( this.leaves[ leafList[ p ] ].position );
        let newDir = new Victor( this.leaves[ leafList[ p ] ].position.x, this.leaves[ leafList[ p ] ].position.y ).subtract( c.position ).normalize();
        let newMag = ( d - minDist ) / ( maxDist - minDist );
        newDir = new Victor( newDir.x * newMag, newDir.y * newMag );
        newForce = new Victor( newForce.x + newDir.x, newForce.y + newForce.y );

        if( d < closestDist ){
          closest = p;
          closestDist = d;
        };
      };

      this.leaves[ leafList[ closest ] ].status = true;
      let normalized = newForce.normalize();
      newForce = new Victor( normalized.x * maxDist, normalized.y * maxDist );

      /*
      this.ctx.beginPath();
      this.ctx.strokeStyle = "red";
      this.ctx.moveTo( c.position.x, c.position.y );
      this.ctx.lineTo( c.position.x + newForce.x, c.position.y + newForce.y );
      this.ctx.stroke();
      */
      let newPos = new Victor( c.position.x + newForce.x, c.position.y + newForce.y );
      c.position.add( newForce );
      const newBranch = new Branch( c.position, newPos, normalized );
      this.branches.push( newBranch );
    };
  };

  this.drawBranches = function(){
    for( let i = 0; i < this.branches.length; i++ ){
      let b = this.branches[ i ];
      console.log( b );
      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.moveTo( b.position.x, b.position.y );
      this.ctx.lineTo( b.parent.x, b.parent.y );
      this.ctx.stroke();
    };
  };

  this.displayLeaves = function(){
    for( let i = 0; i < this.maxLeaves; i++ ){
      this.leaves[ i ].display();
    };
  };
};

module.exports = Tree;

const dim = function( ctx ){
  if( ctx.width > ctx.height ){
    return ctx.width;
  } else {
    return ctx.height;
  };
};


/*
const Tree = function( ctx, max, bounds, minRatio, maxRatio ){
  this.ctx = ctx;
  this.max = max;
  this.bounds = bounds;
  this.minRatio = minRatio;
  this.maxRatio = maxRatio;
  this.leaves = [];
  this.branches = [];
  this.dimension = dim( ctx );

  this.createLeaves = function(){
    for( let i = 0; i < this.max; i++ ){
      this.leaves.push( new Leaf( this.ctx, 10, this.bounds ) );
    };
  };

  this.growTree = function(){
    let startPosition = { x: this.ctx.width / 2, y: this.ctx.height / 2 };
    let startDirection = { x: 0, y: -1 };
    let root = new Branch( null, startPosition, startDirection );

    this.branches.push( root );

    let found = false;

    while( !found ){
      for( let i = 0; i < leaves.length; i++ ){
        let found = false;
        let dist = Math.dist( root.position, leaves[ i ].position );
        if ( dist < 100 ){
          found = true;
        };

        if( !found ){
          let branch = current.next();
          current
        };
      };
    };
  };

  this.display = function(){
    for( let i = 0; i < this.max; i++ ){
      this.leaves[ i ].display();
    };
  };
};

Math.dist = function( va, vb ){
  return Math.sqrt( Math.pow( va.x - vb.x, 2 ) + Math.pow( va.y - vb.y, 2 ) );
};

this.nextBranch = function( index, list ){
  const c = this.branches[ index ];
  let newForce = this.branches[ index ].direction;
  let minDist = this.dimension;
  let closest = 0;

  if( list.length === 0 ){
    return;
  }

  for( let i = list.length - 1; i >= 0; i-- ){
    let d = c.position.distance( this.leaves[ list[ i ] ].position );
    let newDir = this.leaves[ list[ i ] ].position.subtract( c.position ).normalize();
    let newMag = ( this.maxDist - this.minDist )( d - this.minDist ) / ( this.maxDist - this.minDist );
    let force = newDir.multiply( new Victor( newMag, newMag ) );
    newForce = newForce.add( force );

    if( d < minDist ){
      minDist = d;
      closest = i;
    };
  };

  this.leaves.splice( closest, 1 );

  let normalized = newForce.normalize();
  // newForce = normalized * someValue
  const newBranch = new Branch( c.position, c.position.add( newForce ), normalized );
  this.branches.push( newBranch );
  nextBranch( index++, list );
};

*/
