// 这是顶部导航组件
import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { Nav } from '@douyinfe/semi-ui';

function BottomNav() {
  // 保存选中的状态
  const [path,setpath] = useState('');
  const navigate =  useNavigate();
  const location = useLocation();
    const item = [
        { itemKey: 'transfer', text: '资金转入'},
        { itemKey: 'record', text: '转入记录'},
        { itemKey: 'statistics', text: '资金统计'},
    ]
    // 点击时的回调，比onClick好用
    function onSelect(event){
      let path = event.itemKey;
      setpath(path)
      navigate(path)
    }

    useEffect(()=>{
      // 拿到路径信息，在用正则删除斜杠
      const pts = location.pathname;
      let paths = pts.replace(/\//g,'')
      setpath(paths)
    },[location,setpath])

  return (
    <div style={{ width: '100%'}}>
        <Nav style={{backgroundColor:'rgba(var(--semi-pink-1), 1)'}}  
        mode={'horizontal'} 
        items={item} 
        onSelect={onSelect} 
        selectedKeys={[path]}/>
    </div>
  )
}

export default BottomNav