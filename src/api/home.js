import request from '@/libs/request'

export function getList(params) {
  return request({
    url: 'user/list',
    method: 'get',
    params
  })
}
// 获取菜谱分类
export function getcookbookSort() {
  return request({
    url: 'cookbook/getcookbookSort',
    method: 'get'
  })
}

// 获取菜谱详情分类
export function getDetailsSort() {
  return request({
    url: 'cookbook/getDetailsSort',
    method: 'get'
  })
}

// 获取菜谱详情分类(分页)
export function getDetailsSortPage(params) {
  return request({
    url: 'cookbook/getDetailsSortPage',
    method: 'get',
    params
  })
}

// 删除详细分类
export function delSort(params) {
  return request({
    url: `cookbook/delSort`,
    method: 'delete',
    params
  })
}

// 新增菜谱详细分类
export function addSort(data) {
  return request({
    url: 'cookbook/addSort',
    method: 'post',
    data
  })
}

// 根据食材大类获取食材小类
export function getSmallSort(params) {
  return request({
    url: 'cookbook/getSmallSort',
    method: 'get',
    params
  })
}

// 获取菜谱
export function getCookbook(params) {
  return request({
    url: 'cookbook/getCookbook',
    method: 'get',
    params
  })
}

// 获取所有菜谱
export function getAllCookbook(params) {
  return request({
    url: 'cookbook/getAllCookbook',
    method: 'get',
    params
  })
}

// 新增菜谱
export function addCookbook(data) {
  return request({
    url: 'cookbook/add',
    method: 'post',
    data
  })
}

// 获取菜谱详情
export function getOneCookbook(params) {
  return request({
    url: 'cookbook/getOneCookbook',
    method: 'get',
    params
  })
}

// 根据大类小类获取菜谱
export function getSortCookbook(params) {
  return request({
    url: 'cookbook/getSortCookbook',
    method: 'get',
    params
  })
}

// 搜索菜谱
export function searchCookbook(params) {
  return request({
    url: 'cookbook/searchCookbook',
    method: 'get',
    params
  })
}

// 搜索菜谱
export function getSeasonOrHot(params) {
  return request({
    url: 'cookbook/getSeasonOrHot',
    method: 'get',
    params
  })
}

// 获取菜谱评论
export function getComment(params) {
  return request({
    url: 'user/getComment',
    method: 'get',
    params
  })
}
// 删除评论
export function delComment(params) {
  return request({
    url: `user/delComment`,
    method: 'delete',
    params
  })
}

// 新增菜谱评论
export function addComment(data) {
  return request({
    url: 'user/comment',
    method: 'post',
    data
  })
}

// 删除菜谱
export function delCookbook(params) {
  return request({
    url: 'cookbook/delCookbook',
    method: 'delete',
    params
  })
}

export function setLike(params) {
  return request({
    url: 'user/setLike',
    method: 'put',
    params
  })
}
