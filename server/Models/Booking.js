import mongoose, { Schema } from 'mongoose'

const bookingSchema = new Schema({
  name: String,
  time: String,
  date: Date,
  number_of_people: String,
  contact_number: String,
  contact_email: String,
  extra: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
