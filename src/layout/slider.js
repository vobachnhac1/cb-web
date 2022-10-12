/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
* Update: 2022/10/12 - Nhacvb : phân quyền URL 
*------------------------------------------------------- */
import React, { useEffect, useState,memo } from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import {
  AliyunOutlined,
  CodepenCircleOutlined,
  CodepenOutlined,
  CodeSandboxOutlined,
  SwapOutlined,
  UsergroupAddOutlined

} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout;
import __isArray from 'lodash/isArray';
import __isEmpty from 'lodash/isEmpty';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { element } from 'prop-types';
import { getters } from '@/redux/global';
import { useSelector } from 'react-redux';

// qui tắc đặt tên => sub['tên'] (cha) => lấy ra con => nếu lấy 2/3 con thì ghi rõ thằng con được lấy

// lưu quyền dưới database =>
const menu = [
  {
    key: 'subUser',
    parentKey: null,
    path: '/admin/user',
    icon: <UsergroupAddOutlined />,
    title: ' Danh sách User',
    child: null,
  },
  {
    key: 'subTopic',
    parentKey: null,
    path: '/admin/topic',
    icon: <CodepenOutlined />,
    title: 'Chương trình Digital Loyalty',
    child: null,
  }, {
    key: 'subWheel',
    parentKey: null,
    path: '/admin/wheel',
    icon: <CodeSandboxOutlined />,
    title: ' Vòng Quay',
    child: null,
  }, {
    key: 'subSegment',
    parentKey: null,
    path: '/admin/segment',
    icon: <CodepenCircleOutlined />,
    title: ' Giải thưởng',
    child: null,
  }, {
    key: 'subRules',
    parentKey: null,
    path: '/admin/rules',
    icon: <AliyunOutlined />,
    title: ' Quy tắc',
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
  {
    key: 'subManager-CbCoin',
    parentKey: null,
    path: '/admin/manager-cb-coin',
    icon: <SwapOutlined />,
    title: 'Quản lý hệ thống tích điểm',
    child: null,
  },
  {
    key: 'subSys',
    parentKey: null,
    path: '/admin/sys',
    icon: <SwapOutlined />,
    title: 'Quản lý thống',
    child: [
      {
        key: 'subSytem',
        parentKey: 'subSys',
        path: '/admin/sys/manager',
        icon: <AliyunOutlined />,
        title: 'Quản lý phòng Ban',
        child: null,
      },
      {
        key: 'subSysAccount',
        parentKey: 'subSys',
        path: '/admin/sys/account',
        icon: <AliyunOutlined />,
        title: 'Danh sách tài khoản',
        child: null,
      },
      {
        key: 'subSysPaths',
        parentKey: 'subSys',
        path: '/admin/sys/paths-mangement',
        icon: <AliyunOutlined />,
        title: 'Quản lý phân quyền URL',
        child: null,
      },
      {
        key: 'subSysRoles',
        parentKey: 'subSys',
        path: '/admin/sys/roles',
        icon: <AliyunOutlined />,
        title: 'Quản lý Phân quyền',
        child: null,
      }
    ],
  },
];

const permission = [
  {
    parent: 'subUser',
    child: null,
  },
  {
    parent: 'subTopic',
    child: null,
  },
  {
    parent: 'subSegment',
    child: null,
  }, {
    parent: 'subWheel',
    child: null,
  }, {
    parent: 'subRules',
    child: ['viewRules', 'subRulesReward', 'subRewardHistory']
  },
  {
    parent: 'subManager-CbCoin',
    child: null,
  },
  {
    parent: 'subSys',
    child: ['subSytem','subSysAccount','subSysPaths','subSysRoles'],
  },
];


const SliderCustom = (props) => {
  const router = useRouter();
  const [collapsed, toggleCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [isChoosed, setIsChoosed] = useState(null);
  const [rootSubmenuKeys, setRootSubmenuKeys] = useState([]);
  const [mapArrScreen, setMapArrScreen] = useState([]);
  const arrPaths =  useSelector(getters.getPermissionPath)
  useEffect(() => {
    const arrScreen = permission.map((item) => {
      let arrTemp = [];
      let arrChild = [];
      let arrChildTemp = [];
      menu.forEach((element) => {
        if(arrPaths){
          const _filter = arrPaths?.filter(item=> item == element.path)
          if(_filter && _filter.length > 0){
            if (element.key === item.parent) {
              //check thàng child tồn tại
              if (element.child && element.child.length > 0) {
                arrChild = item.child.map((childMenu) => {
                  let arrExistInChild = element.child.filter(
                    (itemMenu) => itemMenu.key == childMenu
                  );
                  return _.head(arrExistInChild) || {};
                });
                // check path có được cấp quyền không
                arrPaths.forEach(elll=>{
                    let __child =  arrChild.filter(_path=> elll == _path.path)
                    if(__child && __child.length >0){
                      arrChildTemp.push(_.head(__child))
                    }
                })
              }
              arrTemp = {                
                ...element,
                child: arrChildTemp.filter((isExist) => isExist.key),
              };
            }
          }
        } else{
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
        }        
      });
      return arrTemp;
    });
    const path = router.pathname;
    let keyChoose = null;
    const arrScreenFM =  arrScreen.filter(item => item.key)
    arrScreenFM.filter(item => item.key).forEach(item => {
      
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
    setMapArrScreen(arrScreenFM);
    setRootSubmenuKeys(arrScreenFM.map(item => item.key));
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

export default  memo(SliderCustom);
