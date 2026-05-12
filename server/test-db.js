const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '47.114.78.151',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test'
});

db.connect((err) => {
    if (err) {
        console.error('数据库连接失败：', err);
        return;
    }

    console.log('数据库连接成功');

    db.query('SHOW TABLES', (err, results) => {
        if (err) {
            console.error('查询失败：', err);
            return;
        }

        console.log('表列表：', results);
        db.end();
    });
});