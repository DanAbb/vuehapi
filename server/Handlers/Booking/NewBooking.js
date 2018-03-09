import { Booking, Restaurant } from '../../Models'
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
    time,
    number_of_people,
    contact_number,
    contact_email } = request.payload

  try {
    const verifiedToken = await jwt.verify(token, publicCert, { algorithms: ['RS256'] })

    const restaurant = await Restaurant.findOne({ user: verifiedToken.user })

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
