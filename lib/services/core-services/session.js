/* eslint camelcase: 0 */
import logger from '../../utils/logger';
import { FLICKR_CONSUMER_KEY } from '../../constants';

const checkSession = req =>
  req && req.session && req.session.grant && req.session.grant.step1 && req.session.grant.response;

const showConnectionData = (connectionData) => {
  const {
    user_nsid,
    username,
    fullname,
    oauth_consumer_key,
    oauth_token,
    oauth_token_secret,
    access_token,
    access_secret,
  } = connectionData;
  logger.info('--------------------- Connection Data ---------------------');
  logger.info(' - user_nsid____________: ', user_nsid);
  logger.info(' - username_____________: ', username);
  logger.info(' - fullname_____________: ', fullname);
  logger.info(' - oauth_consumer_key___: ', oauth_consumer_key);
  logger.info(' - oauth_token__________: ', oauth_token);
  logger.info(' - oauth_token_secret___: ', oauth_token_secret);
  logger.info(' - access_token_________: ', access_token);
  logger.info(' - access_secret________: ', access_secret);
  logger.info('-----------------------------------------------------------');
};

const getConnectionData = (req) => {
  if (req && req.session && req.session.grant && req.session.grant.step1 && req.session.grant.response) {
    const oauth_consumer_key = FLICKR_CONSUMER_KEY;
    const { oauth_token, oauth_token_secret } = req.session.grant.step1;
    const { access_token, access_secret, raw } = req.session.grant.response;
    const { user_nsid, username, fullname } = raw;
    const connectionData = {
      user_nsid, username, fullname, oauth_consumer_key, oauth_token, oauth_token_secret, access_token, access_secret,
    };
    showConnectionData(connectionData);
    return connectionData;
  }
  return null;
};

export {
  checkSession,
  showConnectionData,
  getConnectionData,
};
