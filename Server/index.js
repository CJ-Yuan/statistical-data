const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const management = require('./router/management')
const cors = require("cors")

// 解决跨域
app.use(cors())

// 正文解析中间件
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.use('/api',management)


app.listen(5577,()=>{
    console.log('http://127.0.0.1:5577')
})
