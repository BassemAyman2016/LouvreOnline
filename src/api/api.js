import axios from 'axios'
import reduxIndex from '../redux/index'

const {store} = reduxIndex()
require('dotenv').config()
const api = () => {
  let BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/'
  let apiObject = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      Authorization: sessionStorage.getItem("accessToken")
    }
  })
  apiObject.interceptors.request.use(
    config => {
      store.dispatch({ type: 'SET_LOADER_FLAG',payload:true })
      return config
    },
    error => {
      store.dispatch({ type: 'SET_LOADER_FLAG',payload:false })
      return Promise.reject(error)
    }
  )

  apiObject.interceptors.response.use(
    response => {
      store.dispatch({ type: 'SET_LOADER_FLAG',payload:false })
      return response
    },
    error => {
      store.dispatch({ type: 'SET_LOADER_FLAG',payload:false })
      return Promise.reject(error)
    }
  )

  return apiObject
}

export default api;