import providers from '@purest/providers';
import purest from '../../utils/purest-promise';
import logger from '../../utils/logger';
import { FLICKR_API_URL, DEFAULT_PARAMS, FLICKR_CONSUMER_KEY, FLICKR_CONSUMER_SECRET } from '../../constants';

const flickr = purest({
  provider: 'flickr',
  config: providers,
  key: FLICKR_CONSUMER_KEY,
  secret: FLICKR_CONSUMER_SECRET,
});

const testLogin = async (connectionData) => {
  const loginCheck = await flickr
    .get()
    .qs({
      method: 'flickr.test.login',
      api_key: FLICKR_CONSUMER_KEY,
    })
    .auth(connectionData.access_token, connectionData.access_secret)
    .request()
    .then(([res, body]) => body)
    .catch((err) => {
      logger.info(err);
      return err;
    });

  return loginCheck;
};

const getMethods = async (connectionData) => {
  const flickrMethods = await flickr
    .get()
    .qs({
      method: 'flickr.reflection.getMethods',
      api_key: FLICKR_CONSUMER_KEY,
    })
    .auth(connectionData.access_token, connectionData.access_secret)
    .request()
    .then(([res, body]) => body)
    .catch((err) => {
      logger.info(err);
      return err;
    });

  return flickrMethods;
};

const getMethodInfo = async (connectionData, methodName) => {
  const methodInfo = await flickr
    .get()
    .qs({
      method: 'flickr.reflection.getMethodInfo',
      api_key: FLICKR_CONSUMER_KEY,
      method_name: methodName,
    })
    .auth(connectionData.access_token, connectionData.access_secret)
    .request()
    .then(([res, body]) => body)
    .catch((err) => {
      console.log(err);
      return err;
    });

  return methodInfo;
};

const doCall = (connectionData, method) => (req, res) => {
  flickr
    .get()
    .qs({
      method,
      api_key: FLICKR_CONSUMER_KEY,
      ...req.query,
    })
    .auth(connectionData.access_token, connectionData.access_secret)
    .request()
    .then(([responseOfFlickr, body]) => {
      logger.info(`Loggin from doCall, method received : ${method}`);
      res.send(body);
      return body;
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

export {
  testLogin,
  getMethods,
  getMethodInfo,
  doCall,
};
