'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_winston2.default.emitErrs = true;

const logger = new _winston2.default.Logger({
  transports: [new _winston2.default.transports.Console({
    name: 'CONSOLE_LOGS',
    handleExceptions: true,
    json: false,
    colorize: false,
    timestamp: true
  }), new _winston2.default.transports.File({
    name: 'INFO_LOGS',
    filename: 'combined.log',
    level: 'info',
    json: true,
    colorize: true,
    timestamp: true
  })],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message.trim());
  }
};

exports.default = logger;