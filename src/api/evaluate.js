import request from '@/utils/request'

const curryRequest = (url, method, data) => {
  return request(`/evaluate/${url}`, method, data)
}

export function apiGetList(data) {
  return curryRequest('list', 'post', data)
}

export function apiAdd(data) {
  return curryRequest('add', 'post', data)
}

export function apiDelte(data) {
  return curryRequest('del', 'post', data)
}
