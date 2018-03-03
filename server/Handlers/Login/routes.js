/* @flow */

import ManualLogin from './ManualLogin';
import VerifyEmail from './VerifyEmail';

const routes = [
  {
    method: 'GET',
    path: '/Login/ManualLogin',
    handler: ManualLogin
  },
  {
    method: 'GET',
    path: '/Login/VerifyEmail',
    handler: VerifyEmail
  }
];

export default routes;
