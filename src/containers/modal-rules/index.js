/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./style.module.less");
import { Card, Col, Form, Input, Modal, Row, Typography, DatePicker, Tag } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import _ from 'lodash';

const classNames = require("classnames");
const styles = require("./style.module.less");
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
    total_reward: null,
  });

  useEffect(() => {
    initPage();
  }, [visible]);

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
      total_reward: null,
    })
  }

  const onCancel = () => {
    callback({ visible: false });
  }
  const [isChangeText, setIsChangeText] = useState(false)

  const onKeyPress = (event) => {
    let code = event.keyCode || event.charCode;
    if ((code >= 48 && code <= 57) || code === 13) {
      setIsChangeText(true);
    } else {
      setIsChangeText(false);
    }
  }

  const onChangeText = (event) => {
    if (!isChangeText) {
      setIsChangeText(true);
      return;
    };
    setBody({ ...body, total_reward: event.target.value })
  }

  const onCallback = async () => {
    const { total_reward = 0, rules_name = null, from_date = null, to_date = null } = body;
    let msg_error = [];

    if (!total_reward || total_reward == 0) {
      msg_error.push("- Vui lòng nhập tổng giải thưởng trúng trong đợt\n");
    }
    if (!rules_name || rules_name && rules_name.length == 0) {
      msg_error.push("- Vui lòng nhập tên quy tắc \n");
    }
    if (!from_date) {
      msg_error.push("- Vui lòng nhập thời gian hiệu lực \n");
    }
    if (msg_error && msg_error.length > 0) {
      Message.WarningArr("Thông Báo", msg_error);
      return
    }
    //   // add
    if (isAdd) {
      const result = await dispatch(actionsRules.insertRules(body));
      if (result) {
        callback({ visible: false });
        Message.Success("NOTYFICATON", "ADD NEW RULES SUCCESS");
        return;
      }
      Message.Error("NOTYFICATON", "ADD NEW RULES FAILED");
      return;
    }

    //edit
    const result = await dispatch(actionsRules.updateRules(body));
    if (result) {
      callback({ visible: false });
      Message.Success("NOTYFICATON", "UPDATE RULES SUCCESS");
      return;
    }
    Message.Error("NOTYFICATON", "UPDATE RULES FAILED");
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
              <Text className={classNames({ [styles['text-font']]: true })}>{'Mã quy tắc:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              {/* <Input style={{ width: '100%' }} onChange={(text) => { }} /> */}
              <Text>{body.rules_id}</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Tên quy tắc:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={body.rules_name} onChange={(text) => { setBody({ ...body, rules_name: text.target.value }) }} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Số lượng giải được trúng:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input
                onKeyPress={onKeyPress}
                style={{ width: '100%' }}
                value={body.total_reward}
                onChange={onChangeText}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Trạng thái:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Tag color={body.status_rules == 'Y' ? 'green' : "red"}>
                {body.status_rules_name}
              </Tag>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Thời gian áp dụng:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <RangePicker
                // defaultValue={[moment(body.from_date, 'YYYY/MM/DD'), moment(body.to_date, 'YYYY/MM/DD')]}
                value={body.from_date ? [moment(body.from_date, 'YYYY/MM/DD'), moment(body.to_date, 'YYYY/MM/DD')] : []}
                onChange={(dates, dateString) => {
                  if (dates) {
                    setBody({
                      ...body,
                      from_date: dateString[0],
                      to_date: dateString[1],
                    });
                  } else {
                    setBody({
                      ...body,
                      from_date: null,
                      to_date: null,
                    });
                  }
                }}
              />
            </Col>
          </Row>
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Số kết quả '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" style={{ width: '100%' }} value={numSegments} onChange={(text) => setNumSegments(text.target.value)} />
            </Col>
          </Row> */}
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Tài khoản trích tiền game '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Input style={{ width: '100%' }} value={accountNbr} onChange={(text) => setAccountNbr(text.target.value)} />
            </Col>
          </Row> */}
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Tổng giá trị giải '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" style={{ width: '100%' }} value={totalValue} onChange={(text) => setTotalValue(text.target.value)} />
            </Col>
          </Row> */}
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Giá trị còn lại '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input disabled type="number" style={{ width: '100%' }} value={totalValue} onChange={(text) => setRemainValue(text.target.value)} />
            </Col>
          </Row> */}
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Bán kính vòng quay '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" style={{ width: '100%' }} value={outerRadius} onChange={(text) => setOuterRadius(text.target.value)} />
            </Col>
          </Row> */}
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Đặt kích thước chữ '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" style={{ width: '100%' }} value={textFrontSize} onChange={(text) => setTextFrontSize(text.target.value)} />
            </Col>
          </Row> */}
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text type="number" className={classNames({ [styles['text-font']]: true })}>{'Đặt góc vòng quay '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={ratationAngle} onChange={(text) => setRatationAngle(text.target.value)} />
            </Col>
          </Row> */}
          {/* <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Ngày hết hiệu lực '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <DatePicker value={inactived_date ? moment(inactived_date) : null} onChange={(date) => setInactived_date(date)} />
            </Col>
          </Row> */}
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalRules;