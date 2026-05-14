const db = require('../config/db')

// 查询某个课程下的课时视频列表
exports.courseVideoListController = (req, res) => {
  const { course_id } = req.query

  const sql = `
    SELECT id, course_id, title, video_url, duration, sort, created_at, updated_at
    FROM course_video
    WHERE course_id = ? AND del = 0
    ORDER BY sort ASC, id ASC
  `

  db.query(sql, [Number(course_id)], (err, result) => {
    if (err) {
      return res.send({
        code: 1,
        message: err.message,
      })
    }

    return res.send({
      code: 0,
      data: result,
    })
  })
}

// 新增课时视频
exports.courseVideoAddController = (req, res) => {
  const { course_id, title, video_url, duration, sort } = req.body

  const sql = `
    INSERT INTO course_video
    (course_id, title, video_url, duration, sort, del)
    VALUES (?, ?, ?, ?, ?, 0)
  `

  db.query(
    sql,
    [
      Number(course_id),
      title,
      video_url,
      duration || '',
      Number(sort) || 0,
    ],
    (err, result) => {
      if (err) {
        return res.send({
          code: 1,
          message: err.message,
        })
      }

      return res.send({
        code: 0,
        data: {
          message: '新增课时成功',
          id: result.insertId,
        },
      })
    },
  )
}

// 修改课时视频
exports.courseVideoUpdateController = (req, res) => {
  const { id, title, video_url, duration, sort } = req.body

  const sql = `
    UPDATE course_video
    SET title = ?, video_url = ?, duration = ?, sort = ?
    WHERE id = ? AND del = 0
  `

  db.query(
    sql,
    [
      title,
      video_url,
      duration || '',
      Number(sort) || 0,
      Number(id),
    ],
    (err, result) => {
      if (err) {
        return res.send({
          code: 1,
          message: err.message,
        })
      }

      if (result.affectedRows === 0) {
        return res.send({
          code: 1,
          message: '课时不存在或已被删除',
        })
      }

      return res.send({
        code: 0,
        data: '修改课时成功',
      })
    },
  )
}

// 软删除课时视频
exports.courseVideoDeleteController = (req, res) => {
  const { id } = req.query

  const sql = `
    UPDATE course_video
    SET del = 1
    WHERE id = ? AND del = 0
  `

  db.query(sql, [Number(id)], (err, result) => {
    if (err) {
      return res.send({
        code: 1,
        message: err.message,
      })
    }

    if (result.affectedRows === 0) {
      return res.send({
        code: 1,
        message: '课时不存在或已被删除',
      })
    }

    return res.send({
      code: 0,
      data: '删除课时成功',
    })
  })
}