"use client"

import { Layout, Menu } from "antd"
import { DashboardOutlined, BarChartOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"

const { Header, Footer, Sider, Content } = Layout

function SideBar({children}) {
  const pathname = usePathname()
    return (
        <>
        <Layout>
          <Sider width={260} collapsible={true} style={{backgroundColor : '#161616'}}>
            <div className="logo" style={{height : '32px', margin : '16px', textAlign : 'center'}}>
              <span style={{color : 'white', fontSize : '20px', fontWeight : 'bold'}}>DeepFake</span>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]} style={{backgroundColor : '#161616', padding : '16px'}}>
              <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
                <Link href="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/analyze" icon={<BarChartOutlined />}>
                <Link href="/dashboard/analyze">Analyze</Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/settings" icon={<SettingOutlined />}>
                <Link href="/dashboard/settings">Settings</Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/logout" icon={<LogoutOutlined />}>
                <Link href="/dashboard/logout">Logout</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
        <Header style={{ padding: 0, background: '#161616' }} />
        <Content style={{ margin: '24px 16px 0', marginBottom : '24px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 760,
              background: '#161616',
              borderRadius: '12px',
            }}
          >
            content
          </div>
        </Content>
      </Layout>
        </Layout>
        {children}
        </>
    )
}

export default SideBar