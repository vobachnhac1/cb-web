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
import { getters } from '@/redux/system';
import Icon from '@ant-design/icons/lib/components/AntdIcon';

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
const ModalAccountManagement = (props) => {
  const { callback, visible = false, bodyModel: { update = false, record = null} } = props;
  const dispatch = useDispatch();
  const _sysList =useSelector(getters.dropdownSysList)
  const _roleList =useSelector(getters.dropdownRoleList)

  const [messageWarn, setMessageWarn]= useState('')
  const [body, setBody]=  useState(record ? record : {
    userId: null,
    fullname: null,
    password: null,
    newPassword: null,
    passwordComfirm: null,
    roleId: null,
    description: null,
    status: null,
    systemCode: null
  })

  const onChangeSelectPer =(value)=>{
    body?.perSystem
    setPerSystem(value)
  }

  const onCallback = async () => {

    const {systemCode, status, roleId}= body
    if(!systemCode){
      setMessageWarn('Hệ thống không được để trống');
      return
    }
    if(!status){
      setMessageWarn('Trạng thái không được để trống');
      return
    }
    if(!roleId){
      setMessageWarn('Chức vụ không được để trống');
      return
    }

    if(!update){
      const {password, passwordComfirm }= body;
      if(password != passwordComfirm){
        Message.Warning("Thông Báo", "Mật khẩu xác nhận không đúng!");
        return;
      }
      if(!password || !passwordComfirm){
        Message.Warning("Thông Báo", "Mật khẩu không được để trống");
        return;
      }
      
    }
    callback({...body, visible:true, id: record?.id})
  }

  const onCancel = () => {
    setBody(null)
    callback({ visible: false });
  }

  const onCheck =()=>{
    if(!update){
      const {password, passwordComfirm }= body;
      let _str = '';
      if(password && passwordComfirm){
        if(password == passwordComfirm){
          setMessageWarn('')
        }else{
          setMessageWarn('Mật khẩu xác nhận không giống')
        }
      }else{
        if(!password || password && password.length ==0){
          _str += '\n Mật khẩu không để trống';
        }
        if(!passwordComfirm || passwordComfirm && passwordComfirm.length ==0){
          _str += ' - Mật khẩu nhập lại không để trống';
        }
        setMessageWarn(_str)
      }
    }
  }

  const onCreateUserId =()=>{
    if(!update){
      const arrFullname = body.fullname?.trim().split(" ");
      if(arrFullname && arrFullname.length >0){
        let _str = ""
        for(let i =0; i < arrFullname.length- 1; i++){
          _str += arrFullname[i].substring(0, 1)
        }
        const _userId = removeVietnameseTones(arrFullname[arrFullname.length-1])+_str
        setBody({
          ...body,
          userId: _userId.toLowerCase()
        })
      }
    }
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
        title={update ? "Thêm thông tin tài khoản" : 'Cập nhật thông tin tài khoản'}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
           <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tài khoản'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                disabled={true}
                style={{ width: '100%' }}
                value={body?.userId}
                onChange={(text) => setBody({
                  ...body,
                  userId: text.target.value
                })} />
            </Col>    
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Hệ thống'}</Text>
            </Col>
            <Col {...layoutContent} >             
              <Select 
              // disabled={true}
                style={{ width: '100%' }}
                defaultValue=""
                value={body?.systemCode}
                onChange={(value) => setBody({...body, systemCode: value})}>
                {_sysList?.map((item, key) => (
                  <Select.Option value={item.sysCode} key={key}>{item.sysName}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Chức vụ'}</Text>
            </Col>
            <Col {...layoutContent} >             
              <Select 
                style={{ width: '100%' }}
                defaultValue=""
                value={body?.roleId}
                onChange={(value) => setBody({...body, roleId: value})}>
                {_roleList?.map((item, key) => (
                  <Select.Option value={item.roleId} key={key}>{item.roleName}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Họ và tên'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                style={{ width: '100%' }}
                value={body?.fullname}
                onBlur={onCreateUserId}
                onChange={(text) => setBody({
                  ...body,
                  fullname: text.target.value
                })} />
            </Col>    
          </Row>
          {!update && <>          
            <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Mật khẩu'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                onBlur={onCheck}
                type="password"
                style={{ width: '100%' }}
                value={body?.password}
                onChange={(text) => setBody({
                  ...body,
                  password: text.target.value
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
          </>}         
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Trạng thái'}</Text>
            </Col>
            <Col {...layoutContent} >             
              <Select
                  placeholder="Trạng thái"
                  style={{ width: '100%' }}
                  value={body?.status?.toString()}
                  onChange={(value)=>setBody({...body, status: value})}
                >
                  <Select.Option value={'1'} key={'1'}> {'Hoạt động'}</Select.Option>
                  <Select.Option value={'2'} key={'2'}> {'Không Hoạt động'}</Select.Option>
                  <Select.Option value={'3'} key={'3'}> {'Tạm khóa'}</Select.Option>
                </Select>
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

export default ModalAccountManagement;