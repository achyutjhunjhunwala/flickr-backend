import promise from 'bluebird';
import request from '@request/client';
import purest from 'purest';

export default purest({ request, promise });
