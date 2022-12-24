// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    host: 'localhost', //Node 部署:127.0.0.1 本地：localhost
    user: 'root', 
    password: 'yuan520',
    database: 'data_yuan',
  })

// 向外共享 db 数据库连接对象
module.exports = db
