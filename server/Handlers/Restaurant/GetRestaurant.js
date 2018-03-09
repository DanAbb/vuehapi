import { Restaurant } from '../../Models'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'

const publicCert = readFileSync(
  path.resolve(__dirname, '../../public.pem')
)

export default async function (request, h) {
  const token = request.headers['authorization'].split(' ').pop()

  try {
    const verifiedToken = await jwt.verify(token, publicCert, { algorithms: ['RS256'] })

    const restaurant = await Restaurant.findOne({ user: verifiedToken.user })

    return restaurant
  } catch (error) {
    return h.response({ errorMessage: error.message }).code(500)
  }
}
