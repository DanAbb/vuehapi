import mongoose, { Schema } from 'mongoose'

const restaurantSchema = new Schema({
  name: String,
  address: String,
  telephone: String,
  number_of_tables: Number,
  time_open: String,
  time_closed: String,
  table_duration: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant
