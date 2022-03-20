/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
require("./style.module.less");

const { SubMenu } = Menu;

const AccountProfile = () => {
  return (
    <>
      <SubMenu
        key='AccountSub'
        icon={<UserOutlined />}
        title='Nhac Vo'>
        <Menu.Item key='AccountSub_1'>
          <spans>{'Profile'}</spans>
        </Menu.Item>
        <Menu.Item key='AccountSub_2'>{'Setting'}</Menu.Item>
        <Menu.Item key='AccountSub_3'>{'Sign Out'}</Menu.Item>
      </SubMenu>
    </>
  );
};
export default AccountProfile;
