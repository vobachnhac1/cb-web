/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import { Layout, Menu, message } from 'antd';
import React, { useState } from 'react';
const { Header } = Layout;
const { SubMenu } = Menu;
import { UserOutlined } from '@ant-design/icons';

import AccountProfileCustom from '@/components/AccountProfileBase';
import NotificationCustom from '@/components/NotificationBase';
import * as Message from '@/components/message';

const stylesLess = require("./style.module.less");

import logocbb from './images/logo_CB_color_vn.svg'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getters, actions } from '@/redux/global';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HeaderCustom = (props) => {
  const router = useRouter();
  const profile=  useSelector(getters.getProfile)
  const isAuth =  useSelector(getters.getAccessToken)
  const dispatch = useDispatch();
  const [isLeave, setIsLeave] = useState(0);
  const onMouseLeave = () => {
    setIsLeave('0');
  };
  useEffect(()=>{
    if(!isAuth){
      router.replace('/')
    }
  },[isAuth]);

  const  onSignOut =()=>{
    dispatch(actions.SignOut());
  } 
  const onPreview =()=>{
    Message.Info('Thông báo',"Tính năng đang phát triển")
  }
  return (
    <Header style={{ padding: 0, backgroundColor: '#034da2' }} >
      <div
        style={{
          backgroundColor: '#ffff',
          float: 'left',
          width: 230,
          height: 44,
          margin: 10,
          paddingBottom: 48

        }}
      >
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
          <Menu.Item key='Notification' onClick={onPreview}>
            <NotificationCustom />
          </Menu.Item>
          <SubMenu
            className={stylesLess['modified-title']}
            key='AccountSub'
            icon={<UserOutlined />}
            title={profile?.fullname}>
            <Menu.Item key='AccountSub_1' onClick={onPreview}>
              <span>{'Thông tin tài khoản'}</span>
            </Menu.Item>
            {/* <Menu.Item key='AccountSub_2'>{'Cài đặt'}</Menu.Item> */}
            <Menu.Item key='AccountSub_3' onClick={onSignOut}>{'Đăng xuất'}</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  );
};
export default HeaderCustom;
