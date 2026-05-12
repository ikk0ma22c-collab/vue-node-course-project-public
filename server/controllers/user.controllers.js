const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/jwtSecretKey');
 
/**用户插入逻辑 */

exports.registerController = (req, res) => {
    const { name, pwd } = req.body;
    if (!name || !pwd) {
        return res.send({
            code: 1,
            message: '用户名或密码不能为空'
        });
    }
    const checkSql = 'SELECT * FROM user WHERE name = ?';
    db.query(checkSql, [name], (err, result) => {
        if (err) {
            return res.send({ code: 1, message: err.message });
        }
        console.log(result);
        if (result.length > 0) {
            return res.send({ code: 1, message: '用户名已存在' });
        }


        const password = bcrypt.hashSync(pwd, 10);
        const imglist = ['https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/20.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/21.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/22.jpeg',
        ];
        const num = Math.floor(Math.random() * imglist.length) + 1;
        const sql = 'INSERT INTO user (name,pwd,head_img) VALUES (?,?,?)';
        db.query(sql, [name, password, imglist[num - 1]], (err, result) => {
            if (err) {
                return res.send({
                    code: 1,
                    message: err.message
                });
            }
            return res.send({
                code: 0,
                data: '注册成功',
            });
        });
    });
}

exports.loginController = (req, res) => {
    const { name , pwd} = req.body;
    /**查重逻辑，看数据库中是否存在所想要查看的值 */
    const checkSql = 'SELECT * FROM user WHERE name = ?';
    db.query(checkSql, [name], (err, result) => {
        if (err) {
            return res.send({ code: 1, message: err.message });
        }
        console.log(result);
        if (result.length === 0) {
            return res.send({ code: 1, message: '用户不存在' });
        }
        
        const compareResult = bcrypt.compareSync(pwd, result[0].pwd);
        if (!compareResult) {
            return res.send({ code: 1, message: '密码错误' });
        }
        const token = jwt.sign({ id: result[0].id, name: result[0].name }, jwtSecretKey, { expiresIn: '2h' });
        res.send({
            code: 0,
            data: {
                message: '登录成功',
                token: 'Bearer ' +  token
            }
        });
    });
    

}     
/**
 * 
 * 用户信息查询接口
 */
exports.userInfoController = (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({ code: 1, message: '请先登录' });
    }
    /**
     * 解析token，获取用户信息
     */
    const userInfo = jwt.verify(token.split('Bearer ')[1], jwtSecretKey);
    const sql = 'SELECT id, name, head_img FROM user WHERE id = ?';
    db.query(sql, [userInfo.id], (err, result) => {
        if (err) {
            return res.send({ code: 1, message: err.message });
        }
        if (result.length === 0) {
            return res.send({ code: 1, message: '用户不存在' });
        }  
        res.send({
            code: 0,
            data: {
                name: result[0].name,
                head_img: result[0].head_img
            }
        });
    });
}      