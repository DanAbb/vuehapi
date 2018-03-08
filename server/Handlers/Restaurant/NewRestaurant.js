import { Restaurant } from '../../Models'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'

const publicCert = readFileSync(
  path.resolve(__dirname, '../../public.pem')
)

export default async function (request, h) {
  const token = request.headers['authorization'].split(' ').pop()

  const {
    name,
    address,
    telephone,
    number_of_tables,
    time_open,
    time_closed,
    table_duration } = request.payload

  try {
    const verifiedToken = await jwt.verify(token, publicCert, { algorithms: ['RS256'] })

    const restaurant = new Restaurant({
      name,
      address,
      telephone,
      number_of_tables,
      time_open,
      time_closed,
      table_duration,
      user: verifiedToken.user._id
    })

    await restaurant.save()

    return restaurant
  } catch (error) {
    console.log(error)
    return h.response({ errorMessage: error.message }).code(500)
  }
}
