import Joi from 'joi'
import GetRestaurants from './GetRestaurants';
import NewRestaurant from './NewRestaurant';
import DeleteRestaurant from './DeleteRestaurant';

const routes = [
  {
    method: 'GET',
    path: '/Restaurants',
    handler: GetRestaurants,
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
  },
  {
    method: 'DELETE',
    path: '/Restaurant/Delete',
    handler: DeleteRestaurant,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        payload: {
          id: Joi.string().required()
        }
      }
    }
  }
]

export default routes;
