/* @flow */

import { Auth, User } from '../../Models'

export default function (request: Object): Object {
  async function userAuth () {
    const user = new User({
      firstName: 'Dan',
      lastName: 'Abbott'
    })

    const auth = new Auth({
      email: 'dan@dabb.io',
      hPassword: 'fucku'
    })

    await auth.save()
    const x = await user.save()

    return x
  }

  return userAuth()
}
