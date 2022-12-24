import React,{useEffect} from 'react'
import router from './router'
import BeforeEnter from './router/beforeEnter'
import { useNavigate,useLocation } from 'react-router-dom'
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname === '/'){
      navigate('/transfer')
    }

  })
  return (
    <BeforeEnter routers={router}/>
  )
}


export default App