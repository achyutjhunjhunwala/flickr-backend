import { FLICKR_CONSUMER_KEY, FLICKR_CONSUMER_SECRET } from './constants';

export default {
  server: {
    protocol: 'https',
    host: 'flickr-backend.herokuapp.com',
    callback: '/callback',
    transport: 'session',
    state: true,
  },
  flickr: {
    request_url: 'https://www.flickr.com/services/oauth/request_token',
    authorize_url: 'https://www.flickr.com/services/oauth/authorize',
    access_url: 'https://www.flickr.com/services/oauth/access_token',
    oauth: 1,
    custom_parameters: ['perms'],
    consumer_key: FLICKR_CONSUMER_KEY,
    consumer_secret: FLICKR_CONSUMER_SECRET,
    scope: ['read'],
  },
};
