/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./styles.less");

import { Button, Card, Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import * as Message from '@/components/message';
import { getters  as gettersAuth  } from '@/redux/global';

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
const ModalProfile = (props) => {
  const { callback, visible = false } = props;
  const dispatch = useDispatch();
  const profile=  useSelector(gettersAuth.getProfile)
  console.log('profile: ', profile);


  const onCallback = async () => {
    callback(false)
  }
  const onCancel = () => {
    callback(false)
  }
  return (
    <Modal
      width={500}
      maskClosable={false}
      closable={false}
      centered
      visible={visible}
      okText={'Xác nhận'}
      // cancelText={'Thoát'}
      can
      // onOk={onCallback}
      footer={[
        <Button key="back" onClick={onCallback}>
          {'Xác nhận'}
        </Button>
      ]}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgb(3, 77, 162)" }}
        title={"Thông tin tài khoản"}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tài khoản'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Text  className={classNames({ 'text-font': true }, { width: '100%' })}>{profile.userId}</Text>
            </Col>
          </Row>  
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tên đầy đủ'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Text  className={classNames({ 'text-font': true }, { width: '100%' })}>{profile.fullname}</Text>
            </Col>
          </Row>         
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Chức vụ'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Text  className={classNames({ 'text-font': true }, { width: '100%' })}>{profile.roleName}</Text>
            </Col>
          </Row>      
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Hệ thống'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Text  className={classNames({ 'text-font': true }, { width: '100%' })}>{profile.systemName + '(Code:' + profile.systemCode+')'}</Text>
            </Col>
          </Row>         
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalProfile;