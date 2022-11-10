/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./styles.less");
import { Card, Col, Form, Select, Modal, Row, Typography, DatePicker, Tag } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import _ from 'lodash';

const classNames = require("classnames");
const { Text } = Typography;
const { RangePicker } = DatePicker;

const layoutHeader = {
  xs: { span: 24, offset: 0 },
  sm: { span: 24, offset: 0 },
  md: { span: 24, offset: 0 },
  lg: { span: 24, offset: 0 },
};
const layoutContent = {
  xs: { span: 12, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 12, offset: 0 },
  lg: { span: 16, offset: 0 },
};
const ModalCustom = (props) => {
  const dispatch = useDispatch();
  const { callback, visible = false, contentModel  } = props;
  const onCancel = () => {
    callback({ visible: false, comfirm: false });
  }

  const onCallback = async () => {
    callback({ visible: false, comfirm: true });
  }

  return (
    <Modal
      width={600}
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
        title={contentModel?._tittle?.toString().toUpperCase()}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: 'default',
            value: ''
          }}
          labelAlign='left'
          size={'default'}
        >
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{contentModel._content1}</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{contentModel._content2}</Text>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalCustom;