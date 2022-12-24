//api 统一管理
import axios from "axios"

//路径地址 
const path = {
    // baseUrl:"http://127.0.0.1:5577",
    baseUrl:'http://120.48.48.128:5577',
    // 记录转账金额
    transfer:'/api/transfer',
    // 查询转账记录
    record:'/api/record',
    //查询总金额
    statistics:'/api/statistics',
    // 查询待确认的资金
    await:'/api/statistics/await',
    // 查询可用资金
    account:'/api/statistics/account',
    // 已失效的资金
    efficacy:'/api/statistics/efficacy',
}

//请求方法
const api = {
    // 记录转账金额
    transfer(params){
        return axios.post(path.baseUrl + path.transfer,params)
    },
    // 查询转账记录
    record(){
        return axios.get(path.baseUrl + path.record)
    },
    //查询总金额
    statistics(){
        return axios.get(path.baseUrl + path.statistics)
    },
    // 查询待确认的资金
    await(){
        return axios.get(path.baseUrl + path.await)
    },
    // 查询可用资金
    account(){
        return axios.get(path.baseUrl + path.account)
    },
    // 已失效的资金
    efficacy(){
        return axios.get(path.baseUrl + path.efficacy)
    }
    
}

export default api;