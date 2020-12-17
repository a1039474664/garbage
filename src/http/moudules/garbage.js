import axios from '../axios'


// 搜索
export const query = (params) => {
  return axios({
    url: '/tGcGarbage/searchGarbageByName',
    method: 'get',
    params
  })
}

export const findAll = (params) => {
  return axios({
    url: '/tGcGarbage/findAll',
    method: 'post',
    params
  })
}
export const findByName = (params) => {
  return axios({
    url: '/tGcGarbage/findByName',
    method: 'get',
    params
  })
}
//查询热门搜索信息
export const findHot = (params) => {
  return axios({
    url: '/tGcGarbage/findHot',
    method: 'post',
    params
  })
}
