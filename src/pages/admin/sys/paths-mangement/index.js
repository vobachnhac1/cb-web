/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-10-07
*------------------------------------------------------- */
require("./styles.less");
import { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Table, DatePicker, Typography, Popconfirm, Select } from 'antd';
import moment from 'moment';
import __ from 'lodash';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import * as Message from '@/components/message';

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import Text from 'antd/lib/typography/Text';
import { actions, getters } from '@/redux/system';
import ModalURLManagement from '@/containers/modal-system-url-management';

export default function PathsManagement(props) {
  const [perSystem, setPerSystem] = useState('FE');
  const [perSys, setSys] = useState(null);
  const [perSysRoles, setSysRole] = useState(null);

  const pathsFEList = useSelector(getters.getPathsFEList);
  const pathsBEList = useSelector(getters.getPathsBEList);
  const listRoles = useSelector(getters.getRolesList);
  const listSystem = useSelector(getters.getSystemList);

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [record, setRecord] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    const params = {
      roleId: perSysRoles,
      systemCode: perSys,
      perSystem: perSystem,
    }
    await dispatch(actions.setPathsList(params))
    await dispatch(actions.setSystemList());
    await dispatch(actions.setRolesList());
  }

  const insertSysPerURL = () => {
    setUpdate(false)
    setOpen(true)
  }

  const onSearch = async () => {
    const params = {
      roleId: perSysRoles,
      systemCode: perSys,
      perSystem: perSystem,
    }
    await dispatch(actions.setPathsList(params))
  }

  const onChangeSelectRoles = (value) => {
    setSysRole(value)
  }

  const onChangeSelectPer = (value) => {
    setPerSystem(value)
  }

  const onChangeSelectSys = (value) => {
    setSys(value)
  }

  const updateSysPerURL = (value) => {
    setRecord(value)
    setUpdate(true)
    setOpen(true)
  }

  const deleteSysPerURL = async (value) => {
    const param = `/${value.id}/${true}/${value.systemCode}`
    const result = await dispatch(actions.deleteSysPerURL(param));
    if (result.success) {
      Message.Success("Thông Báo", result.message);
      initPage();
      return;
    }
    Message.Error("Thông Báo", result.message);
  }

  const callbackComfirm = async (value) => {
    if (!value.visible) {
      setOpen(false)
      return;
    }
    if (update) {
      const { roleId, sysCode, url, description, id, perSystem } = value;
      if (!sysCode) {
        Message.Success("Thông Báo", "Hệ thống không được để trống");
        return;
      }
      if (!perSystem) {
        Message.Success("Thông Báo", "Quyền");
        return;
      }
      if (!roleId) {
        Message.Success("Thông Báo", "Chức vụ không để trống");
        return;
      }
      const param = {
        roleId: roleId,
        systemCode: sysCode,
        url: url,
        description: description,
        id: id,
        perSystem: perSystem,
      }
      console.log('param: ', param);
      const result = await dispatch(actions.updateSysPerURL(param));

      if (result.success) {
        setOpen(false)
        setUpdate(false)
        setRecord(null)
        Message.Success("Thông Báo", result.message);
        initPage();
        return;
      }
      Message.Error("Thông Báo", result.message);
      // call API update
    } else {
      const param = {
        perSystem: value.perSystem,
        roleId: value.roleId,
        systemCode: value.sysCode,
        url: value.url,
        description: value.description
      }
      const result = await dispatch(actions.insertSysPerURL(param));
      if (result.success) {
        setOpen(false)
        setUpdate(false)
        setRecord(null)
        Message.Success("Thông Báo", result.message);
        initPage();
        return;
      }
      Message.Error("Thông Báo", result.message);
    }
  }

  const columns = [
    // {
    //   dataIndex: 'key',
    //   key: 'key',
    //   fixed: 'left',
    //   width: 0
    // },
    {
      align: 'center',
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 50,
    }, {
      align: 'center',
      title: 'Chức vụ',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 100,
    }, {
      width: 150,
      title: 'Nội dung URL',
      dataIndex: 'url',
      key: 'url',
    }, {
      width: 180
      ,
      title: 'Hệ thống phòng ban',
      dataIndex: 'systemName',
      key: 'systemName',
    }, {
      width: 100,
      title: 'Tên màn hình',
      dataIndex: 'description',
      key: 'description',
    }, {
      align: 'center',
      width: 120,
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),
    }, {
      width: 100,
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
    }, {
      align: 'center',
      width: 120,
      title: 'Ngày cập nhật',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),

    }, {
      width: 100,
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    }, {
      align: 'center',
      title: 'Chức năng',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateSysPerURL(record)} >Cập nhật</Button>
          <Popconfirm title="Bạn có muốn?" onConfirm={() => deleteSysPerURL(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
            <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
          </Popconfirm>
        </Space>

      ),
    },
  ];

  return (
    <LayoutHome>
      {open && <ModalURLManagement callback={callbackComfirm} visible={open}
        bodyModel={{
          record: record,
          update: update,
          perSystem: perSystem

        }} />}
      <Col style={{ marginBottom: 30 }}>
        <Card
          headStyle={{
            fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
          }}
          title="Quản lý Phân quyền URL theo chức vụ"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]} style={{ marginTop: 10 }}>
              <Col className="gutter-row" span={6}>
                <Select
                  placeholder="Hệ thống (Phòng Ban)"
                  style={{ width: '100%' }}
                  defaultValue={'FE'}
                  value={perSys}
                  onChange={onChangeSelectSys}
                >
                  {listSystem?.map(item => <Select.Option value={item.sysCode} key={item.sysCode}> {item.sysName}</Select.Option>)}
                </Select>
              </Col>
              <Col className="gutter-row" span={6}>
                <Select
                  placeholder="Chức vụ"
                  style={{ width: '100%' }}
                  defaultValue={'FE'}
                  value={perSysRoles}
                  onChange={onChangeSelectRoles}
                >
                  {listRoles?.map(item => <Select.Option value={item.roleId} key={item.roleId}> {item.roleName}</Select.Option>)}
                  {/* <Select.Option value={'BE'} key={'BE'}> {'Quyền Server'}</Select.Option>
                  <Select.Option value={'FE'} key={'FE'}> {'Quyền Client'}</Select.Option> */}
                </Select>
              </Col>
              <Col className="gutter-row" span={6}>
                <Select
                  placeholder="Quyền hệ thống"
                  style={{ width: '100%' }}
                  defaultValue={'FE'}
                  value={perSystem}
                  onChange={onChangeSelectPer}
                >
                  <Select.Option value={'BE'} key={'BE'}> {'Quyền Server'}</Select.Option>
                  <Select.Option value={'FE'} key={'FE'}> {'Quyền Client'}</Select.Option>
                </Select>
              </Col>

              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch} >Tìm kiếm</Button>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={insertSysPerURL}>Thêm</Button>
              </Col>
            </Row>
          </Col>
        </Card>

        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              columns={columns}
              dataSource={perSystem == 'FE' ? pathsFEList : pathsBEList}
              size='small'
              scroll={{ x: 1300, y: '45vh' }}
              loading={false}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome >
  )
}

