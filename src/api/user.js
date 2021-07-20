import request from '@/libs/request'

export function setName(data) {
  return request({
    url: 'user/setName',
    method: 'put',
    data
  })
}

export function setEmail(data) {
  return request({
    url: 'user/setEmail',
    method: 'put',
    data
  })
}

export function setPassword(data) {
  return request({
    url: 'user/setPassword',
    method: 'put',
    data
  })
}

export function upload(data) {
  return request({
    url: `user/upload/${data.userId}`,
    method: 'post',
    data
  })
}

export function getUserCookbook(params) {
  return request({
    url: `cookbook/getUserCookbook/${params.userId}`,
    method: 'get',
    params
  })
}

export function addFeedback(data) {
  return request({
    url: `user/addFeedback`,
    method: 'post',
    data
  })
}

export function getFeedback(params) {
  return request({
    url: `user/getFeedback`,
    method: 'get',
    params
  })
}

export function delFeedback(params) {
  return request({
    url: `user/delFeedback`,
    method: 'delete',
    params
  })
}

export function updateFeedback(data) {
  return request({
    url: 'user/updateFeedback',
    method: 'put',
    data
  })
}
// 删除单个用户
export function delUser(params) {
  return request({
    url: `user/delUser`,
    method: 'delete',
    params
  })
}
