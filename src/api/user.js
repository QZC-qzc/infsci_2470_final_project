import request from '@/utils/request'

const curryRequest = (url, method, data) => {
  return request(`/user/${url}`, method, data)
}

export function apiLogin(data) {
  return curryRequest('login', 'post', data)
}

export function apiLogout() {
  return curryRequest('logout', 'get')
}

export function apiGetList(data) {
  return curryRequest('list', 'post', data)
}

export function apiGetInfo(data) {
  return curryRequest('detail', 'post', data)
}

export function apiAdd(data) {
  return curryRequest('add', 'post', data)
}

export function apiDelte(data) {
  return curryRequest('del', 'post', data)
}
