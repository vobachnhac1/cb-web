import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout;
import __isArray from 'lodash/isArray';
import __isEmpty from 'lodash/isEmpty';
import _ from 'lodash';

// qui tắc đặt tên => sub['tên'] (cha) => lấy ra con => nếu lấy 2/3 con thì ghi rõ thằng con được lấy

// lưu quyền dưới database =>
const menu = () => {
  return [
    {
      key: 'subAdmin',
      parentKey: null,
      path: '/admin',
      icon: <UserOutlined />,
      title: 'Admin Management',
      child: [
        {
          key: 'admin1',
          parentKey: 'subAdmin',
          title: 'Admin 1',
          icon: null,
          path: '/admin/user/12345',
          child: null,
        },
        {
          key: 'admin2',
          parentKey: 'subAdmin',
          title: 'Admin 2',
          icon: null,
          path: '/admin',
          child: null,
        },
        {
          key: 'admin3',
          parentKey: 'subAdmin',
          title: 'Admin 3',
          icon: null,
          path: '/admin',
          child: null,
        },
      ],
    },
    {
      key: 'subSetting',
      parentKey: null,
      path: '/settings',
      icon: <LaptopOutlined />,
      title: 'Setting Management',
      child: null,
    },
    {
      key: 'subEvent',
      parentKey: null,
      path: '/event',
      icon: <NotificationOutlined />,
      title: 'Event Management',
      child: [
        {
          key: 'event1',
          parentKey: 'subEvent',
          path: '/event',
          icon: null,
          title: 'Event 1',
          child: null,
        },
        {
          key: 'event2',
          parentKey: 'subEvent',
          path: '/event',
          icon: null,
          title: 'Event 2',
          child: null,
        },
        {
          key: 'event3',
          parentKey: 'subEvent',
          path: '/event',
          icon: null,
          title: 'Event 3',
          child: null,
        },
      ],
    },
  ];
};
const permission = [
  {
    parent: 'subAdmin',
    child: ['admin1', 'admin3'],
  },
  {
    parent: 'subEvent',
    child: ['event1', 'event2', 'event4'],
  },
  {
    parent: 'subSetting',
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
      menu().forEach((element) => {
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
      <SubMenu key={key} title={title} icon={icon}>
        {child.map(renderItemMenu)}
      </SubMenu>
    );
  };

  return (
    <Sider
      width={250}
      className='site-layout-background'
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
