import Joi from 'joi'
import ManualLogin from './ManualLogin';
import VerifyEmail from './VerifyEmail';

const routes = [
  {
    method: 'POST',
    path: '/Login/ManualLogin',
    handler: ManualLogin,
    config: {
      auth: false,
      cors: true,
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string(),
          refreshToken: Joi.string()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/Login/VerifyEmail',
    handler: VerifyEmail,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        query: {
          email: Joi.string().email().required(),
          key: Joi.string().required()
        }
      }
    }
  }
];

export default routes;
