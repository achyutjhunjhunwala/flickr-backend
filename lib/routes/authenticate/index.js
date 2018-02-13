import { Router } from 'express';
import { app } from '../../index';
import logger from '../../utils/logger';
import { checkSession, getConnectionData } from '../../services/core-services/session';
import { testLogin, getMethods, getMethodInfo, doCall } from '../../services/core-services/flickr';
import delay from '../../utils/delay-promise';

const authentication = new Router();

authentication.get('/', async (req, res) => {
  if (!checkSession(req)) {
    logger.info('Calling Flickr To Authenticate');
    res.redirect('/connect/flickr');
  } else {
    let messageBody = "<div style='color: green'>Well... You're connected. You can work with the API</div><br/>";
    const connectionData = getConnectionData(req);

    // First step. Check the connection.
    const checkLogin = await testLogin(connectionData);
    const checkLoginStats = checkLogin.stat;
    logger.info(`Check Login Stats: ${checkLoginStats}`);

    // Second step. Get the list of available methods.
    const flickrMethods = await getMethods(connectionData);
    logger.info('Flickr Methods received');

    if (flickrMethods && flickrMethods.methods && flickrMethods.methods.method) {
      logger.info('Checking available Flickr Methods');
      const mapPromise = flickrMethods.methods.method.map(async (currentMethod) => {
        const availableMethods = [];

        // Get the method name
        // eslint-disable-next-line
        const methodName = currentMethod._content;

        // Third step. Get the all the information about the method
        const flickrMethodInfo = await getMethodInfo(connectionData, methodName);
        const checkMethodInfoStats = flickrMethodInfo.stat;
        const methodArguments = flickrMethodInfo.arguments.argument;
        const {
          name,
          needslogin,
          needssigning,
          requiredperms,
        } = flickrMethodInfo.method;

        // Fourth step. Map every method to a app.get. This is the core of the application.
        // Here we find the proxy for every method without auth and with read permissions of the Flickr API

        if (checkMethodInfoStats === 'ok' && requiredperms < 2) {
          availableMethods.push({
            methodName,
            needslogin,
            needssigning,
            requiredperms,
            methodArguments,
          });

          const typeOfPermission =
            requiredperms === 0 ?
              "<i style='color: green'>(no authentication needed)</i>" :
              "<i style='color: orange'>(authentication needed with read permissions)</i>";

          logger.info(`- Adding method ${name} ${typeOfPermission}.`);
          app.get(
            `/${methodName}`,
            doCall(connectionData, methodName),
          );

          messageBody += `<div>Flickr method | <b>${name}</b> | ${typeOfPermission}</div>`;
        }

        const myPromise = new Promise((resolve) => {
          resolve(availableMethods);
        });

        return myPromise;
      });
      Promise.all(mapPromise).then(() => {
        console.log('test');
        return res.end(messageBody);
      });
    }
  }
});

authentication.get('/callback', (req, res) => {
  if (checkSession(req)) {
    res.redirect('/');
  } else {
    res.redirect('/error');
  }
});

authentication.get('/error', (req, res) => {
  res.end('<div style="color: red">Well... You think you are smart and can bypass my auth NOOBIE</div>');
});

export default authentication;

