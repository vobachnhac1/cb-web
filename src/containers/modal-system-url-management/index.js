/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-10-08
*------------------------------------------------------- */
require("./styles.less");

import { Card, Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import * as Message from '@/components/message';
import { removeVietnameseTones } from '@/core/constants';
import { getters } from '@/redux/system';

const classNames = require("classnames");
const { Option } = Select;
const { Text } = Typography;

const layoutHeader = {
  xs: { span: 12, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 12, offset: 0 },
  lg: { span: 8, offset: 0 },
};
const layoutContent = {
  xs: { span: 12, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 12, offset: 0 },
  lg: { span: 16, offset: 0 },
};
const ModalURLManagement = (props) => {
  const { callback, visible = false, bodyModel: { update = false, record = null, perSystem =null } } = props;
  const dispatch = useDispatch();
  const _sysList =useSelector(getters.dropdownSysList)
  const _roleList =useSelector(getters.dropdownRoleList)
  // const [_system,setSystem] = useState('')
  // const [_roles,setRole] = useState('')
  // const [perSystem, setPerSystem]= useState('FE');

  const [body, setBody]=  useState(record ? record : {
    roleId:null,
    url:null,
    sysCode:null,
    description:null,
    perSystem: perSystem
  })
  const onChangeSelectPer =(value)=>{
    body?.perSystem
    setPerSystem(value)
  }

  const onCallback = async () => {
    const {url, description}= body;
    if (!url || url.length == 0) {
      Message.Warning("Thông Báo", "Đường dẫn URL không được để trống!");
      return;
    }
    callback({...body, visible:true})
  }
  const onCancel = () => {
    callback({ visible: false });
  }
  return (
    <Modal
      width={500}
      maskClosable={false}
      closable={false}
      centered
      visible={visible}
      okText={'Xác nhận'}
      cancelText={'Thoát'}
      onOk={onCallback}
      onCancel={onCancel}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgb(3, 77, 162)" }}
        title={update ? "Thêm thông tin cấp quyền URL" : 'Cập nhật thông tin cấp quyền URL'}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Hệ thống'}</Text>
            </Col>
            <Col {...layoutContent} >             
              <Select 
              // disabled={true}
                style={{ width: '100%' }}
                defaultValue=""
                value={body?.systemCode}
                onChange={(value) => setBody({...body, sysCode: value})}>
                {_sysList?.map((item, key) => (
                  <Select.Option value={item.sysCode} key={key}>{item.sysName}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Chức vụ'}</Text>
            </Col>
            <Col {...layoutContent} >             
              <Select 
                style={{ width: '100%' }}
                defaultValue=""
                value={body?.roleId}
                onChange={(value) => setBody({...body, roleId: value})}>
                {_roleList?.map((item, key) => (
                  <Select.Option value={item.roleId} key={key}>{item.roleName}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Quyền'}</Text>
            </Col>
            <Col {...layoutContent} >             
              <Select
                  placeholder="Quyền hệ thống"
                  style={{ width: '100%' }}
                  defaultValue={'FE'}
                  value={body?.perSystem}
                  onChange={(value)=>setBody({...body, perSystem: value})}
                >
                  <Select.Option value={'BE'} key={'BE'}> {'Quyền Server'}</Select.Option>
                  <Select.Option value={'FE'} key={'FE'}> {'Quyền Client'}</Select.Option>
                </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Đường dẫn cấp quyền'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={body?.url}
                onChange={(text) => setBody({
                  ...body,
                  url: text.target.value
                })} />
            </Col>    
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Mô tả chi tiết'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={body?.description}
                onChange={(text) => setBody({
                  ...body,
                  description: text.target.value
                })}  />
            </Col>    
          </Row>                   
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalURLManagement;