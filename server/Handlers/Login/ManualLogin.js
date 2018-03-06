import { Auth } from '../../Models'
import bcrypt from 'bcrypt'
import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import uuid from 'uuid/v4'
import { readFileSync } from 'fs';
import path from 'path'

const privateCert = readFileSync(
  path.resolve(__dirname, '../../private.key')
)

export default async function (request, h) {
  const { email, password, refreshToken } = request.payload
  const SALT_ROUNDS = 8

  const auth = await Auth.findOne({ email }).populate('user')

  if (!auth) {
    return h.response({ message: 'Email not found' }).code(400)
  }

  let isValid = false

  if (password) {
    isValid = await bcrypt.compare(password, auth.hashedPassword)
  } else {
    for (let i = 0; i < auth.refreshTokens.length; i++) {
      if (await bcrypt.compare(refreshToken, auth.refreshTokens[i])) {
        isValid = true
        auth.refreshTokens.splice(i, 1)
        break;
      }
    }
  }

  if (isValid) {
    const refreshToken = uuid()
    const user = auth.user

    const hashedRefreshToken = await bcrypt.hash(refreshToken, SALT_ROUNDS)

    auth.refreshTokens.unshift(hashedRefreshToken)

    const authToken = jwt.sign({ user }, privateCert, {
      algorithm: 'RS256',
      expiresIn: 1800
    })

    await auth.save()

    return { user, authToken, refreshToken }
  } else {
    return h.response({ message: 'invalid credentials' }).code(401)
  }
}