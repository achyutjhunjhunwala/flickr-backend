'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

exports.default = {
  server: {
    protocol: 'http',
    host: '127.0.0.1:3000',
    callback: '/callback',
    transport: 'session',
    state: true
  },
  flickr: {
    request_url: 'https://www.flickr.com/services/oauth/request_token',
    authorize_url: 'https://www.flickr.com/services/oauth/authorize',
    access_url: 'https://www.flickr.com/services/oauth/access_token',
    oauth: 1,
    custom_parameters: ['perms'],
    consumer_key: _constants.FLICKR_CONSUMER_KEY,
    consumer_secret: _constants.FLICKR_CONSUMER_SECRET,
    scope: ['read']
  }
};