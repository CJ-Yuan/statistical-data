//这是资金统计组件
import React,{useEffect,useState} from 'react'
import { Card, Row, Col } from '@douyinfe/semi-ui';
import api from '../../api'

function Statistics() {
  const [statistics,setstatistics] = useState('0');
  const [awaits,setawaits] = useState('0');
  const [account,setaccount] = useState('0');
  const [efficacy,setefficacy] = useState('0')
  
  function arrs(data,name){
    let arr = data.reduce((prev,cur)=>Number(prev) + Number(cur.money),0)
    return arr
  }

  useEffect(()=>{
    //获取总到账资金
    api.statistics().then((res)=>{
      let statisticss =  arrs(res.data.message)
      setstatistics(statisticss)
    })
    //获取待确认资金
    api.await().then((res)=>{
      let awaitj =  arrs(res.data.message)
      setawaits(awaitj)
    })
    //可用的资金
    api.account().then((res)=>{
      let accounts =  arrs(res.data.message)
      setaccount(accounts)
    })
    // 已失效的资金
    api.efficacy().then((res)=>{
      let efficacys =  arrs(res.data.message)
      setefficacy(efficacys)
    })
  },[])
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
          <Card title='总到账资金' bordered={false} >
              <span style={{fontSize:'20px'}}>{statistics}￥</span>
          </Card>
      </Col>
      <Col span={24}>
          <Card title='可用的资金' bordered={false} >
            <span style={{fontSize:'20px'}}>{account}￥</span>
          </Card>
      </Col>
      <Col span={24}>
          <Card title='待确认资金' bordered={false} >
            <span style={{fontSize:'20px'}}>{awaits}￥</span>
          </Card>
      </Col>
      <Col span={24}>
          <Card title='已失效的资金' bordered={false} >
            <span style={{fontSize:'20px'}}>{efficacy}￥</span>
          </Card>
      </Col>
    </Row>
  )
}


export default Statistics