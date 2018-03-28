'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const APPLICATION_PORT = exports.APPLICATION_PORT = 3000;
const FLICKR_API_URL = exports.FLICKR_API_URL = 'https://api.flickr.com/services/rest/';
const FLICKR_CONSUMER_KEY = exports.FLICKR_CONSUMER_KEY = process.env.FLICKR_CONSUMER_KEY || 'be01d202d2bce24d7625a0dca3ee11c0';
const FLICKR_CONSUMER_SECRET = exports.FLICKR_CONSUMER_SECRET = process.env.FLICKR_CONSUMER_SECRET || '3684013846f5c155';
const DEFAULT_FORMAT = exports.DEFAULT_FORMAT = 'json';
const DEFAULT_PARAMS = exports.DEFAULT_PARAMS = {
  api_key: FLICKR_CONSUMER_KEY,
  format: DEFAULT_FORMAT
};