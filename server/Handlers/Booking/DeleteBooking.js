import { Booking } from '../../Models'

export default async function (request, h) {
  const { id } = request.payload

  try {
    const booking = await Booking.remove({ _id: id })
    return booking
  } catch (error) {
    return h.response({ errorMessage: error.message }).code(500)
  }
}
