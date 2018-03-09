import mongoose, { Schema } from 'mongoose'

const bookingSchema = new Schema({
  name: String,
  time: String,
  number_of_people: String,
  contact_number: String,
  contact_email: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
