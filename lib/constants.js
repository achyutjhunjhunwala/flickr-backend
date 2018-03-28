export const APPLICATION_PORT = 8080;
export const FLICKR_API_URL = 'https://api.flickr.com/services/rest/';
export const FLICKR_CONSUMER_KEY = process.env.FLICKR_CONSUMER_KEY || 'be01d202d2bce24d7625a0dca3ee11c0';
export const FLICKR_CONSUMER_SECRET = process.env.FLICKR_CONSUMER_SECRET || '3684013846f5c155';
export const DEFAULT_FORMAT = 'json';
export const DEFAULT_PARAMS = {
  api_key: FLICKR_CONSUMER_KEY,
  format: DEFAULT_FORMAT,
};
