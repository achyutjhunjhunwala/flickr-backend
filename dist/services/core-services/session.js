'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnectionData = exports.showConnectionData = exports.checkSession = undefined;

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint camelcase: 0 */
const checkSession = req => req && req.session && req.session.grant && req.session.grant.step1 && req.session.grant.response;

const showConnectionData = connectionData => {
  const {
    user_nsid,
    username,
    fullname,
    oauth_consumer_key,
    oauth_token,
    oauth_token_secret,
    access_token,
    access_secret
  } = connectionData;
  _logger2.default.info('--------------------- Connection Data ---------------------');
  _logger2.default.info(' - user_nsid____________: ', user_nsid);
  _logger2.default.info(' - username_____________: ', username);
  _logger2.default.info(' - fullname_____________: ', fullname);
  _logger2.default.info(' - oauth_consumer_key___: ', oauth_consumer_key);
  _logger2.default.info(' - oauth_token__________: ', oauth_token);
  _logger2.default.info(' - oauth_token_secret___: ', oauth_token_secret);
  _logger2.default.info(' - access_token_________: ', access_token);
  _logger2.default.info(' - access_secret________: ', access_secret);
  _logger2.default.info('-----------------------------------------------------------');
};

const getConnectionData = req => {
  if (req && req.session && req.session.grant && req.session.grant.step1 && req.session.grant.response) {
    const oauth_consumer_key = _constants.FLICKR_CONSUMER_KEY;
    const { oauth_token, oauth_token_secret } = req.session.grant.step1;
    const { access_token, access_secret, raw } = req.session.grant.response;
    const { user_nsid, username, fullname } = raw;
    const connectionData = {
      user_nsid, username, fullname, oauth_consumer_key, oauth_token, oauth_token_secret, access_token, access_secret
    };
    showConnectionData(connectionData);
    return connectionData;
  }
  return null;
};

exports.checkSession = checkSession;
exports.showConnectionData = showConnectionData;
exports.getConnectionData = getConnectionData;