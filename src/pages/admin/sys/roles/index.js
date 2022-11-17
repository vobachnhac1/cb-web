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
import ModalRoleManagement from '@/containers/modal-system-role-management';

export default function RolesManagement(props) {
  const dispatch = useDispatch();
  const roleList = useSelector(getters.getRolesList);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [record, setRecord] = useState(null);

  useEffect(()=>{
    initPage();
  },[]);

  const columns = [
    {
      align: 'center',
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 50,
    }, 
    // {
    //   align: 'center',
    //   title: 'Mã chức vụ',
    //   dataIndex: 'roleId',
    //   key: 'roleId',
    //   width: 100,
    // },  
    {
      align: 'center',
      title: 'Chức vụ',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 100,
    }, {
      width: 100,
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },  {
      align: 'center',
      width: 120,
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),
    },{
      width: 100,
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
    }, {
      align: 'center',
      width: 120,
      title: 'Ngày cập nhật',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),

    }, {
      width: 100,
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    },{
      align: 'center',
      title: 'Chức năng',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateSysRole(record)} >Cập nhật</Button>
              <Popconfirm title="Bạn có muốn?" onConfirm={() => deleteSysRole(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
          </Popconfirm>
        </Space>

      ),
    },

  ];

  const initPage = async ()=>{
    const res = await dispatch(actions.setRolesList());
  }

  const onSearch =()=>{initPage()}

  const insertSysRole =()=>{
    setRecord(null)
    setUpdate(false)
    setOpen(true)
  }

  const updateSysRole =(value)=>{
    setRecord(value)
    setUpdate(true)
    setOpen(true)
  }

  const deleteSysRole = async (value)=>{
    // NẾU XÓA THÌ PHẢI CHECK TOÀN BỘ TABLE ĐANG DÙNG MÃ ROLES ĐANG DÙNG NẾU EXIST THÌ KHÔNG ĐƯỢC XÓA : CỤ THỂ TABLE CB_SYS_ACCOUNT, CB_SYS_PER_URL_BE, CB_SYS_PER_URL_FE
    // HIỆN TẠI THÌ CHƯA CÓ CHECK
    const param = `/${value.roleId}/${true}`
    const result = await dispatch(actions.deleteSysRole(param));
    if(result.success){
      Message.Success("Thông Báo", result.message);
      initPage();
      return;
    }
    Message.Error("Thông Báo", result.message);
  }

  const callbackComfirm = async (value)=>{
    if(!value.visible){
      setOpen(false)
      return;
    }
    if(update){
      const param ={
        roleId: value.roleId,
        roleName: value.roleName,
        description: value.description
      }
      const result = await dispatch(actions.updateSysRole(param));
      if(result.success){
        setOpen(false)
        setUpdate(false)
        setRecord(null)
        Message.Success("Thông Báo", result.message);
        initPage();
        return;
      }
      Message.Error("Thông Báo", result.message);
      // call API update
    }else{
      const param ={
        roleId: value.roleId,
        roleName: value.roleName,
        description: value.description
      }
      const result = await dispatch(actions.insertSysRole(param));
      if(result.success){
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

  return (
    <LayoutHome>
      { open && <ModalRoleManagement  callback ={callbackComfirm} visible={ open } bodyModel={{
        record: record, update : update
      }}/>}
    <Col style={{ marginBottom: 30 }}>
          <Card
          headStyle={{
            fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
          }}
          title="Quản lý Chức vụ"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
            <Col span={48} >
              <Row gutter={[16, 24]} style={{ marginTop: 10 }}>                
                  <Col className="gutter-row" span={3}>
                    <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch} >Tìm kiếm</Button>
                  </Col>
                  <Col className="gutter-row" span={3}>
                    <Button type='primary' size='middle' style={{ width: '100%' }} onClick={insertSysRole}>Thêm</Button>
                  </Col>
              </Row>
            </Col>
          </Card>

          <div style={{ marginTop: 20 }} />
          <Card>
            <Col span={48} style={{ marginTop: 10 }}>
              <Table
                columns={columns}
                dataSource={roleList}
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

