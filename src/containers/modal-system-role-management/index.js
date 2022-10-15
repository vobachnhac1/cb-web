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
const ModalRoleManagement = (props) => {
  const { callback, visible = false, bodyModel: { update = false, record = null } } = props;
  const dispatch = useDispatch();
  const [body, setBody]=  useState(record ? record : {
    roleId:null,
    roleName:null,
    description:null
  })

  const onCallback = async () => {
    const {roleName, description}= body;
    if (!roleName || roleName.length == 0) {
      Message.Warning("Thông Báo", "Tên chức vụ không được để trống!");
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
        title={update ? "Thêm thông tin chức vụ" : 'Cập nhật thông tin chức vụ'}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Mã chức vụ'}</Text>
            </Col>
            <Col {...layoutContent} > 
              <Input
                onBlur={()=>{
                  setBody({
                    ...body,
                    roleId: body?.roleId && removeVietnameseTones(body?.roleId?.toUpperCase().replaceAll(" ",''))
                  })
                }}
                disabled={true}
                style={{ width: '100%' }}
                value={body?.roleId}
                onChange={(text) => setBody({
                  ...body,
                  roleId: (text.target.value)
                })} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tên chức vụ'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={body?.roleName}
                onChange={(text) => setBody({
                  ...body,
                  roleName: text.target.value
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

export default ModalRoleManagement;