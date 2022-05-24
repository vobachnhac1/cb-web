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
import { useRouter } from 'next/router';
import { element } from 'prop-types';

// qui tắc đặt tên => sub['tên'] (cha) => lấy ra con => nếu lấy 2/3 con thì ghi rõ thằng con được lấy

// lưu quyền dưới database =>
const menu = [
  {
    key: 'subTopic',
    parentKey: null,
    path: '/admin/topic',
    icon: <CodepenOutlined />,
    title: '1 Chủ Đề',
    child: null,
  }, {
    key: 'subWheel',
    parentKey: null,
    path: '/admin/wheel',
    icon: <CodeSandboxOutlined />,
    title: '3 Vòng Quay',
    child: null,
  }, {
    key: 'subSegment',
    parentKey: null,
    path: '/admin/segment',
    icon: <CodepenCircleOutlined />,
    title: '2 Giải thưởng',
    child: null,
  }, {
    key: 'subRules',
    parentKey: null,
    path: '/admin/rules',
    icon: <AliyunOutlined />,
    title: '4 Quy tắc',
    child: [
      {
        key: 'viewRules',
        parentKey: 'subRules',
        path: '/admin/rules/management',
        icon: <AliyunOutlined />,
        title: 'Quản lý quy tắc',
        child: null,
      }, {
        key: 'subWheelApprove',
        parentKey: 'subRules',
        path: '/admin/rules/wheel-approve',
        icon: <AliyunOutlined />,
        title: 'Phê duyệt vòng quay',
        child: null,
      }, {
        key: 'subRulesReward',
        parentKey: 'subRules',
        path: '/admin/rules/reward-generate',
        icon: <AliyunOutlined />,
        title: 'Tạo phần thưởng tự động',
        child: null,
      }, {
        key: 'subRewardHistory',
        parentKey: 'subRules',
        path: '/admin/rules/reward-history',
        icon: <AliyunOutlined />,
        title: 'Danh sách trao thưởng',
        child: null,
      }
    ],
  },
];

const permission = [
  {
    parent: 'subTopic',
    child: null,
  }, {
    parent: 'subSegment',
    child: null,
  }, {
    parent: 'subWheel',
    child: null,
  }, {
    parent: 'subRules',
    child: ['viewRules', 'subRulesReward', , 'subRewardHistory']
  },
  // 'subWheelApprove',
];



const SliderCustom = (props) => {
  const router = useRouter();
  const [collapsed, toggleCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [isChoosed, setIsChoosed] = useState(null);
  const [rootSubmenuKeys, setRootSubmenuKeys] = useState([]);
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
    const path = router.pathname;
    let keyChoose = null;
    arrScreen.forEach(item => {
      if (item.path == path) {
        keyChoose = item.key
      } else {
        if (item.child && item.child.length > 0) {
          item.child.forEach(element => {
            if (element.path == path) {
              keyChoose = element.key
              setOpenKeys([item.key]);
            }
          })
        }
      }
    })
    setMapArrScreen(arrScreen);
    setRootSubmenuKeys(arrScreen.map(item => item.key));
    setIsChoosed(keyChoose);
  }, []);

  const renderItemMenu = (item) => {
    const { key, title, path, child, icon } = item;
    if (__isArray(child) && !__isEmpty(child)) {
      return renderSubMenu(item);
    }
    return (
      <Menu.Item key={key} icon={icon}>
        <Link href={path} >
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

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  return (
    <Sider
      // onMouseLeave={() => toggleCollapsed(true)}
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={() => toggleCollapsed(!collapsed)}
    >
      <Menu
        mode='inline'
        onOpenChange={onOpenChange}
        selectedKeys={isChoosed}
        openKeys={openKeys}
        style={{ height: '100%', borderRight: 0 }}
      >
        {mapArrScreen.map(renderItemMenu)}
      </Menu>
    </Sider>

  );
};

export default SliderCustom;
