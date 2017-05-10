const Leaf = require( './leaf.js' );

const Tree = function( ctx, max, bounds ){
  this.ctx = ctx;
  this.max = max;
  this.bounds = bounds;
  this.leaves = [];

  this.create = function(){
    for( let i = 0; i < this.max; i++ ){
      this.leaves.push( new Leaf( this.ctx, 10, this.bounds ) );
    };
  };

  this.display = function(){
    for( let i = 0; i < this.max; i++ ){
      this.leaves[ i ].display();
    };
  };
};

module.exports = Tree;
