import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import Grant from 'grant-express';

import logger from './utils/logger';
import routes from './routes';

// Constants
import { APPLICATION_PORT, FLICKR_CONSUMER_SECRET } from './constants';

// Configuration
import config from './config';

// App Express
export const app = express();
app.use(session({ secret: FLICKR_CONSUMER_SECRET }));
app.use(new Grant(config));

logger.info('Overriding Express logger');
app.use(morgan('combined', { stream: logger.stream }));

// Connect all our routes to our application
app.use('/', routes);

app.listen(APPLICATION_PORT, () => {
  logger.info(`Express server listening on port ${APPLICATION_PORT}`);
  logger.info('-> TheUiGuy - Insane Mode On');
  logger.info(`First of all, you must validate the application opening: http://127.0.0.1:${APPLICATION_PORT}/`);
});
