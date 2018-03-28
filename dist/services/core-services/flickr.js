'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doCall = exports.getMethodInfo = exports.getMethods = exports.testLogin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _providers = require('@purest/providers');

var _providers2 = _interopRequireDefault(_providers);

var _purestPromise = require('../../utils/purest-promise');

var _purestPromise2 = _interopRequireDefault(_purestPromise);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const flickr = (0, _purestPromise2.default)({
  provider: 'flickr',
  config: _providers2.default,
  key: _constants.FLICKR_CONSUMER_KEY,
  secret: _constants.FLICKR_CONSUMER_SECRET
});

const testLogin = async connectionData => {
  const loginCheck = await flickr.get().qs({
    method: 'flickr.test.login',
    api_key: _constants.FLICKR_CONSUMER_KEY
  }).auth(connectionData.access_token, connectionData.access_secret).request().then(([res, body]) => body).catch(err => {
    _logger2.default.info(err);
    return err;
  });

  return loginCheck;
};

const getMethods = async connectionData => {
  const flickrMethods = await flickr.get().qs({
    method: 'flickr.reflection.getMethods',
    api_key: _constants.FLICKR_CONSUMER_KEY
  }).auth(connectionData.access_token, connectionData.access_secret).request().then(([res, body]) => body).catch(err => {
    _logger2.default.info(err);
    return err;
  });

  return flickrMethods;
};

const getMethodInfo = async (connectionData, methodName) => {
  const methodInfo = await flickr.get().qs({
    method: 'flickr.reflection.getMethodInfo',
    api_key: _constants.FLICKR_CONSUMER_KEY,
    method_name: methodName
  }).auth(connectionData.access_token, connectionData.access_secret).request().then(([res, body]) => body).catch(err => {
    console.log(err);
    return err;
  });

  return methodInfo;
};

const doCall = (connectionData, method) => (req, res) => {
  flickr.get().qs(_extends({
    method,
    api_key: _constants.FLICKR_CONSUMER_KEY
  }, req.query)).auth(connectionData.access_token, connectionData.access_secret).request().then(([responseOfFlickr, body]) => {
    _logger2.default.info(`Loggin from doCall, method received : ${method}`);
    res.send(body);
    return body;
  }).catch(err => {
    console.log(err);
    res.send(err);
  });
};

exports.testLogin = testLogin;
exports.getMethods = getMethods;
exports.getMethodInfo = getMethodInfo;
exports.doCall = doCall;