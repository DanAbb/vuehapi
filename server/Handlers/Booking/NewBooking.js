import { Booking } from '../../Models'

export default async function (request, h) {
  const {
    restaurant,
    name,
    time,
    date,
    number_of_people,
    contact_number,
    contact_email,
    extra
  } = request.payload

  const booking = new Booking({
    restaurant,
    name,
    time,
    date,
    number_of_people,
    contact_number,
    contact_email,
    extra: extra || ''
  })

  await booking.save()

  return booking
}
