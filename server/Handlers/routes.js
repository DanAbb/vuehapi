/* @flow */

import LoginRoutes from './Login';
import SignupRoutes from './Signup';
import RestaurantRoutes from './Restaurant';
import BookingRoutes from './Booking';

const routes = [
  ...LoginRoutes,
  ...SignupRoutes,
  ...RestaurantRoutes,
  ...BookingRoutes
];

export default routes;
