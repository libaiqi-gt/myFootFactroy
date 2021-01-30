import request from '@/libs/request'

export function getList() {
  return request({
    url: 'user/list',
    method: 'get'
  })
}