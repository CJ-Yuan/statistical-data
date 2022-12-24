// 这是页面布局组件
import React from 'react'
import TopNav from './TopNav';
import { Layout } from '@douyinfe/semi-ui';
import { Outlet } from 'react-router-dom';
function Main() {
    const { Header, Footer, Content } = Layout;
  return (
    <Layout className="components-layout-demo">
        <Header>
            <TopNav />
        </Header>

        <Content>
            <Outlet />
        </Content>
        
        <Footer>
        </Footer>
    </Layout>
  )
}


export default Main