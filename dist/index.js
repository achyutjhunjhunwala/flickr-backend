'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _grantExpress = require('grant-express');

var _grantExpress2 = _interopRequireDefault(_grantExpress);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _constants = require('./constants');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App Express


// Constants
const app = exports.app = (0, _express2.default)();

// Configuration

app.use((0, _expressSession2.default)({ secret: _constants.FLICKR_CONSUMER_SECRET }));
app.use(new _grantExpress2.default(_config2.default));

_logger2.default.info('Overriding Express logger');
app.use((0, _morgan2.default)('combined', { stream: _logger2.default.stream }));

// Connect all our routes to our application
app.use('/', _routes2.default);

const port = process.env.PORT || _constants.APPLICATION_PORT;

app.listen(port, () => {
  _logger2.default.info(`Express server listening on port ${port}`);
  _logger2.default.info('-> TheUiGuy - Insane Mode On');
  _logger2.default.info(`First of all, you must validate the application opening: http://127.0.0.1:${port}/`);
});