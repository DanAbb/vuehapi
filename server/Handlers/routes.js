/* @flow */

import LoginRoutes from './Login';
import SignupRoutes from './Signup';
import RestaurantRoutes from './Restaurant';

const routes = [...LoginRoutes, ...SignupRoutes, ...RestaurantRoutes];

export default routes;
