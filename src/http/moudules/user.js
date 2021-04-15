import axios from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/user/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/user/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/user/findPage',
    method: 'post',
    data
  })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
  return axios({
    url: '/user/findPermissions',
    method: 'get',
    params
  })
}


export const findByName = (params) => {
  return axios({
    url: '/user/findByName',
    method: 'get',
    params
  })
}

export const appLogin = data => {
  return axios({
    url: 'appLogin',
    method: 'post',
    data
  })
}
export const updatePw = (params) => {
  return axios({
    url: '/user/updatePassword',
    method: 'get',
    params
  })
}

export const sendSms = (params) => {
  return axios({
    url: 'sendSms',
    method: 'get',
    params
  })
}
export const mobileLogin = data => {
  return axios({
    url: 'mobileLogin',
    method: 'post',
    data
  })
}

export const updateHeaderImg = data => {
  return axios({
    url: 'updateHeaderImg',
    method: 'post',
    data
  })
}
