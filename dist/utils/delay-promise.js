"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = t => new Promise(resolve => {
  setTimeout(resolve, t);
});