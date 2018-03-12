import { Restaurant } from '../../Models'

export default async function (request, h) {
  const { restaurantId }  = request.params

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId })
    if (!restaurant) {
      return h.response({ errorMessage: 'Cannot find restaurant' }).code(404)
    }
    return restaurant
  } catch (error) {
    return h.response({ errorMessage: error.message }).code(500)
  }
}
