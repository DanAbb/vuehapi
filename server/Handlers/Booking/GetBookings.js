import { Booking } from '../../Models'

export default async function (request, h) {
  const { restaurantId }  = request.params

  try {
    const bookings = await Booking.find({ restaurant: restaurantId }).sort({ date: 'asc' })
    return bookings
  } catch (error) {
    return h.response({ errorMessage: error.message }).code(500)
  }
}
