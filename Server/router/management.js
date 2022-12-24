// 导入 express 模块
const express = require('express');
const db = require('../db/index')
//创建路由对象
const router = express.Router();

//记录转账金额
router.post('/transfer',(req,res)=>{
    //获取客户端提交到服务器的数据
    const {money,channel} = req.body
    console.log(money,channel)
    // 获取当前时间
    let times = new Date();
    let mytime=times.toLocaleDateString();
    let mytime2 = times.toLocaleTimeString();
    let time = mytime + '   ' + mytime2
    // 定义SQL语句
    const sqlStr = 'insert into management set ?'
    db.query(sqlStr,{
        money:money,
        payee:channel,
        time:time
    },(err,results)=>{
        //执行 SQL 语句失败了
        if(err) return res.send({status:0,message:'SQL执行失败'})
        //判断影响行数是否为 1
        if(results.affectedRows !==1 ) return res.send({status:1,message:'记录失败'})
        // 记录成功
        res.send({
            status:200,
            message:'记录成功',
        })
    })
})

// 查询转账记录
router.get('/record',(req,res)=>{
    //定义SQL语句
    const sqlStr = `select * from management where failure=0`
    const sqlStr1 = `select * from management order by ID desc`
    // db.query(sqlStr1,(err,results)=>{});
    db.query(sqlStr1,(err,results)=>{
        //执行 SQL 语句失败了
        if(err) return res.send({status:0,message:'SQL执行失败'})
        //执行 SQL 语句成功，但是查询的结果可能为空
        if(results.length < 1) return res.send({status:0,message:'获取信息失败'})
        res.send({
            status:200,
            message:results
        })
        
    })
})

// 总到账资金统计
router.get('/statistics',(req,res)=>{
    //定义SQL语句
    const sqlStr = `select money from management where confirm=1`
    db.query(sqlStr,(err,results)=>{
        //执行 SQL 语句失败了
        if(err) return res.send({status:0,message:'SQL执行失败'})
        //执行 SQL 语句成功，但是查询的结果可能为空
        if(results.length < 0) return res.send({status:0,message:'获取信息失败'})
        res.send({
            status:200,
            message:results
        })
    })
})

// 待确认资金
router.get('/statistics/await',(req,res)=>{
    //定义SQL语句
    const sqlStr = `select money from management where failure=0 and confirm=0`
    db.query(sqlStr,(err,results)=>{
        //执行 SQL 语句失败了
        if(err) return res.send({status:0,message:'SQL执行失败'})
        //执行 SQL 语句成功，但是查询的结果可能为空
        if(results.length < 0) return res.send({status:0,message:'获取信息失败'})
        res.send({
            status:200,
            message:results
        })
    })
})



// 可用的到账资金
router.get('/statistics/account',(req,res)=>{
    //定义SQL语句
    const sqlStr = `select money from management where failure=0 and confirm=1`
    db.query(sqlStr,(err,results)=>{
        //执行 SQL 语句失败了
        if(err) return res.send({status:0,message:'SQL执行失败'})
        //执行 SQL 语句成功，但是查询的结果可能为空
        if(results.length < 1) return res.send({status:0,message:'获取信息失败'})
        res.send({
            status:200,
            message:results
        })
    })
})

// 已失效的资金
router.get('/statistics/efficacy',(req,res)=>{
    //定义SQL语句
    const sqlStr = `select money from management where failure=1`
    db.query(sqlStr,(err,results)=>{
        //执行 SQL 语句失败了
        if(err) return res.send({status:0,message:'SQL执行失败'})
        //执行 SQL 语句成功，但是查询的结果可能为空
        if(results.length < 1) return res.send({status:0,message:'获取信息失败'})
        res.send({
            status:200,
            message:results
        })
    })
})

// 向外共享路由对象
module.exports = router