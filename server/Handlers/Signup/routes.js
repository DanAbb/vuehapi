/* @flow */

import CheckUsernameAvailability from './CheckUsernameAvailability';
import ManualSignup from './ManualSignup';
import Joi from 'joi'

const routes = [
  {
    method: 'GET',
    path: '/Signup/CheckUsernameAvailability',
    handler: CheckUsernameAvailability
  },
  {
    method: 'POST',
    path: '/Signup/ManualSignup',
    handler: ManualSignup,
    config: {
      tags: ['api'], // THIS IS FOR HAPISWAGGER
      validate: {
        payload: {
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().email().required(),
          hashedPassword: Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
            .required()
        }
      }
    }
  }
];

export default routes;
