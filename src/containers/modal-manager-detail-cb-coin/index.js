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
const ESTATE_DATE = [
  'WEEK',
  'DAY',
  'MONTH',
  'EVENT',
]

const ModalManagerDetailCbCoin = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null, cbCoin_id } } = props;
  const dispatch = useDispatch();
  // state ModalManagerDetailCbCoin
  const [behaviorCode, setBehaviorCode] = useState(record ? record.behaviorCode : "");
  const [behaviorName, setBehaviorName] = useState(record ? record.behaviorName : "");
  const [point, setPoint] = useState(record ? record.point : "");
  const [numBehavior, setNumBehavior] = useState(record ? record.numBehavior : "");
  const [type, setType] = useState(record ? record.type : "");

  useEffect(() => {
    initPage();
  }, [visible]);

  const initPage = async () => {
    setBehaviorCode(record ? record.behaviorCode : "")
    setBehaviorName(record ? record.behaviorName : "")
    setPoint(record ? record.point : "")
    setNumBehavior(record ? record.numBehavior : "")
    setType(record ? record.type : "")
  }

  const onCallback = async () => {
    if (!behaviorCode || behaviorCode.length == 0) {
      Message.Warning("Thông Báo", "Giao dịch tích điểm không được để trống!");
      return;
    }
    if (!numBehavior || numBehavior.length == 0) {
      Message.Warning("Thông Báo", "Mã tích điểm không được để trống!");
      return;
    }
    if (point.length == 0) {
      Message.Warning("Thông Báo", "Số điểm không được để trống!");
      return;
    }
    if (parseInt(point) < 0) {
      Message.Warning("Thông Báo", "Số điểm không được là số âm!");
      return;
    }
    if (numBehavior.length == 0) {
      Message.Warning("Thông Báo", "Số lần không được để trống!");
      return;
    }
    if (parseInt(numBehavior) < 0) {
      Message.Warning("Thông Báo", "Số lần không được là số âm!");
      return;
    }
    if (!type || type.length == 0) {
      Message.Warning("Thông Báo", "Số loại không được để trống!");
      return;
    }
    const param = {
      ...record,
      behaviorCode: behaviorCode,
      behaviorName: behaviorName,
      point: point,
      numBehavior: numBehavior,
      type: type,
      visible: false,
      cbCoin_id: cbCoin_id
    }

    //kiểm tra bahaviorCode có trùng nhau ở database
    const checkBehavior = await dispatch(actionManagerDetailCbCoin.checkBehavior(param));
    // isAdd
    if (isAdd) {
      if (!checkBehavior.success) {
        Message.Warning("Thông Báo", `${checkBehavior.message}`);
        return;
      }
      const result = await dispatch(actionManagerDetailCbCoin.insertManagerDetailCbCoin(param));
      if (result) {

        callback({ visible: false });
        Message.Success("Thông Báo", "Thêm chi tiết điểm thành công");
        return;
      }
      Message.Error("Thông Báo", "Thêm chi tiết điểm thất bại");
      return;
    } else {
      if (!checkBehavior.success && param.behaviorCode != "CHANGE") {
        Message.Warning("Thông Báo", `${checkBehavior.message}`);
        return;
      }
      const result = await dispatch(actionManagerDetailCbCoin.updateManagerDetailCbCoin(param));
      if (result) {
        callback({ visible: false });
        Message.Success("Thông Báo", "Cập nhật chi tiết điểm thành công");
        return;
      }
      Message.Error("Thông Báo", "Cập nhật chi tiết điểm thất bại");
    }
  }

  const onCancel = () => {
    callback({ visible: false });
  }

  return (
    <Modal
      width={'auto'}
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
        title={isAdd ? "Thêm tiêu chí giao dịch tích điểm" : 'Cập nhật tiêu chí giao dịch tích điểm'}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Giao dịch được tích điểm'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={behaviorName}
                onChange={(text) => setBehaviorName(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Mã tích điểm'}</Text>
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
                value={numBehavior}
                onChange={(text) => {
                  setNumBehavior(text ? text : 0);
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Số loại'}</Text>
            </Col >
            <Col  {...layoutContent}>
              <Select
                style={{ width: '100%' }}
                defaultValue=""
                value={type}
                onChange={(value) => setType(value)}>
                {ESTATE_DATE.map((Item, key) => (
                  <Select.Option value={Item} key={key}>{Item}</Select.Option>
                ))}
              </Select>
            </Col>

          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalManagerDetailCbCoin;