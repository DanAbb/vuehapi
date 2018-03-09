import { Restaurant } from '../../Models'

export default async function (request, h) {
  const user = request.auth.credentials

  try {
    const restaurant = await Restaurant.find({ user })
    return restaurant
  } catch (error) {
    return h.response({ errorMessage: error.message }).code(500)
  }
}
