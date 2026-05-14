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
// 课时视频列表
export const getCourseVideoList = (data) => {
  return request({
    url: '/courseVideo/list',
    method: 'get',
    data,
  })
}

// 新增课时视频
export const addCourseVideo = (data) => {
  return request({
    url: '/courseVideo/add',
    method: 'post',
    data,
  })
}

// 修改课时视频
export const updateCourseVideo = (data) => {
  return request({
    url: '/courseVideo/update',
    method: 'post',
    data,
  })
}

// 删除课时视频
export const deleteCourseVideo = (data) => {
  return request({
    url: '/courseVideo/delete',
    method: 'get',
    data,
  })
}
