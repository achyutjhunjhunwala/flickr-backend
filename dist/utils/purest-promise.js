'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _client = require('@request/client');

var _client2 = _interopRequireDefault(_client);

var _purest = require('purest');

var _purest2 = _interopRequireDefault(_purest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _purest2.default)({ request: _client2.default, promise: _bluebird2.default });