import request from '@/utils/request'

const curryRequest = (url, method, data) => {
  return request(`/task/${url}`, method, data)
}

export function apiGetList(data) {
  return curryRequest('list', 'post', data)
}

export function apiGetDetail(data) {
  return curryRequest('detail', 'post', data)
}

export function apiUpdate(data) {
  return curryRequest('update', 'post', data)
}

export function apiAdd(data) {
  return curryRequest('add', 'post', data)
}

export function apiDel(data) {
  return curryRequest('del', 'post', data)
}
export function apiStop(data) {
  return curryRequest('stop', 'post', data)
}
export function apiAgain(data) {
  return curryRequest('again', 'post', data)
}
export function apiCollect(data) {
  return curryRequest('collect', 'post', data)
}
export function apistatistics() {
  return curryRequest('statistics', 'post')
}
