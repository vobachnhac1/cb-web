/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./styles.less");
import { Card, Col, Form, Input, Modal, Row, Typography, DatePicker, Tag, Select, InputNumber } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

import _ from 'lodash';
const classNames = require("classnames");
const { Text } = Typography;
const { RangePicker } = DatePicker;

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
const ModalRules = (props) => {
  const dispatch = useDispatch();
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const listWheel = useSelector(gettersRules.getListWheel) || [];
  const listRulesModal = useSelector(gettersRules.getRulesModal) || [];
  const [body, setBody] = useState(record ? record : {
    created_date: null,
    datelastmaint: null,
    from_date: null,
    is_delete: null,
    key: null,
    ord_numbers: null,
    rules_id: null,
    rules_name: null,
    status_rules: null,
    status_rules_name: null,
    to_date: null,
    total_reward: 0,
    reward: 0,
    reward_per:0,
  });

  const [expired, setExpired]= useState({
    from_date: record? record.from_date: null ,
    to_date: record? record.to_date: null ,
    count: 0
  })

  useEffect(() => {
    initPage();
  }, [visible]);

  useEffect(() => {
    if(chooseWheel){
      formatFromToDate()
    }else{
      setExpired({
        from_date: null ,
        to_date: null ,
        count: 0 ,
      })
    }
    // nếu listRules ==0 => add fromdate = listWheel.find(item=>item.wheel_id ===chooseWheel).from_date
    // nếu listRules >0 => kiểm tra todate lớn nhất
    
  }, [listRulesModal]);

  const formatFromToDate =()=>{
    const _wheel = listWheel.find(item=>item.wheel_id === chooseWheel);
    if(!listRulesModal || listRulesModal&& listRulesModal.length == 0){
      if(_wheel){
        console.log('_wheel: ', _wheel);
        setExpired({
          from_date: _wheel? moment(_wheel?.from_date_act).add(0 ,'days'): null ,
          to_date: _wheel? moment(_wheel?.to_date_act).add(0 ,'days'): null ,
          count: 0
        })
      }
    }else{
      const _sort = listRulesModal.sort((a, b) => (moment(a.to_date) > moment(b.to_date) ? -1 : 1))
      setExpired({
        from_date: moment(_sort[0].to_date ).add(1 ,'days'),
        to_date:  _wheel? moment(_wheel?.to_date_act).add(0 ,'days'): null ,
        count: moment( _sort[0].to_date ).diff(moment(_wheel?.from_date_act), 'day')
      })
    }
  }

  const initPage = () => {
    setBody(record ? record : {
      created_date: null,
      datelastmaint: null,
      from_date: null,
      is_delete: null,
      key: null,
      ord_numbers: null,
      rules_id: null,
      rules_name: null,
      status_rules: null,
      status_rules_name: null,
      to_date: null,
      total_reward: 0,
      reward: 0,
      reward_per:0,
    });
    setExpired({
      from_date: record? record.from_date: null ,
      to_date: record? record.to_date: null ,
      count: 0
    })
    if (!isAdd) {
      const res = listWheel.filter(item => record && item.rules_id == record.rules_id);
      if (res.length > 0) {
        setWheel(res[0].wheel_id);
      } else {
        setWheel(null)
      }
    }
  }

  const onCancel = () => {
    callback({ visible: false });
  }
  const [isChangeText, setIsChangeText] = useState(false)
  const [chooseWheel, setWheel] = useState(null)

  const onKeyPress = (event) => {
    let code = event.keyCode || event.charCode;
    if ((code >= 48 && code <= 57) || code === 13) {
      setIsChangeText(true);
    } else {
      setIsChangeText(false);
    }
  }

  const onChangetReward = (event) => {
    if (!isChangeText) {
      setIsChangeText(true);
      return;
    };
    let total  = 0;
    if(!body.reward_per ||body?.reward_per ==0){
      total = event
    }else{
      total  = Number( event)*100/Number( body.reward_per)
    }
    setBody({ ...body, reward: event, total_reward: total?.toFixed(0) })

  }

  const onChangeRewardPer = (event) => {
    if (!isChangeText) {
      setIsChangeText(true);
      return;
    };
    let total  = Number( body.reward)*100/Number( event)
    if(!event ||event ==0){
      total = Number( body.reward)
    }else{
      const total  = Number( body.reward)*100/Number( event)
    }
    setBody({ ...body,  reward_per: event, total_reward: total?.toFixed(0) })
  }

  const onCallback = async () => {
    const {reward =0, reward_per =0, total_reward = 0, rules_name = nullFormat } = body;
    const { from_date = null, to_date = null } = expired;

    let msg_error = [];
    if(reward <= 0){
      msg_error.push("- Vui lòng nhập số giải muốn trúng thưởng\n");
    }
    if (!total_reward || total_reward == 0) {
      msg_error.push("- Vui lòng nhập tổng giải thưởng trúng trong đợt\n");
    }
    if (!rules_name || rules_name && rules_name.length == 0) {
      msg_error.push("- Vui lòng nhập tên quy tắc \n");
    }
    if (!from_date) {
      msg_error.push("- Vui lòng nhập thời gian hiệu lực \n");
    }
    if (!chooseWheel) {
      msg_error.push("- Vui lòng chọn vòng quay \n");
    }
    if (msg_error && msg_error.length > 0) {
      Message.WarningArr("Thông Báo", msg_error);
      return
    }
    //   // add
    if (isAdd) {
      const result = await dispatch(actionsRules.insertRules({
        ...body,
        ...expired,
        reward: reward,
        reward_per: reward_per,
        wheel_id: chooseWheel
      }));
      if (result) {
        callback({ visible: false });
        Message.Success("Thông Báo", "Thêm quy tắc thành công");
        return;
      }
      Message.Error("Thông Báo", "Thêm quy tắc thất bại");
      return;
    }

    //edit
    const result = await dispatch(actionsRules.updateRules({
      ...body,
      ...expired,
      reward: reward,
      reward_per: reward_per,
      wheel_id: chooseWheel
    }));
    if (result) {
      callback({ visible: false });
      Message.Success("Thông Báo", "Cập nhật quy tắc thành công");
      return;
    }
    Message.Error("Thông Báo", "Cập nhật quy tắc thất bại");
  }

  const onChangeSelect =async (value)=>{
    setWheel(value)
    await dispatch(actionsRules.filterRulesModal({wheel_id: value}))
  }
  return (
    <Modal
      width={750}
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
        title={isAdd ? "Thêm quy tắc" : 'Cập nhật quy tắc'}
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
              <Text className={classNames({ 'text-font': true })}>{'Mã quy tắc:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              {/* <Input style={{ width: '100%' }} onChange={(text) => { }} /> */}
              <Text>{body.rules_id}</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tên quy tắc:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={body.rules_name} onChange={(text) => { setBody({ ...body, rules_name: text.target.value }) }} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Số lượng giải được trúng:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <InputNumber
                addonAfter={"Giải thưởng"}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onKeyPress={onKeyPress}
                style={{ width: '100%' }}
                value={body?.reward}
                onChange={onChangetReward}
              />
            </Col>
          </Row> 
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tỉ lệ trúng:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <InputNumber
                addonAfter={"%"}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onKeyPress={onKeyPress}
                style={{ width: '100%' }}
                value={body?.reward_per}
                onChange={onChangeRewardPer}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tổng số giải:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <InputNumber
                disabled={true}
                addonAfter={"Giải thưởng"}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onKeyPress={onKeyPress}
                style={{ width: '100%' }}
                value={body?.total_reward}
              />
            </Col>
          </Row>
          {
            // select option wheel
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Vòng quay:'}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Select
                  allowClear
                  disabled={isAdd ? false : true}
                  style={{ width: '100%' }}
                  defaultValue=""
                  value={chooseWheel}
                  onChange={onChangeSelect}>
                  {listWheel.map((item, key) => (
                    <Select.Option value={item.wheel_id} key={key}>{item.wheel_name}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>

          }
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Trạng thái:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              {
                body.status_rules_name && <Tag color={body.status_rules == 'Y' ? 'green' : "red"}>
                  {body.status_rules_name}
                </Tag>
              }
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Thời gian áp dụng:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <RangePicker
                allowClear={false}
                disabled={chooseWheel?false:true}
                disabledDate={ current => 
                  !current 
                  || current.isSameOrBefore(moment().set('date', (moment(listWheel.find(item=>item.wheel_id == chooseWheel)?.from_date_act).add(expired.count,'days').date() - 1)))                  
                  || current.isSameOrAfter(moment(listWheel.find(item=>item.wheel_id == chooseWheel)?.to_date_act))                  
                  }            
                value={expired.from_date ? [moment(expired.from_date, 'YYYY/MM/DD'), moment(expired.to_date, 'YYYY/MM/DD')] : []}
                onChange={(dates, dateString) => {
                  if (dates) {
                    if(moment(dateString[0]).format('YYYY-MM-DD') == moment(expired.from_date).format('YYYY-MM-DD')){
                      setExpired({
                        from_date: dateString[0],
                        to_date: dateString[1],
                      });
                    }
                  } else {   
                    setExpired({
                      from_date: null,
                      to_date: null,
                    });
                  }
                }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalRules;