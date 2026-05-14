const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const courseVideoController = require('../controllers/courseVideoController')

const {
  findCourseVideoCheck,
  addCourseVideoCheck,
  updateCourseVideoCheck,
  deleteCourseVideoCheck,
} = require('../utils/check')

// 查询某课程下的课时列表
router.get(
  '/list',
  expressJoi(findCourseVideoCheck),
  courseVideoController.courseVideoListController,
)

// 新增课时
router.post(
  '/add',
  expressJoi(addCourseVideoCheck),
  courseVideoController.courseVideoAddController,
)

// 修改课时
router.post(
  '/update',
  expressJoi(updateCourseVideoCheck),
  courseVideoController.courseVideoUpdateController,
)

// 删除课时
router.get(
  '/delete',
  expressJoi(deleteCourseVideoCheck),
  courseVideoController.courseVideoDeleteController,
)

module.exports = router