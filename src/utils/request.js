import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.header.code !== 0) {
      Message({
        message: res.header.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.header.code === 5000) {
        MessageBox.confirm(
          'You are logged out, you can click cancel to stay on the current page or log in again.',
          {
            confirmButtonText: 'relogin',
            cancelButtonText: 'cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (res.header.code === 200) {
        Message({
          message: res.header.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      return Promise.reject(new Error(res.header.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    Message({
      message: error.header ? error.header.msg : 'Request timed out, please try again later',
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)
/**
 * 封装接口请求方法
 * @param url 域名后需补齐的接口地址
 * @param method 接口请求方式
 * @param data data下的其他数据体
 */
const request = (url, method, data) => {
  return service({
    url,
    method,
    data: {
      body: data
    }
  })
}

export default request
