/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./style.module.less");

import Header from '@/components/Head';
import Layout from '@/layout';
import { Card, Col, Form, Input, Modal, Row, Select, Typography, DatePicker, Button } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { getters as gettersTopic } from '@/redux/topic';
import { actions as actionSegment } from '@/redux/segment';


const classNames = require("classnames");
const styles = require("./style.module.less");
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
const ModalSegment = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const [loading, setLoading] = useState(false);
  const [segmentId, setSegmentId] = useState(record ? record.segment_id : "");
  const [topicId, setTopicId] = useState(record ? record.topic_id : "");
  const [segmentName, setSegmentName] = useState(record ? record.segment_name : "");
  const [segmentColor, setSegmentColor] = useState(record ? record.segment_color : "");
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
    setSegmentColor(record ? record.segment_color : "")
    setInactived_date(record ? record.inactived_date : "")
  }

  const onCallback = async () => {
    if (!segmentId || segmentId.lenght == 0) {
      Message.Warning("NOTYFICATON", "Mã kết quả chưa điền nội dung");
      return;
    }
    if (!topicId) {
      Message.Warning("NOTYFICATON", "Chủ đề chưa được chọn");
      return;
    }
    if (!segmentName || segmentName.lenght == 0) {
      Message.Warning("NOTYFICATON", "Tên kết quả trúng thưởng chưa có nội dung");
      return;
    }
    if (!segmentColor || segmentColor.lenght == 0) {
      Message.Warning("NOTYFICATON", "Màu sắc hiển thị chưa có nội dung");
      return;
    }
    if (!inactived_date || inactived_date.lenght == 0) {
      Message.Warning("NOTYFICATON", "Hãy chọn ngày kết thúc giải thưởng");
      return;
    }
    // console.log('segmentId',segmentId)
    // console.log('topicId',topicId)
    // console.log('segmentName',segmentName)
    // console.log('segmentColor',segmentColor)
    // console.log('inactived_date',inactived_date)

    const param = {
      ...record,
      segment_id: segmentId,
      topic_id: topicId,
      segment_name: segmentName,
      segment_color: segmentColor,
      inactived_date: inactived_date,
      is_approve: true,
      // status_yn: isApprove,
      visible: false
    }


    // add
    if (isAdd) {
      const result = await dispatch(actionSegment.insertSegment(param));
      if (result) {
        callback({ visible: false });
        Message.Success("NOTYFICATON", "ADD NEW SEGMENT SUCCESS");
        return;
      }
      Message.Error("NOTYFICATON", "ADD NEW SEGMENT FAILED");
      return;
    }
    //edit
    const result = await dispatch(actionSegment.updateTopic(param));
    if (result) {
      callback({ visible: false });
      Message.Success("NOTYFICATON", "UPDATE SEGMENT SUCCESS");
      return;
    }
    Message.Error("NOTYFICATON", "UPDATE SEGMENT FAILED");


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
      okText={'Comfirm'}
      cancelText={'Cancel'}
      onOk={onCallback}
      onCancel={onCancel}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgb(3, 77, 162)" }}
        title={isAdd ? "Thêm Kết chi tiết vòng quay" : 'Cập nhật Kết chi tiết vòng quay'}
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
          {/*  */}
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Mã kết quả trúng thưởng :'}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Input style={{ width: '100%' }} value={segmentId} onChange={(text) => setSegmentId(text.target.value)} />
            </Col>
          </Row>

          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Chủ đề :'}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Select
                style={{ width: '100%' }}
                defaultValue=""
                value={
                  topicId}
                onChange={(value) => setTopicId(value)}>
                {listTopic.map((Item, key) => (
                  <Select.Option value={Item.topic_id} key={key}>{Item.topic_name}</Select.Option>
                  // <option value={option.value}>{option.label}</option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Tên kết quả trúng thưởng '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Input style={{ width: '100%' }} value={segmentName} onChange={(text) => setSegmentName(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Màu sắc hiển thị '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Input style={{ width: '100%' }} value={segmentColor} onChange={(text) => setSegmentColor(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Ngày hết hiệu lực '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <DatePicker value={inactived_date ? moment(inactived_date) : null} onChange={(date) => setInactived_date(date)} />
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalSegment;