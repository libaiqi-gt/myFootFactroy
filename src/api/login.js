import request from '@/libs/request'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: 'user/add',
    method: 'post',
    data
  })
}

export function getEmail(params) {
  return request({
    url: 'user/getEmail',
    method: 'get',
    params
  })
}

export function setNewPassword(data) {
  return request({
    url: 'user/setNewPassword',
    method: 'put',
    data
  })
}
