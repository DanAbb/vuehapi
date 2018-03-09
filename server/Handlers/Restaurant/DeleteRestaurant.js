import { Restaurant } from '../../Models'

export default async function (request, h) {
  const { id } = request.payload

  try {
    const restaurant = await Restaurant.remove({ _id: id })
    return restaurant
  } catch (error) {
    return h.response({ errorMessage: error.message }).code(500)
  }
}
