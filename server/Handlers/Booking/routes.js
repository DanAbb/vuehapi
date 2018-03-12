import Joi from 'joi'
import GetBookings from './GetBookings';
import NewBooking from './NewBooking';
import DeleteBooking from './DeleteBooking';

const routes = [
  {
    method: 'GET',
    path: '/Bookings/{restaurantId}',
    handler: GetBookings,
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
          restaurant: Joi.string().required(),
          name: Joi.string().required(),
          time: Joi.string().required(),
          date: Joi.date().required(),
          extra: Joi.string(),
          number_of_people: Joi.string().required(),
          contact_number: Joi.number().required(),
          contact_email: Joi.string().email().required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/Booking/Delete',
    handler: DeleteBooking,
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
