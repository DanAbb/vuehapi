/* @flow */

import mongoose, { Schema } from 'mongoose'

const authSchema = new Schema({
  email: String,
  hPassword: String,
  emailVerified: { type: Boolean, default: false },
  creationDate: { type: Date, default: Date.now }
})

const Auth = mongoose.model('Auth', authSchema)

export default Auth
