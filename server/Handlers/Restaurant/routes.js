import Joi from 'joi'
import GetRestaurant from './GetRestaurant';
import NewRestaurant from './NewRestaurant';

const routes = [
  {
    method: 'GET',
    path: '/Restaurant',
    handler: GetRestaurant,
    config: {
      cors: true,
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/Restaurant/NewRestaurant',
    handler: NewRestaurant,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().required(),
          address: Joi.string().required(),
          telephone: Joi.string().required(),
          number_of_tables: Joi.number().required(),
          time_open: Joi.string().required(),
          time_closed: Joi.string().required(),
          table_duration: Joi.number().required()
        }
      }
    }
  }
]

export default routes;
