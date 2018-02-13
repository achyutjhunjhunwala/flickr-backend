import { Router } from 'express';
import authentication from './authenticate';

const routes = new Router();

routes.use('/', authentication);

export default routes;
