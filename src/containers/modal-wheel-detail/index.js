/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./style.module.less");

import Header from '@/components/Head';
import Layout from '@/layout';
import { Card, Col, Form, Input, Modal, Row, Select, Typography, Radio } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { getters as gettersTopic } from '@/redux/topic';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';
import { actions as actionWheel } from '@/redux/wheel';
import { getters as gettersWheel } from '@/redux/wheel';
import { actions as actionWheelDetail } from '@/redux/wheel-detail';
import { getters as gettersWheelDetail } from '@/redux/wheel-detail';

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
const ModalWheelDetail = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null, queryWheel_id } } = props;
  console.log("bodyModel", queryWheel_id)
  const [loading, setLoading] = useState(false);
  // const [segmentId, setSegmentId] = useState(record ? record.segment_id : "");
  const [topicId, setTopicId] = useState(record ? record.topic_id : "");
  const [segmentName, setSegmentName] = useState(record ? record.segment_name : "");
  const [segmentColor, setSegmentColor] = useState(record ? record.segment_color : "");
  const [inactived_date, setInactived_date] = useState(record ? record.inactived_date : "");
  // set state

  const [wheelDetailId, setWheelDetailId] = useState(record ? record.wheel_detail_id : "")
  const [wheelId, setWheelId] = useState(record ? record.wheel_id : "")
  const [segmentId, setSegmentId] = useState(record ? record.segment_id : "");
  const [no, setNo] = useState(record ? record.no : "")
  const [remainValue, setRemainValue] = useState(record ? record.remain_value : "")
  const [goalYn, setGoalYn] = useState(record ? record.goal_yn : -1)

  // console.log('record', record)
  // console.log('goalYn', goalYn)

  const [valueRaido, setValueRaido] = useState(-1);

  const dispatch = useDispatch();
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];
  const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];
  const listWheel = useSelector(gettersWheel.getStateLoadPageWheel) || [];

  useEffect(() => {
    initPage();
  }, [visible]);

  const initPage = async () => {
    setWheelDetailId(record ? record.wheel_detail_id : "")
    setWheelId(record ? record.wheel_id : queryWheel_id)
    setSegmentId(record ? record.segment_id : "")
    setNo(record ? record.no : "")
    setRemainValue(record ? record.remain_value : "")
    setGoalYn(record ? record.goal_yn : -1)
  }

  const onCallback = async () => {
    // if (!segmentId || segmentId.lenght == 0) {
    //   Message.Warning("NOTYFICATON", "Mã kết quả chưa điền nội dung");
    //   return;
    // }
    // if (!no) {
    //   Message.Warning("NOTYFICATON", "Số thứ tự vòng quay chưa có nội dung");
    //   return;
    // } else {
    //   if (no < 0) {
    //     Message.Warning("NOTYFICATON", "Số thứ tự vòng quay không đúng");
    //   }
    // }

    // if (goalYn === -1) {
    //   Message.Warning("NOTYFICATON", "Trúng thưởng chưa được chọn");
    // }

    const param = {
      ...record,
      wheel_detail_id: wheelDetailId ? wheelDetailId : 0,
      wheel_id: wheelId,
      segment_id: segmentId,
      no: no,
      goal_yn: goalYn,
      remain_value: remainValue,
    }


    // add
    if (isAdd) {
      const result = await dispatch(actionWheelDetail.insertWheelDetail(param));
      if (result) {
        callback({ visible: false });
        Message.Success("NOTYFICATON", "ADD NEW WHEEL DETAIL SUCCESS");
        return;
      }
      Message.Error("NOTYFICATON", "ADD NEW WHEEL DETAIL FAILED");
      return;
    }
    //edit
    const result = await dispatch(actionWheelDetail.updateWheelDetail(param));
    if (result) {
      callback({ visible: false });
      Message.Success("NOTYFICATON", "UPDATE WHEELDETAIL SUCCESS");
      return;
    }
    Message.Error("NOTYFICATON", "UPDATE WHEELDETAIL FAILED");


  }
  const onCancel = () => {
    callback({ visible: false });

  }

  function onChangeRadio(e) {
    setGoalYn(e.target.value);
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
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
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
          {
            !isAdd ?
              <Row >
                <Col {...layoutHeader} >
                  <Text className={classNames({ [styles['text-font']]: true })}>{'ID'}</Text>
                </Col>
                <Col  {...layoutContent}>
                  <Input disabled style={{ width: '100%' }} value={wheelDetailId} onChange={(text) => setWheelDetailId(text.target.value)} />
                </Col>
              </Row>
              : ''
          }
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Mã vòng quay '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Select disabled={true}
                style={{ width: '100%' }}
                defaultValue=""
                value={
                  wheelId}
                onChange={(value) => setWheelId(value)}>
                {listWheel.map((Item, key) => (
                  <Select.Option value={Item.wheel_id} key={key}>{Item.Wheel_name}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Kết quả trúng thưởng'}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Select
                disabled={isAdd ? false : true}
                style={{ width: '100%' }}
                defaultValue=""
                value={
                  segmentId}
                onChange={(value) => setSegmentId(value)}>
                {listSegment.map((Item, key) => (
                  <Select.Option value={Item.segment_id} key={key}>{Item.segment_name}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Số thứ tự trên vòng quay '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Input type="number" min="1" max="15" style={{ width: '100%' }} value={no} onChange={(text) => setNo(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Trúng thưởng '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Radio.Group onChange={onChangeRadio} value={goalYn}>
                <Radio value={1}>Có</Radio>
                <Radio value={0}>Không</Radio>

              </Radio.Group>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Số lần trúng thưởng còn lại '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" min={0} style={{ width: '100%' }} value={remainValue} onChange={(text) => setRemainValue(text.target.value)} />
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalWheelDetail;