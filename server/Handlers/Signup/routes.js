/* @flow */

import CheckUsernameAvailability from './CheckUsernameAvailability';
import ManualSignup from './ManualSignup';

const routes = [
  {
    method: 'GET',
    path: '/Signup/CheckUsernameAvailability',
    handler: CheckUsernameAvailability
  },
  {
    method: 'GET',
    path: '/Signup/ManualSignup',
    handler: ManualSignup
  }
];

export default routes;
