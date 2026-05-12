import request from '@/utils/request'
export const getLogin = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}
export const getRegister = (data) => {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  })
}
export const getuserinfo = (data) => {
  return request({
    url: '/user/userinfo',
    method: 'get',
    data,
  })
}
export const getCourseList = (data) => {
  return request({
    url: '/course/find',
    method: 'get',
    data,
  })
}

export const changeCourse = (data) => {
  return request({
    url: '/course/update',
    method: 'get',
    data,
  })
}
export const deleteCourseData = (data) => {
  return request({
    url: '/course/delete',
    method: 'get',
    data,
  })
}

export const addCourse = (data) => {
  return request({
    url: '/course/add',
    method: 'post',
    data,
  })
}
