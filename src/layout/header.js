/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import { Layout, Menu, message } from 'antd';
import React, { useState, memo, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import ModalProfile from '@/containers/modal-profile';
import { getters, actions } from '@/redux/global';
import { actions as actDashboard } from '@/redux/dashboard';
import { actions as actEventWheel } from '@/redux/event-wheel';
import { actions as actManageCb } from '@/redux/manager-cb-coin';
import { actions as actManageDetailCb } from '@/redux/manager-detail-cb-coin';
import { actions as actRules } from '@/redux/rules';
import { actions as actSegment } from '@/redux/segment';
import { actions as actSystem } from '@/redux/system';
import { actions as actTopic } from '@/redux/topic';
import { actions as actWheel } from '@/redux/wheel';
import { actions as actWheelDet } from '@/redux/wheel-detail';
import { actions as actWheelPM } from '@/redux/wheel-popup-menu';

const HeaderCustom = (props) => {
  const [visibleProfile, setVisibleProfile] = useState(false);
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

  const onSignOut =()=>{

    dispatch(actions.SignOut());
    dispatch(actDashboard.SignOut());
    dispatch(actEventWheel.SignOut());
    dispatch(actManageCb.SignOut());
    dispatch(actManageDetailCb.SignOut());
    dispatch(actRules.SignOut());
    dispatch(actSegment.SignOut());
    dispatch(actSystem.SignOut());
    dispatch(actTopic.SignOut());
    dispatch(actWheel.SignOut());
    dispatch(actWheelDet.SignOut());
    dispatch(actWheelPM.SignOut());
  } 
  const onPreview =()=>{
    setVisibleProfile(true);
  }
  
  const onCallback =(value)=>{
    setVisibleProfile(value);
  }

  const onNotify
   =()=>{
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
          <Menu.Item key='Notification' onClick={onNotify}>
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

      { visibleProfile? <ModalProfile callback ={onCallback} visible={visibleProfile} />:<></>}
    </Header>
  );
};
export default memo(HeaderCustom) ;
