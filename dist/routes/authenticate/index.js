'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _index = require('../../index');

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _session = require('../../services/core-services/session');

var _flickr = require('../../services/core-services/flickr');

var _delayPromise = require('../../utils/delay-promise');

var _delayPromise2 = _interopRequireDefault(_delayPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authentication = new _express.Router();

authentication.get('/', async (req, res) => {
  if (!(0, _session.checkSession)(req)) {
    _logger2.default.info('Calling Flickr To Authenticate');
    res.redirect('/connect/flickr');
  } else {
    let messageBody = "<div style='color: green'>Well... You're connected. You can work with the API</div><br/>";
    const connectionData = (0, _session.getConnectionData)(req);

    // First step. Check the connection.
    const checkLogin = await (0, _flickr.testLogin)(connectionData);
    const checkLoginStats = checkLogin.stat;
    _logger2.default.info(`Check Login Stats: ${checkLoginStats}`);

    // Second step. Get the list of available methods.
    const flickrMethods = await (0, _flickr.getMethods)(connectionData);
    _logger2.default.info('Flickr Methods received');

    if (flickrMethods && flickrMethods.methods && flickrMethods.methods.method) {
      _logger2.default.info('Checking available Flickr Methods');
      const mapPromise = flickrMethods.methods.method.map(async currentMethod => {
        const availableMethods = [];

        // Get the method name
        // eslint-disable-next-line
        const methodName = currentMethod._content;

        // Third step. Get the all the information about the method
        const flickrMethodInfo = await (0, _flickr.getMethodInfo)(connectionData, methodName);
        const checkMethodInfoStats = flickrMethodInfo.stat;
        const methodArguments = flickrMethodInfo.arguments.argument;
        const {
          name,
          needslogin,
          needssigning,
          requiredperms
        } = flickrMethodInfo.method;

        // Fourth step. Map every method to a app.get. This is the core of the application.
        // Here we find the proxy for every method without auth and with read permissions of the Flickr API

        if (checkMethodInfoStats === 'ok' && requiredperms < 2) {
          availableMethods.push({
            methodName,
            needslogin,
            needssigning,
            requiredperms,
            methodArguments
          });

          const typeOfPermission = requiredperms === 0 ? "<i style='color: green'>(no authentication needed)</i>" : "<i style='color: orange'>(authentication needed with read permissions)</i>";

          _logger2.default.info(`- Adding method ${name} ${typeOfPermission}.`);

          _index.app.get(`/${methodName}`, (0, _flickr.doCall)(connectionData, methodName));

          messageBody += `<div>Flickr method | <b>${name}</b> | ${typeOfPermission}</div>`;
        }

        const myPromise = new Promise(resolve => {
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
  if ((0, _session.checkSession)(req)) {
    res.redirect('/');
  } else {
    res.redirect('/error');
  }
});

authentication.get('/error', (req, res) => {
  res.end('<div style="color: red">Well... You think you are smart and can bypass my auth NOOBIE</div>');
});

exports.default = authentication;