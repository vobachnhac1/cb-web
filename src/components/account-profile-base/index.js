import React from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const AccountProfile = () => {
  return (
    <>
      <SubMenu key="AccountSub" icon={<UserOutlined />} title="Nhac Vo">
        <Menu.Item key="AccountSub_1">
          <spans>
            {'Profile'}
          </spans>
        </Menu.Item>
        <Menu.Item key="AccountSub_2">{'Setting'}</Menu.Item>
        <Menu.Item key="AccountSub_3">{'Sign Out'}</Menu.Item>
      </SubMenu>
    </>
  );
};
export default AccountProfile;