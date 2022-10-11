/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./styles.less");
import { Card, Col, Form, Input, Modal, Row, Select, Typography, DatePicker, InputNumber } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { getters as gettersTopic } from '@/redux/topic';
import { actions as actionSegment } from '@/redux/segment';


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
const ModalSegment = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const [segmentId, setSegmentId] = useState(record ? record.segment_id : "");
  const [topicId, setTopicId] = useState(record ? record.topic_id : "");
  const [segmentName, setSegmentName] = useState(record ? record.segment_name : "");
  const [segmentValue, setSegmentValue] = useState(record ? record.segment_value : "");
  const [inactived_date, setInactived_date] = useState(record ? record.inactived_date : "");
  const dispatch = useDispatch();
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];

  useEffect(() => {
    initPage();
  }, [visible]);

  const initPage = async () => {
    setSegmentId(record ? record.segment_id : "")
    setTopicId(record ? record.topic_id : "")
    setSegmentName(record ? record.segment_name : "")
    setSegmentValue(record ? record.segment_value : "")
    setInactived_date(record ? record.inactived_date : "")
  }

  const onCallback = async () => {
    let msg_error = [];
    if (!topicId) {
      msg_error.push("- Chủ đề chưa được chọn");
    }
    if (!segmentName || segmentName.length == 0) {
      msg_error.push("- Tên kết quả trúng thưởng chưa có nội dung");
    }
    if (msg_error && msg_error.length > 0) {
      Message.WarningArr("Thông Báo", msg_error);
      return
    }
    const param = {
      ...record,
      segment_id: segmentId,
      topic_id: topicId,
      segment_name: segmentName,
      segment_value: segmentValue,
      inactived_date: inactived_date,
      is_approve: true,
      visible: false
    }

    // add
    if (isAdd) {
      const result = await dispatch(actionSegment.insertSegment(param));
      if (result) {
        callback({ visible: false, });
        Message.Success("Thông Báo", "Thêm thành công");
        return;
      }
      Message.Error("Thông Báo", "Thêm thất bại");
      return;
    }
    //edit
    const result = await dispatch(actionSegment.updateSegment(param));
    if (result) {
      callback({ visible: false });
      Message.Success("Thông Báo", "Cập nhật thành công");
      return;
    }
    Message.Error("Thông Báo", "Cập nhật thất bại");

    // false
  }
  const onCancel = () => {
    callback({ visible: false });
  }

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
        title={isAdd ? "Thêm kết quả giải thưởng" : 'Cập nhật kết quả giải thưởng'}
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

          {
            segmentId ? <Row >
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Mã kết quả trúng thưởng :'}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Input style={{ width: '100%' }} value={segmentId} onChange={(text) => setSegmentId(text.target.value)} disabled />
              </Col>
            </Row>
              : null
          }
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Chủ đề :'}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Select
                disabled={isAdd ? false : true}
                style={{ width: '100%' }}
                defaultValue=""
                value={
                  topicId}
                onChange={(value) => setTopicId(value)}>
                {listTopic.map((Item, key) => (
                  <Select.Option value={Item.topic_id} key={key}>{Item.topic_name}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tên giải thưởng '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={segmentName} onChange={(text) => setSegmentName(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Giá trị giải thưởng '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <InputNumber style={{ width: '100%' }}
                addonAfter={"VND"}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                value={segmentValue}
                onChange={(text) => {
                  setSegmentValue(text ? text : 0);
                }}
              />
            </Col>
          </Row>
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Màu sắc hiển thị '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="color" style={{ width: '50%' }} value={segmentColor} onChange={(text) => setSegmentColor(text.target.value)} />
            </Col>
          </Row> */}
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Ngày hết hiệu lực '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <DatePicker disabledDate={d => !d || d.isSameOrBefore(moment().set('date', (moment().date() - 1)))} style={{ width: '50%' }} value={!inactived_date || inactived_date === "0000-00-00 00:00:00" ? null : moment(inactived_date)} onChange={(date) => setInactived_date(date)} />
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalSegment;