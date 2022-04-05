/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Header } = Layout;
const { SubMenu } = Menu;
import { UserOutlined } from '@ant-design/icons';

import AccountProfileCustom from '@/components/AccountProfileBase';
import NotificationCustom from '@/components/NotificationBase';

const stylesLess = require("./style.module.less");

import logocbb from './images/logocb.jpg'
import Image from 'next/image';

const HeaderCustom = (props) => {
  const [isLeave, setIsLeave] = useState(0);
  const onMouseLeave = () => {
    setIsLeave('0');
  };
  return (
    <Header style={{ padding: 0, backgroundColor: '#034da2' }} >
      <div
        style={{
          backgroundColor: '#034da2',
          float: 'left',
          width: 230,
          height: 44,
          margin: 10,
        }}
      >
        {/* <img
          style={{
            float: 'left',
            width: 230,
            height: 44,
          }}
          src={logocbb}
          alt="logocbb"
        /> */}
        	<Image
            width={230}
            height={44}
            src={logocbb}
            alt="logocbb"
          />
      
      </div>
      <div style={{ marginTop: 1, float: 'right' }} onMouseLeave={onMouseLeave}>
        <Menu
          mode='horizontal'
          defaultSelectedKeys={[isLeave]}
          selectedKeys={isLeave}
          className={stylesLess['header-sub']}
        >
          <Menu.Item key='Notification'>
            <NotificationCustom />
          </Menu.Item>
          <SubMenu
            className={stylesLess['modified-title']}
            key='AccountSub'
            icon={<UserOutlined />}
            title='Nhac Vo'>
            <Menu.Item key='AccountSub_1'>
              <span>{'Profile'}</span>
            </Menu.Item>
            <Menu.Item key='AccountSub_2'>{'Setting'}</Menu.Item>
            <Menu.Item key='AccountSub_3'>{'Sign Out'}</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  );
};
export default HeaderCustom;
