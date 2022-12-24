// 这是资金转入
import React,{useState} from 'react'
import { Card, Row, Col, Button, Modal, Input, Radio, RadioGroup, Toast ,Descriptions   } from '@douyinfe/semi-ui';
import { IconCreditCard } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router-dom';
import api from '../../api'

function Transfer() {
  // 用于控制弹窗
  const [visible,setvisible] = useState(false);
  const [inputss,setinputss] = useState();
  const [radioss,setradioss] = useState(null);
  const [name,setname] = useState(null);
  const navigate = useNavigate();

  // 确认的回调函数
  function publish(e){
    if(!checkNumber(inputss)){
      Toast.error('请输入纯数字')
    }else{
      if(radioss === 'wechat'){
        setname('微信')
      }else{
        setname('支付宝')
      }
      // 对输入框和选择框进行判断
      if(!inputss || radioss === null){
        Toast.error('收款金额和收款渠道必须输入')
      }else{
        setvisible(true)
      }
    }
    
  }

//验证字符串是否是数字
function checkNumber(theObj) {
  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(theObj)) {
      return true;
  }
  return false;
  }

  //弹窗取消的回调函数
  function handleCancel(){
    setvisible(false)
  }
  // 监听input框
  function inputs(evemt){
    setinputss(evemt)
  }
  // 监听单选框
  function radios(event){
    setradioss(event.target.value)
  }
  //弹窗的确认回调函数
  function handleOk(){
    // 将数据交给后端
    api.transfer({
      money:inputss,
      channel:name
    }).then((res)=>{
        // 判断是否记录成功
        if(res.status === 200){
          setvisible(false)
          Toast.success('记录成功');
          navigate('/record')
        }else{
          Toast.error('未知原因失败！')
        }
    })
}


  return (
    <div style={{height:'100%'}}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
            <Card bordered={false} >
              <Row>
                <Col span={24}>
                  <span style={{fontSize:'18px'}}>收款金额:</span>
                  <Input prefix={<IconCreditCard />} showClear onChange={inputs} placeholder='请输入收款金额'></Input>
                </Col>
                <Col span={24} style={{marginTop:'50px'}}>
                  <span style={{fontSize:'18px'}}>请选择收款渠道：</span>
                  <RadioGroup type='button'  buttonSize='large' onChange={radios}>
                    <Radio value={'wechat'}>微信</Radio>
                    <Radio value={'alipay'}>支付宝</Radio>
                  </RadioGroup>
                </Col>
              </Row>
              <Button style={{width:'100%',marginTop:'50px'}} theme='solid' onClick={publish}>确认</Button>
            </Card>
        </Col>
        <Modal title="请确认是否正确" visible={visible} style={{width:'100%',height:'200px'}} onCancel={handleCancel} onOk={handleOk}>
            <Descriptions data={[
              {key:'收款金额:',value:inputss},
              {key:'收款渠道:',value:name}
            ]} style={{fontSize:'20px'}}/>
        </Modal>
      </Row>
    </div>
  )
}


export default Transfer