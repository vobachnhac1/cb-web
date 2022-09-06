/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./styles.less");

import { Card, Col, Form, Input, Modal, Row, Select, Typography, InputNumber } from 'antd';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actions as actionManagerDetailCbCoin } from '@/redux/manager-detail-cb-coin';
import { getters as gettersManagerDetailCbCoin } from '@/redux/manager-detail-cb-coin';
import * as Message from '@/components/message';

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
const ModalManagerDetailCbCoin = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const dispatch = useDispatch();
  // state ModalManagerDetailCbCoin
  const [behaviorCode, setBehaviorCode] = useState(record ? record.behaviorCode : "");
  const [point, setPoint] = useState(record ? record.point : "");
  const [numberBehavior, setNumberBehavior] = useState(record ? record.numberBehavior : "");
  const [type, setType] = useState(record ? record.type : "");

  useEffect(() => {

  }, [visible]);


  const onCallback = async () => {
    if (!behaviorCode || behaviorCode.length == 0) {
      Message.Warning("Thông Báo", "Giao dịch tích CbCoin không được để trống!");
      return;
    }
    if (!point || point.length == 0) {
      Message.Warning("Thông Báo", "Số điểm không được để trống!");
      return;
    }
    if (!numberBehavior || numberBehavior.length == 0) {
      Message.Warning("Thông Báo", "Số lần không được để trống!");
      return;
    }
    if (!type || type.length == 0) {
      Message.Warning("Thông Báo", "Số loại không được để trống!");
      return;
    }
    const param = {
      ...record,
      behaviorCode: ``,
      point: ``,
      numberBehavior: ``,
      type: ``,
      visible: false
    }

    // isAdd
    if (isAdd) {
      const result = await dispatch(actionManagerDetailCbCoin.insertManagerDetailCbCoin(param));
      if (result) {

        callback({ visible: false });
        Message.Success("Thông Báo", "Thêm chi tiết CbCoin thành công");
        return;
      }
      Message.Error("Thông Báo", "Thêm chi tiết CbCoin thất bại");
      return;
    }
    const result = await dispatch(actionManagerDetailCbCoin.updateManagerDetailCbCoin(param));
    if (result) {

      callback({ visible: false });
      Message.Success("Thông Báo", "Cập nhật chi tiết CbCoin thành công");
      return;
    }
    Message.Error("Thông Báo", "Cập nhật chi tiết CbCoin thất bại");
  }
  const onCancel = () => {
    callback({ visible: false });
  }
  return (
    <Modal
      width={700}
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
        title={isAdd ? "Thêm chi tiết CBCoin" : 'Cập nhật chi tiết CBCoin'}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Giao dịch được tích coin'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={behaviorCode}
                onChange={(text) => setBehaviorCode(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Số điểm trên lần'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <InputNumber style={{ width: '100%' }}
                value={point}
                onChange={(text) => {
                  setPoint(text ? text : 0);
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Số lần'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <InputNumber style={{ width: '100%' }}
                value={numberBehavior}
                onChange={(text) => {
                  setNumberBehavior(text ? text : 0);
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Số loại'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={type}
                onChange={(text) => setType(text.target.value)} />
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalManagerDetailCbCoin;