import { Restaurant } from '../../Models'

export default async function (request, h) {
  const user = request.auth.credentials

  const {
    name,
    address,
    telephone,
    number_of_tables,
    time_open,
    time_closed,
    table_duration } = request.payload

  try {
    const restaurant = new Restaurant({
      name,
      address,
      telephone,
      number_of_tables,
      time_open,
      time_closed,
      table_duration,
      user: user._id
    })

    await restaurant.save()

    return restaurant
  } catch (error) {
    console.log(error)
    return h.response({ errorMessage: error.message }).code(500)
  }
}
