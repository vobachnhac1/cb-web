
import { Layout, Menu } from 'antd';
import { useState } from 'react';
const { Header } = Layout;

import AccountProfileCustom from '@/components/account-profile-base'
import NotificationCustom from '@/components/notification-base'

const HeaderCustom = (props) => {
  const [isLeave, setIsLeave] = useState(0);
  const onMouseLeave = () => {
    setIsLeave("0")
  }
  return (
    <Header style={{ padding: 0 }}>
      <div style={{
        float: 'left',
        width: 180,
        height: 44,
        background: 'rgba(255, 255, 255, 0.3)',
        margin: 10
      }} />
      <div style={{ float: 'right' }} onMouseLeave={onMouseLeave} >
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[isLeave]} selectedKeys={isLeave} style={{ width: "20vw", justifyContent: "end", paddingRight: "1vw" }}>
          <Menu.Item key="Notification">
            <NotificationCustom />
          </Menu.Item>
          <Menu.Item key="AccountSub">
            <AccountProfileCustom />
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  )
}

export default HeaderCustom;