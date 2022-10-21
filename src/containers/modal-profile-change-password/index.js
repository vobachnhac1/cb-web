/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-10-08
*------------------------------------------------------- */
require("./styles.less");

import { Button, Card, Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import * as Message from '@/components/message';
import { getters  as gettersAuth  } from '@/redux/global';

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
const ModalProfileChangePass = (props) => {
  const { callback, visible = false } = props;
  const dispatch = useDispatch();
  const profile=  useSelector(gettersAuth.getProfile)
  const [body,setBody]= useState({
    passwordOld: null,
    passwordNew: null,
    passwordComfirm: null,
  })
  const [messageWarn, setMessageWarn]= useState(null)

  const onCallback = async () => {
    onCheck();
    if(messageWarn && messageWarn.trim().length >0 ){
      console.log('messageWarn: ', messageWarn);
      return
    }
    callback({ visible: true,...body,...profile })
  }
  const onCancel = () => {
    setBody(null)
    callback({ visible: false })
  }

  const onCheck =()=>{
      const {passwordNew, passwordComfirm , passwordOld}= body;
      let _str = '';
      if(passwordOld == passwordNew){
        setMessageWarn('Mật khẩu cũ và mới không được giống nhau!')
        return
      }
      if(passwordNew && passwordComfirm){
        if(passwordNew == passwordComfirm){
          setMessageWarn(null)
        }else{
          setMessageWarn('Mật khẩu xác nhận không giống')
        }
      }else{
        if(!passwordNew || passwordNew && passwordNew.length ==0){
          _str += '\n Mật khẩu không để trống';
        }
        if(!passwordComfirm || passwordComfirm && passwordComfirm.length ==0){
          _str += ' - Mật khẩu nhập lại không để trống';
        }
        setMessageWarn(_str)
      }

  }
 
  return (
    <Modal
      width={500}
      maskClosable={false}
      closable={false}
      centered
      visible={visible}
      // okText={'Xác nhận'}
      // cancelText={'Thoát'}
      // onOk={onCallback}
      footer={[
        <Button key="back" onClick={onCancel}>
          {'Quay lại'}
        </Button>,
         <Button key="ok" onClick={onCallback}>
          {'Xác nhận'}
       </Button> 
      ]}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgb(3, 77, 162)" }}
        title={"Đổi mật khẩu"}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Mật khẩu cũ'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                onBlur={onCheck}
                type="password"
                style={{ width: '100%' }}
                value={body?.passwordOld}
                onChange={(text) => setBody({
                  ...body,
                  passwordOld: text.target.value
                })}  />
            </Col>    
          </Row>           
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Mật khẩu mới'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                onBlur={onCheck}
                type="password"
                style={{ width: '100%' }}
                value={body?.passwordNew}
                onChange={(text) => setBody({
                  ...body,
                  passwordNew: text.target.value
                })}  />
            </Col>    
          </Row>           
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Xác nhận lại mật khẩu'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                onBlur={onCheck}
               type="password"
                style={{ width: '100%' }}
                value={body?.passwordComfirm}
                onChange={(text) => setBody({
                  ...body,
                  passwordComfirm: text.target.value
                })}  />
            </Col>    
          </Row>       
          <Row style={{ marginTop: 10 }}>
            <Text className={classNames({ 'text-font': true })} style={{color : 'red', fontSize:12}} >{messageWarn}</Text>
          </Row>           
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalProfileChangePass;