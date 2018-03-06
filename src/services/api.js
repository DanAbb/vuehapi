import axios from 'axios'
import CookieStorage from './cookie.storage'

export default async function (method, endpoint, data = {}) {
  const host = 'http://localhost:3001'

  try {
    const result = await axios({
      method,
      url: `${host}/${endpoint}`,
      data,
      headers: {
        'Authorization': CookieStorage.getAuthToken()
      }
    })

    return result
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return 'unauthorized'
      } else {
        return error.response.data
      }
    }
    return error
  }
}
