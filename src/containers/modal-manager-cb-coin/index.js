/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./styles.less");
import { Card, Col, Form, Input, Modal, Row, Typography, DatePicker, Radio, } from 'antd';

import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { getters as gettersManagerCbCoin } from '@/redux/manager-cb-coin';
import { actions as actionsManagerCbCoin } from '@/redux/manager-cb-coin';

const classNames = require("classnames");
const styles = require("./styles.less");
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

const ModalManagerCbCoin = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const dispatch = useDispatch();
  // data manager cb coin
  const [ord_numbers, setOrd_numbers] = useState(record ? record.ord_numbers : "");
  const [criteria_name, setCriteria_name] = useState(record ? record.criteria_name : "");
  const [from_date, setFrom_date] = useState(record ? record.from_date : "");
  const [to_date, setTo_date] = useState(record ? record.to_date : "");
  const [status, setStatus] = useState(record ? record.status : "");
  const listManagerCbCoin = useSelector(gettersManagerCbCoin.getStateLoadPageManagerCbCoin) || [];


  useEffect(() => {
    initPage();
  }, [visible]);

  const initPage = async () => {
    // data manager cb coin
    setOrd_numbers(record ? record.ord_numbers : "")
    setCriteria_name(record ? record.criteria_name : "")
    setFrom_date(record ? record.from_date : "")
    setTo_date(record ? record.to_date : "")
    setStatus(record ? record.status : "")
  }

  const onCallback = async () => {
    let msg_error = [];
    if (!criteria_name || criteria_name.length == 0) {
      msg_error.push("- Tên hệ thống chưa có nội dung");
    }
    if (!from_date || from_date.length == 0) {
      msg_error.push("- Trường Từ ngày chưa có nội dung");
    }
    if (!to_date || to_date.length == 0) {
      msg_error.push("- Trường đến ngày chưa có nội dung");
    }
    if (msg_error && msg_error.length > 0) {
      Message.WarningArr("Thông Báo", msg_error);
      return
    }
    const param = {
      ...record,
      criteria_name: criteria_name,
      from_date: moment(from_date).format(),
      to_date: moment(to_date).format(),
      status: status
    }

    // add
    if (isAdd) {
      const result = await dispatch(actionsManagerCbCoin.insertManagerCbCoin(param));
      if (result) {
        callback({ visible: false, });
        Message.Success("Thông Báo", "Thêm thành công");
        return;
      }
      Message.Error("Thông Báo", "Thêm thất bại");
      return;
    }
  }

  const onCancel = () => {
    callback({ visible: false });
  }

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setStatus(e.target.value);
  };

  return (
    <Modal
      width={750}
      maskClosable={false}
      closable={false}
      centered
      visible={visible}
      okText={'Xác nhận'}
      cancelText={'Quay lại'}
      onOk={onCallback}
      onCancel={onCancel}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgb(3, 77, 162)" }}
        title={isAdd ? "Thêm hệ thống tích điểm CBCoin " : 'Cập nhật hệ thống tích điểm CBCoin'}
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
              <Text className={classNames({ 'text-font': true })}>{'Tên hệ thống :'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={criteria_name} onChange={(text) => setCriteria_name(text.target.value)} />
            </Col>
          </Row>

          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Từ ngày: '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <DatePicker disabledDate={d => !d || d.isSameOrBefore(moment().set('date', (moment().date() - 1)))} style={{ width: '50%' }} value={!from_date || from_date === "0000-00-00 00:00:00" ? null : moment(from_date)} onChange={(date) => setFrom_date(date)} />
            </Col>
          </Row>

          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Đến ngày: '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <DatePicker disabledDate={d => !d || d.isSameOrBefore(moment().set('date', (moment().date() - 1)))} style={{ width: '50%' }} value={!to_date || to_date === "0000-00-00 00:00:00" ? null : moment(to_date)} onChange={(date) => setTo_date(date)} />
            </Col>
          </Row>

          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Trạng thái: '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Radio.Group onChange={onChange} value={status}>
                <Radio value={true}>Active</Radio>
                <Radio value={false}>Inactive</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalManagerCbCoin;