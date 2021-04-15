import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const findAll = (params) => {
  return axios({
    url: '/tGcHistory/findAll',
    method: 'post',
    params
  })
}
// 删除
export const deleteByIds = (data) => {
  return axios({
    url: '/tGcHistory/deleteByIds/',
    method: 'post',
    data
  })
}
// 删除所有
export const deleteAllGarbage = (data) => {
  return axios({
    url: '/tGcHistory/deleteAll',
    method: 'post',
    data
  })
}
