//这是登录组件
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Divider, Input, Button, Toast } from '@douyinfe/semi-ui';

export default function Login() {
  const [user,setuser] = useState();
  const navigate = useNavigate()
  // 监听input的回调函数
  function onChange(e){
    setuser(e)
    console.log(e)
  }
  //用户登录的回调函数
  function login(){
    if(user === '13828894151'){
      // 生成cookei
      let name = 'users';
      let value = 'rong';
      let time = '900';
      document.cookie = `${name} = ${value}; max-age=${time}`
      Toast.success('登录成功');
      navigate('/transfer')
    }else{
      Toast.error('请检查你的手机号！')
    }
  }

  return (
    <div>
      <Divider margin='12px' align='center'>
        用户登录
      </Divider>
      <Divider margin='22px' align='center'>
        <Input prefix="手机号" onChange={onChange}/>
      </Divider>
      <Divider margin='32px' align='center' >
        <Button theme='solid' type='primary' style={{ marginRight: 8 }} onClick={login}>登录</Button>
      </Divider>      
    </div>
  )
}
