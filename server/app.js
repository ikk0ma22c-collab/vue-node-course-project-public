const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

/**
 * 
 * 解析post请求的body数据
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 解析token是否正确
 */
const expressJWT = require('express-jwt');
const { jwtSecretKey } = require('./config/jwtSecretKey');
app.use(expressJWT({ secret: jwtSecretKey, algorithms: ['HS256'] })
.unless({ path: [ '/api/v1/user/login', '/api/v1/user/register'], 
}));
/**
 * 
 *用户相关接口
 */
const userRouter = require('./router/user');
app.use('/api/v1/user', userRouter);

/**
 * 课程相关接口
 */
const courseRouter = require('./router/course');
app.use('/api/v1/course', courseRouter);

/**
 * 错误中间件
 */
const Joi = require('joi');
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        return res.send({
            status: 400,
            message: err.message
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: 'token无效'
        });
    }
    return res.send({
        status: 500,
        message: err.message || '服务器内部错误'
    });
});

app.listen(3000, () => {
    console.log('服务器在启动：http：//localhost:3000');
});