import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/tGcCustomerService/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/tGcCustomerService/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/tGcCustomerService/findPage',
    method: 'post',
    data
  })
}


export const findById = (params) => {
  return axios({
    url: '/tGcCustomerService/findById',
    method: 'get',
    params
  })
}
