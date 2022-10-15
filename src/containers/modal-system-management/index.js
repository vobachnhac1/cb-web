/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-10-08
*------------------------------------------------------- */
require("./styles.less");

import { Card, Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import * as Message from '@/components/message';
import { removeVietnameseTones } from '@/core/constants';

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
const ModalSystemManagement = (props) => {
  const { callback, visible = false, bodyModel: { update = false, record = null } } = props;
  const dispatch = useDispatch();
  const [body, setBody]=  useState(record ? record : {
    sysCode:null,
    sysName:null,
    description:null
  })

  // useEffect(() => {
  //   setBody(record ? record : "")
  // }, [visible]);

  const onCallback = async () => {
    const {sysCode, sysName, description}= body;
    if (!sysCode || sysCode.length == 0) {
      Message.Warning("Thông Báo", "Mã hệ thống không được để trống!");
      return;
    }

    if (!sysName || sysName.length == 0) {
      Message.Warning("Thông Báo", "Tên hệ thống không được để trống!");
      return;
    }
    callback({...body, visible:true})
    // if (!topicName || topicName.length == 0) {
    //   Message.Warning("Thông Báo", "Tên chủ đề không được để trống!");
    //   return;
    // }
    // const param = {
    //   ...record,
    //   topic_name: topicName,
    //   status_yn: isApprove,
    //   visible: false
    // }
    // // isAdd
    // if (isAdd) {
    //   const result = await dispatch(actionTopic.insertTopic(param));
    //   if (result) {
    //     // setIsApprove('N');
    //     setTopicName('');
    //     callback({ visible: false });
    //     Message.Success("Thông Báo", "Thêm chủ đề thành công");
    //     return;
    //   }
    //   Message.Error("Thông Báo", "Thêm chủ đề thất bại");
    //   return;
    // }
    // const result = await dispatch(actionTopic.updateTopic(param));
    // if (result) {
    //   // setIsApprove('N');
    //   setTopicName('');
    //   callback({ visible: false });
    //   Message.Success("Thông Báo", "Cập nhật chủ đề thành công");
    //   return;
    // }
    // Message.Error("Thông Báo", "Cập nhật chủ đề thất bại");
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
        title={update ? "Thêm thông tin hệ thống" : 'Cập nhật thông tin hệ thống'}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row >
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Mã hệ thống'}</Text>
            </Col>
            <Col {...layoutContent} > 
              <Input
                onBlur={()=>{
                  setBody({
                    ...body,
                    sysCode: body?.sysCode && removeVietnameseTones(body?.sysCode?.toUpperCase().replaceAll(" ",''))
                  })
                }}
                disabled={update}
                style={{ width: '100%' }}
                value={body?.sysCode}
                onChange={(text) => setBody({
                  ...body,
                  sysCode: (text.target.value)
                })} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tên hệ thống'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={body?.sysName}
                onChange={(text) => setBody({
                  ...body,
                  sysName: text.target.value
                })} />
            </Col>    
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Mô tả chi tiết'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={body?.description}
                onChange={(text) => setBody({
                  ...body,
                  description: text.target.value
                })}  />
            </Col>    
          </Row>                   
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalSystemManagement;