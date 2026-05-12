const db = require('../config/db');

exports.coursefindController = (req, res) => {
    const { category, page, size } = req.query;
    const offset = (page - 1) * size;
    const hasCategory = Boolean(category);

    /**
     * 查询课程列表的sql
     */
    const pagesql = hasCategory
        ? 'SELECT * FROM video WHERE del = 0 AND category = ? ORDER BY id LIMIT ?, ?'
        : 'SELECT * FROM video WHERE del = 0 ORDER BY id LIMIT ?, ?';

    /**
     * 查询课程总数的sql
     */
    const countsql = hasCategory
        ? 'SELECT COUNT(*) as total FROM video WHERE del = 0 AND category = ?'
        : 'SELECT COUNT(*) as total FROM video WHERE del = 0';
    const pageParams = hasCategory
        ? [category, Number(offset), Number(size)]
        : [Number(offset), Number(size)];
    const countParams = hasCategory ? [category] : [];

    db.query(pagesql, pageParams, (err, result) => {
        if (err) {
            return res.send({
                code: 1,
                message: err.message
            });
        }
        db.query(countsql, countParams, (err, countResult) => {
            if (err) {
                return res.send({
                    code: 1,
                    message: err.message
                });
            }
            return res.send({
                code: 0,
                data: {
                    list: result,
                    count: countResult,
                }
            });
        });
    });
};
exports.courseUpdateController = (req, res) => {
    const { title, price, id } = req.query;
    let arr =[];
    let changeSql = 'UPDATE video SET ';
    /**
     * 修改标题和价格
     */
    if (title && price) {
        changeSql += 'title = ?, price = ? where id=?';
        arr = [title, Number(price), Number(id)];
    }else if (title) {
        /**
         * 修改课程标题
         */
        changeSql += 'title = ? where id=?';
        arr = [title, Number(id)];
    }else if (price) {
        /**
         * 修改课程价格
         */
        changeSql += 'price = ? where id=?';
        arr = [Number(price), Number(id)];
    }
    db.query(changeSql, arr, (err, result) => {
        if (err) {
            return res.send({   
            code: 1,
            message: err.message
        });
        }       
        return res.send({
            code: 0,
            data: '修改成功'
        });
    });
}
exports.courseDeleteController = (req, res) => {
    const { id , del} = req.query;
    const sql = 'UPDATE video SET del = 1 WHERE id = ?';
    db.query(sql, [Number(id)], (err, result) => {
        if (err) {
            return res.send({
                code: 1,
                message: err.message
            });
        }
        return res.send({
            code: 0,
            data: '删除成功'
        });
    });
}
exports.courseAddController = (req, res) => {
  const { title, price, category, course_img, point } = req.body

  const sql = `
    INSERT INTO video (title, price, category, course_img, point, del)
    VALUES (?, ?, ?, ?, ?, 0)
  `

  db.query(
    sql,
    [title, Number(price), category, course_img, Number(point)],
    (err, result) => {
      if (err) {
        return res.send({
          code: 1,
          message: err.message
        })
      }

      return res.send({
        code: 0,
        data: '新增课程成功'
      })
    }
  )
}