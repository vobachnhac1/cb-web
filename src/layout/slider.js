/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import {
  AliyunOutlined,
  CodepenCircleOutlined,
  CodepenOutlined,
  CodeSandboxOutlined

} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout;
import __isArray from 'lodash/isArray';
import __isEmpty from 'lodash/isEmpty';
import _ from 'lodash';
import classes from './style.module.less';

// qui tắc đặt tên => sub['tên'] (cha) => lấy ra con => nếu lấy 2/3 con thì ghi rõ thằng con được lấy

// lưu quyền dưới database =>
const menu = [
  {
    key: 'subTopic',
    parentKey: null,
    path: '/admin/topic',
    icon: <CodepenOutlined />,
    title: 'Topic',
    child: null,
  }, {
    key: 'subWheel',
    parentKey: null,
    path: '/admin/wheel',
    icon: <CodeSandboxOutlined />,
    title: 'Wheel',
    child: null,
  }, {
    key: 'subWheelDetail',
    parentKey: null,
    path: '/admin/wheel-detail',
    icon: <AliyunOutlined />,
    title: 'Wheel Detail',
    child: null,
  }, {
    key: 'subSegment',
    parentKey: null,
    path: '/admin/segment',
    icon: <CodepenCircleOutlined />,
    title: 'Segment',
    child: null,
  },
];
const permission = [
  {
    parent: 'subTopic',
    child: null,
  }, {
    parent: 'subWheel',
    child: null,
  }, {
    parent: 'subWheelDetail',
    child: null,
  }, {
    parent: 'subSegment',
    child: null,
  },
];


const SliderCustom = (props) => {
  const [collapsed, toggleCollapsed] = useState(false);
  const [mapArrScreen, setMapArrScreen] = useState([]);
  useEffect(() => {
    const arrScreen = permission.map((item) => {
      let arrTemp = [];
      let arrChild = [];
      menu.forEach((element) => {
        //check thằng parent tồn
        if (element.key === item.parent) {
          //check thàng child tồn tại
          if (element.child && element.child.length > 0) {
            arrChild = item.child.map((childMenu) => {
              let arrExistInChild = element.child.filter(
                (itemMenu) => itemMenu.key == childMenu
              );
              return _.head(arrExistInChild) || {};
            });
          }
          arrTemp = {
            ...element,
            child: arrChild.filter((isExist) => isExist.key),
          };
        }
      });
      return arrTemp;
    });
    setMapArrScreen(arrScreen);
  }, []);

  const renderItemMenu = (item) => {
    const { key, title, path, child, icon } = item;
    if (__isArray(child) && !__isEmpty(child)) {
      return renderSubMenu(item);
    }
    return (
      <Menu.Item key={key} icon={icon}>
        {/* <span>{title}</span> */}
        <Link href={path}>
          <a>{title}</a>
        </Link>
      </Menu.Item>
    );
  };

  const renderSubMenu = (group) => {
    const { key, title, child, icon } = group;
    return (
      <SubMenu key={key} title={title} icon={icon} >
        {child.map(renderItemMenu)}
      </SubMenu>
    );
  };

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={() => toggleCollapsed(!collapsed)}
    >
      <Menu
        mode='inline'
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {mapArrScreen.map(renderItemMenu)}
      </Menu>
    </Sider>
  );
};

export default SliderCustom;
