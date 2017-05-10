(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Tree = require('./tree.js');

var cvs = document.querySelector('canvas');
var ctx = cvs.getContext('2d');

function resize() {
  cvs.width = cvs.clientWidth;
  cvs.height = cvs.clientHeight;
};

window.onresize = resize;
resize();

var Colony = new Tree(ctx, 100, { x: cvs.width, y: cvs.height });

var draw = function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  Colony.display();
};

var setup = function setup() {
  Colony.create();
  draw();
};

setup();

},{"./tree.js":3}],2:[function(require,module,exports){
"use strict";

var Leaf = function Leaf(ctx, radius, bounds) {
  this.position = {
    x: Math.random() * bounds.x,
    y: Math.random() * bounds.y };
  this.radius = radius;

  this.display = function () {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  };
};

module.exports = Leaf;

},{}],3:[function(require,module,exports){
'use strict';

var Leaf = require('./leaf.js');

var Tree = function Tree(ctx, max, bounds) {
  this.ctx = ctx;
  this.max = max;
  this.bounds = bounds;
  this.leaves = [];

  this.create = function () {
    for (var i = 0; i < this.max; i++) {
      this.leaves.push(new Leaf(this.ctx, 10, this.bounds));
    };
  };

  this.display = function () {
    for (var i = 0; i < this.max; i++) {
      this.leaves[i].display();
    };
  };
};

module.exports = Tree;

},{"./leaf.js":2}]},{},[1]);
