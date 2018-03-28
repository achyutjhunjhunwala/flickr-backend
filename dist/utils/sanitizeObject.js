"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Parses the JSON and remove key, if `undefined`
 *
 * @param  {object} obj
 *
 * @return {object} The parsed JSON
 */
exports.default = obj => JSON.parse(JSON.stringify(obj));