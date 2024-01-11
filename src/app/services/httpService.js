import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorageService'
import { httpAuth } from '../hooks/useAuth'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

      const expiresDate = localStorageService.getTokenExpiresDate()
      const refreshToken = localStorageService.getRefreshToken()
      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        localStorageService.setTokens({
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          localId: data.user_id,
          expiresIn: data.expires_in
        })
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) }
    }
    return res
  },
  function (error) {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedError) {
      console.log(error)
      toast.error('Something was wrong. Try it later.')
    }
    return Promise.reject(error)
  }
)

function transformData(data) {
  return data && !data._id ? Object.values(data) : data
}

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}

export default httpService
