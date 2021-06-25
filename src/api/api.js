import axios from 'axios'
import reduxIndex from '../redux/index'

const {store} = reduxIndex()
require('dotenv').config()
const api = () => {
  console.log("store",store.getState())
  var apiObject = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      // eslint-disable-next-line no-undef
      Authorization: store.getState().session.token
    }
  })
  apiObject.interceptors.request.use(
    config => {
      store.dispatch({ type: 'SET_LOADER_FLAG',payload:true })
      return config
    },
    error => {
      store.dispatch({ type: 'SET_LOADER_FLAG',payload:false })
      // store.commit('setSpinnerStatus', false)
      return Promise.reject(error)
    }
  )

  apiObject.interceptors.response.use(
    response => {
      store.dispatch({ type: 'SET_LOADER_FLAG',payload:false })
      // store.commit('setSpinnerStatus', false)
      return response
    },
    error => {
      store.dispatch({ type: 'SET_LOADER_FLAG',payload:false })
      // store.commit('setSpinnerStatus', false)
      return Promise.reject(error)
    }
  )

  return apiObject
}

export default api;