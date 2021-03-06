/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./style.module.less");

import Header from '@/components/Head';
import Layout from '@/layout';
import { Card, Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import * as Message from '@/components/message';

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
const ModalTopic = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const dispatch = useDispatch();
  const [isApprove, setIsApprove] = useState(record ? record.status_yn : "N");
  const [topicName, setTopicName] = useState(record ? record.topic_name : "");

  useEffect(() => {
    setTopicName(record ? record.topic_name : "")
    setIsApprove(record ? record.status_yn : "")
  }, [visible]);

  const onChangeSelect = (record) => {
    setIsApprove(record);
  }

  const onCallback = async () => {
    if (!topicName || topicName.lenght == 0) {
      Message.Warning("NOTYFICATON", "Topic Name blank");
      return;
    }
    const param = {
      ...record,
      topic_name: topicName,
      status_yn: isApprove,
      visible: false
    }
    // isAdd
    if (isAdd) {
      const result = await dispatch(actionTopic.insertTopic(param));
      if (result) {
        setIsApprove('N');
        setTopicName('');
        callback({ visible: false });
        Message.Success("NOTYFICATON", "ADD NEW TOPIC SUCCESS");
        return;
      }
      Message.Error("NOTYFICATON", "ADD NEW TOPIC FAILED");
      return;
    }
    const result = await dispatch(actionTopic.updateTopic(param));
    if (result) {
      setIsApprove('N');
      setTopicName('');
      callback({ visible: false });
      Message.Success("NOTYFICATON", "UPDATE TOPIC SUCCESS");
      return;
    }
    Message.Error("NOTYFICATON", "UPDATE TOPIC FAILED");
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
      okText={'Comfirm'}
      cancelText={'Cancel'}
      onOk={onCallback}
      onCancel={onCancel}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "#0C74CF" }}
        title={isAdd ? "ADD TOPIC" : 'EDIT TOPIC'}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'TOPIC NAME'}</Text>
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
              <Text className={classNames({ [styles['text-font']]: true })}>{'APPROVE'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Select
                disabled={isAdd}
                defaultValue={isApprove == 'Y' ? 'YES' : 'NO'}
                value={isApprove == 'Y' ? 'YES' : 'NO'}
                style={{ width: '100%' }}
                onChange={onChangeSelect}
              >
                <Option key='Y'>YES</Option>
                <Option key='N'>NO</Option>
              </Select>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalTopic;