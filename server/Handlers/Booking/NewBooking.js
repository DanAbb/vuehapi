import { Booking, Restaurant } from '../../Models'

export default async function (request, h) {
  const user = request.auth.credentials

  console.log(user)

  const {
    name,
    time,
    number_of_people,
    contact_number,
    contact_email } = request.payload

  try {
    const restaurant = await Restaurant.findOne({ user })

    console.log(restaurant)

    const booking = new Booking({
      name,
      time,
      number_of_people,
      contact_number,
      contact_email,
      restaurant
    })

    await booking.save()

    return booking
  } catch (error) {
    console.log(error)
    return h.response({ errorMessage: error.message }).code(500)
  }
}
