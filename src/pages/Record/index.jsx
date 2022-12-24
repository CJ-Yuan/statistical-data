// 这是资金记录组件
import React,{useEffect,useState} from 'react'
import { Card, Row, Col, Descriptions } from '@douyinfe/semi-ui';
import api from '../../api'

function Record() {
  const [data,setdata] = useState([]);

  useEffect(()=>{
    //获取数据
    api.record().then((res)=>{
      setdata(res.data.message)
    })
  },[])
  return (
    <Row gutter={[16, 16]}>
      {
        data.map((e,index)=>{
          const {money,payee,time,confirm,failure} = e
          // 先判断账单是否失效
          if(failure === '0'){
            // 判断账单是否到账
            if(confirm === '1'){
              return(
                <Col key={index} span={24}>
                  <Card style={{backgroundColor:'rgba(var(--semi-green-3), 1)'}} >
                    <Descriptions row data={[
                      {key:'转入金额',value:money},
                      {key:'收款账户',value:payee},
                      {key:'状态',value:'已到账'},
                      {key:'转入时间',value:time},
                      ]}/>
                  </Card>
                </Col>
              )
           }else{
            return(
              <Col key={index} span={24}>
                <Card style={{backgroundColor:'rgba(var(--semi-yellow-1), 1)'}} >
                  <Descriptions row data={[
                    {key:'转入金额',value:money},
                    {key:'收款账户',value:payee},
                    {key:'状态',value:'待确认'},
                    {key:'转入时间',value:time},
                    ]}/>
                </Card>
              </Col>
            )
           }
          }else{
            return(
              <Col key={index} span={24}>
                <Card style={{backgroundColor:'rgba(var(--semi-red-5), 1)'}} >
                  <Descriptions row data={[
                    {key:'转入金额',value:money},
                    {key:'收款账户',value:payee},
                    {key:'状态',value:'已失效'},
                    {key:'转入时间',value:time},
                    ]}/>
                </Card>
              </Col>
            )
          }
        })
      }
    </Row>
  )
}


export default Record