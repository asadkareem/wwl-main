import axios from 'axios'
const baseUrl = process.env.REACT_APP_ELASTIC_API_URL || 'http://127.0.0.1:4000'
const wwlAPI = axios

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('wwl-mpp-token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

window.http = wwlAPI

export const postRequest = (url, body) => {
  return wwlAPI.post(`${baseUrl}${url}`, body)
}

export const getRequest = (url, body) => {
  return wwlAPI.get(`${baseUrl}${url}`)
}

export const putRequest = (url, body) => {
  return wwlAPI.put(`${baseUrl}${url}`, body)
}

export const deleteRequest = (url, body) => {
  return wwlAPI.delete(`${baseUrl}${url}`, body)
}

export default wwlAPI
