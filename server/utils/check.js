const Joi = require('joi');

// 用户名：长度不限，中文/字母/数字/下划线
const username = Joi.string()
  .pattern(/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/)
  .required()
  .messages({
    'string.empty': '用户名不能为空',
    'any.required': '用户名是必填项',
    'string.pattern.base': '用户名只能包含中文、字母、数字或下划线'
  });

// 密码：6-12位，字母/数字/下划线
const password = Joi.string()
  .pattern(/^[a-zA-Z0-9_]{6,12}$/)
  .required()
  .messages({
    'string.empty': '密码不能为空',
    'any.required': '密码是必填项',
    'string.pattern.base': '密码必须是6-12位字母、数字或下划线'
  });

exports.usercheck = {
  body: {
    name: username,
    pwd: password
  }
};

const category = Joi.string().allow('').optional();
const page = Joi.number().integer().required();
const size = Joi.number().integer().required();
exports.findcoursecheck = {
    query: {
        category: category,
        page: page,
        size: size
    }
};     
const id = Joi.number().min(1).integer().required();
const title = Joi.string().required();
const price = Joi.number().required();
exports.updatecoursecheck = {
    query: {
        id: id,
        title: title,
        price: price
    }
};
const courseTitle = Joi.string()
  .trim()
  .min(1)
  .max(100)
  .required()
  .messages({
    'string.empty': '课程标题不能为空',
    'any.required': '课程标题是必填项',
    'string.min': '课程标题不能为空',
    'string.max': '课程标题不能超过100个字符'
  })

const coursePrice = Joi.number()
  .min(0)
  .required()
  .messages({
    'number.base': '课程价格必须是数字',
    'number.min': '课程价格不能小于0',
    'any.required': '课程价格是必填项'
  })

const courseCategory = Joi.string()
  .allow('front', 'backend', 'python', 'fullstack')
  .required()
  .messages({
    'any.only': '课程分类不合法',
    'any.required': '课程分类是必填项'
  })

const course_img = Joi.string()
  .allow('')
  .optional()
  .messages({
    'string.base': '课程封面必须是字符串'
  })

const coursePoint = Joi.number()
  .min(0)
  .max(10)
  .required()
  .messages({
    'number.base': '课程评分必须是数字',
    'number.min': '课程评分不能小于0',
    'number.max': '课程评分不能大于10',
    'any.required': '课程评分是必填项'
  })
  

exports.addcoursecheck = {
  body: {
    title: courseTitle,
    price: coursePrice,
    category: courseCategory,
    course_img: course_img,
    point: coursePoint
  }
}

// ==================== 课时视频相关校验 ====================

const courseVideoId = Joi.number()
  .integer()
  .min(1)
  .required()
  .messages({
    'number.base': '课时ID必须是数字',
    'number.integer': '课时ID必须是整数',
    'number.min': '课时ID必须大于0',
    'any.required': '课时ID是必填项',
  })

const courseId = Joi.number()
  .integer()
  .min(1)
  .required()
  .messages({
    'number.base': '课程ID必须是数字',
    'number.integer': '课程ID必须是整数',
    'number.min': '课程ID必须大于0',
    'any.required': '课程ID是必填项',
  })

const videoTitle = Joi.string()
  .trim()
  .min(1)
  .max(100)
  .required()
  .messages({
    'string.empty': '课时标题不能为空',
    'string.min': '课时标题不能为空',
    'string.max': '课时标题不能超过100个字符',
    'any.required': '课时标题是必填项',
  })

const videoUrl = Joi.string()
  .trim()
  .min(1)
  .required()
  .messages({
    'string.empty': '视频地址不能为空',
    'string.min': '视频地址不能为空',
    'any.required': '视频地址是必填项',
  })

const videoDuration = Joi.string()
  .allow('')
  .optional()

const videoSort = Joi.number()
  .integer()
  .min(0)
  .default(0)
  .messages({
    'number.base': '排序必须是数字',
    'number.integer': '排序必须是整数',
    'number.min': '排序不能小于0',
  })

// 查询某课程下的视频列表
exports.findCourseVideoCheck = {
  query: {
    course_id: courseId,
  },
}

// 新增课时视频
exports.addCourseVideoCheck = {
  body: {
    course_id: courseId,
    title: videoTitle,
    video_url: videoUrl,
    duration: videoDuration,
    sort: videoSort,
  },
}

// 修改课时视频
exports.updateCourseVideoCheck = {
  body: {
    id: courseVideoId,
    title: videoTitle,
    video_url: videoUrl,
    duration: videoDuration,
    sort: videoSort,
  },
}

// 删除课时视频
exports.deleteCourseVideoCheck = {
  query: {
    id: courseVideoId,
  },
}