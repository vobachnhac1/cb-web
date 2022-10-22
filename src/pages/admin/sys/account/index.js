/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-10-07
*------------------------------------------------------- */
require("./styles.less");
import { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Table, DatePicker, Typography, Popconfirm } from 'antd';
import moment from 'moment';
import __ from 'lodash';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import * as Message from '@/components/message';

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import Text from 'antd/lib/typography/Text';
import { actions, getters } from '@/redux/system';
import ModalAccountManagement from '@/containers/modal-system-account';

const STATUS_ACCOUNT = {
  '1':'Hoạt động',
  '2':'Không Hoạt động',
  '3':'Tạm khóa',
}

export default function AccountManagement(props) {
  const dispatch = useDispatch();

  const [perSys, setSys]= useState(null);
  const [perSysRoles, setSysRole]= useState(null);

  const accountList = useSelector(getters.getAccountList);
  const listRoles = useSelector(getters.getRolesList);
  const listSystem = useSelector(getters.getSystemList);

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
    }, {
      align: 'center',
      title: 'Tài khoản',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },  {
      align: 'center',
      title: 'Tên đầy đủ',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 100,
    }, {
      width: 100,
      title: 'Chức vụ',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (text) => (
        <Text>{text ? listRoles?.find(item=>item.roleId ==text)?.roleName: ''}</Text>

      ),
    }, {
      width: 100,
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Text>{text ? STATUS_ACCOUNT[text]: ''}</Text>
      ),
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
    },{
      align: 'center',
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateAcount(record)} >Cập nhật</Button>
              <Popconfirm title="Bạn có muốn?" onConfirm={() => deleteAcount(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
          </Popconfirm>
        </Space>

      ),
    },

  ];

  const initPage = async ()=>{
    const res = await dispatch(actions.setAccountList());
    await dispatch(actions.setSystemList());
    await dispatch(actions.setRolesList());
  }
  const onSearch =()=>{initPage()}

  const insertAccount =()=>{
    setRecord(null)
    setUpdate(false)
    setOpen(true)
  }
  const updateAcount =(value)=>{
    setRecord(value)
    setUpdate(true)
    setOpen(true)
  }
  const deleteAcount =(value)=>{
    Message.Info("Thông Báo", "Tính năng đang phát triển");
  }
  
  const callbackComfirm = async (value)=>{
    if(!value.visible){
      setOpen(false)
      return;
    }
    if(update){
      const {userId, fullname, password, newPassword, roleId, description, id, status, systemCode}= value;
      const param ={
        id: id,
        userId: userId,
        fullname: fullname,
        password: password,
        newPassword: newPassword,
        roleId: roleId,
        description: description,
        status: status,
        systemCode: systemCode
      }
      const result = await dispatch(actions.updateAccount(param));
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
      const {userId, fullname, password, newPassword, roleId, description, status, systemCode}= value;
      const param = {        
        userId: userId,
        fullname: fullname,
        password: password,
        newPassword: newPassword,
        roleId: roleId,
        description: description,
        status: status,
        systemCode: systemCode
      }
      const result = await dispatch(actions.insertAccount(param));
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
        { open && <ModalAccountManagement  callback ={callbackComfirm} visible={ open }
         bodyModel={{
        record: record, 
        update : update

      }}/>}
      <Col style={{ marginBottom: 30 }}>
        <Card
        headStyle={{
          fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
        }}
        title="Quản lí thông tin tài khoản"
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]} style={{ marginTop: 10 }}>                
                <Col className="gutter-row" span={3}>
                  <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch} >Tìm kiếm</Button>
                </Col>
                <Col className="gutter-row" span={3}>
                  <Button type='primary' size='middle' style={{ width: '100%' }} onClick={insertAccount}>Thêm</Button>
                </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              columns={columns}
              dataSource={accountList}
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

