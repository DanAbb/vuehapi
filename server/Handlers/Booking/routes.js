import Joi from 'joi'
import GetBooking from './GetBooking';
import NewBooking from './NewBooking';

const routes = [
  {
    method: 'GET',
    path: '/Booking/:id',
    handler: GetBooking,
    config: {
      cors: true,
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/Booking/NewBooking',
    handler: NewBooking,
    config: {
      cors: true,
      auth: false,
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().required(),
          time: Joi.string().required(),
          number_of_people: Joi.string().required(),
          contact_number: Joi.number().required(),
          contact_email: Joi.string().email().required()
        }
      }
    }
  }
]

export default routes;
