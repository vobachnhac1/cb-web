/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./styles.less");

import { Card, Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import * as Message from '@/components/message';
import { getters as gettersSys } from '@/redux/system';

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
const ModalTopic = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const dispatch = useDispatch();
  const listSystem = useSelector(gettersSys.getSystemList);
  const [topicName, setTopicName] = useState(record ? record.topic_name : "");
  const [sysCode, setSysCode] = useState(record ? record.sysCode : "LAB");

  useEffect(() => {
    setTopicName(record ? record.topic_name : "")
  }, [visible]);

  const onChangeSelect = (record) => {
    setSysCode(record);
  }

  const onCallback = async () => {
    if (!topicName || topicName.length == 0) {
      Message.Warning("Thông Báo", "Tên chủ đề không được để trống!");
      return;
    }
    const param = {
      systemCode: sysCode,
      topic_name: topicName,
      topic_id: record?.topic_id,
      visible: false
    }
    // isAdd
    if (isAdd) {
      const result = await dispatch(actionTopic.insertTopic(param));
      if (result) {
        setTopicName('');
        callback({ visible: false });
        Message.Success("Thông Báo", "Thêm chủ đề thành công");
        return;
      }
      Message.Error("Thông Báo", "Thêm chủ đề thất bại");
      return;
    }
    const result = await dispatch(actionTopic.updateTopic(param));
    if (result) {
      setTopicName('');
      callback({ visible: false });
      Message.Success("Thông Báo", "Cập nhật chủ đề thành công");
      return;
    }
    Message.Error("Thông Báo", "Cập nhật chủ đề thất bại");
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
        title={isAdd ? "Thêm chủ đề" : 'Cập nhật chủ đề'}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tên chủ đề'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={topicName}
                onChange={(text) => setTopicName(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Hệ thống'}</Text>
            </Col>
            <Col  {...layoutContent}>
                <Select
                  disabled={false}
                  value={sysCode}
                  style={{ width: '100%' }}
                  onChange={onChangeSelect}
                >
                  {listSystem.map((item,index)=><Option key={index} value ={item.sysCode}>{item.sysName}</Option>)}
                </Select>
              </Col>
          </Row>         
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalTopic;