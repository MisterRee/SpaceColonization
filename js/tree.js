const Victor = require( 'victor' );
const Branch = require( './branch.js' );

const Tree = function( start, dir, leaves, cvs, ctx, min, max, split, perlin){
  this.branches = [];
  this.leaves = leaves;

  this.cvs = cvs;
  this.ctx = ctx;

  // Thresholds for leaf distance scans; active scans only occur between these two values
  this.min = min;
  this.max = max;

  this.split = split;
  this.perlin = perlin;

  // root refers to the first branch to start the process
  this.position = start;
  this.direction = dir;
  this.root = new Branch( null, this.position, this.direction, this.cvs, this.ctx, 1, this.split, this.perlin );
  this.branches.push( this.root );

  // cycling end of current branch
  this.current = this.root;

  // status boolean, which describes the branch finding a suitable leaf to colonize
  this.found = false;

  while( !this.found ){
    for( let i = 0; i < this.leaves.length; i++ ){
      let d = new Victor( this.current.position.x, this.current.position.y ).distance( new Victor( this.leaves[ i ].position.x, this.leaves[ i ].position.y ) );
      if( d < max ){
        this.found = true;
      }

      if( !this.found ){
        let branch = this.current.next();
        this.current = branch;
        this.branches.push( this.current );
      };
    };
  };

  this.movewind = function( amt ){
    for( let i = 0; i < this.branches.length; i++ ){
      let total = this.branches[ i ].num / this.branches.length * amt;
      this.branches[ i ].wind( total );
    };
  };

  this.grow = function(){
    for( let i = 0; i < this.leaves.length; i++ ){
      let leaf = this.leaves[ i ];
      let closestBranch = null;
      let record = 100000; // just serving as some abritary large number

      for( let o = 0; o < this.branches.length; o++ ){
        let branch = this.branches[ o ];
        let d = new Victor( leaf.position.x, leaf.position.y ).distance( new Victor( branch.position.x, branch.position.y ) );
        if( d < this.min ){
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if ( d > this.max ){

        } else if ( closestBranch === null || d < record ){
          closestBranch = branch;
          record = d;
        };
      };

      if( closestBranch != null ){
        let newDir = new Victor( leaf.position.x - closestBranch.position.x, leaf.position.y - closestBranch.position.y ).normalize();
        closestBranch.direction = {
          x: closestBranch.direction.x + newDir.x,
          y: closestBranch.direction.y + newDir.y,
        };
        closestBranch.count++;
      };
    };

    for( let i = this.leaves.length - 1; i >= 0; i-- ){
      if( this.leaves[ i ].reached ){
        this.leaves.splice( i, 1 );
      };
    };

    for( let i = this.branches.length - 1; i >= 0; i-- ){
      let branch = this.branches[ i ];
      if( branch.count > 0 ){
        branch.direction = {
          x: branch.direction.x / ( branch.count + 1 ),
          y: branch.direction.y / ( branch.count + 1 ),
        };
        this.branches.push( branch.next() );
      };
      branch.reset();
    };
  };

  this.show = function(){
    for( let i = 0; i < this.leaves.length; i++ ){
      this.leaves[ i ].show();
    };

    for( let i = 0; i < this.branches.length; i++ ){
      this.branches[ i ].show();
    };
  };
};

module.exports = Tree;
