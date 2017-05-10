
const Leaf = function( ctx, radius, bounds ){
  this.position = {
    x: Math.random() * bounds.x,
    y: Math.random() * bounds.y };
  this.radius = radius;

  this.display = function(){
    ctx.beginPath();
    ctx.fillStyle = "white";
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
