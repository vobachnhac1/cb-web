/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./styles.less");
import { Card, Col, Form, Input, Modal, Row, Typography, DatePicker, InputNumber, Select } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useDispatch } from 'react-redux';
import { actions as actionWheel } from '@/redux/wheel';
import _ from 'lodash';
const { RangePicker } = DatePicker;

const classNames = require("classnames");
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

const NUMBER_REWARD =[
  8,10,12,14
]
const ModalSegment = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const [wheelId, setWheelId] = useState(record ? record.wheel_id : "");
  const [wheelName, setWheelName] = useState(record ? record.wheel_name : "");
  const [numSegments, setNumSegments] = useState(record ? record.num_segments : "");
  const [accountNbr, setAccountNbr] = useState(record ? record.account_nbr : "");
  const [totalValue, setTotalValue] = useState(record ? record.total_value : "");
  const [remainValue, setRemainValue] = useState(record ? record.remain_value : "");
  const [outerRadius, setOuterRadius] = useState(record ? record.outer_radius : "");
  const [textFrontSize, setTextFrontSize] = useState(record ? record.text_fontsize : "");
  const [ratationAngle, setRatationAngle] = useState(record ? record.rotation_angle : "");
  const [inactived_date, setInactived_date] = useState(record ? record.inactived_date : "");
  const [from_date_act, setFromDateAct] = useState(record ? record?.from_date_act : "");
  const [to_date_act, setToDateAct] = useState(record ? record?.to_date_act : "");


  const dispatch = useDispatch();


  useEffect(() => {
    initPage();
  }, [visible]);

  const initPage = async () => {
    setWheelId(record ? record.wheel_id : "")
    setWheelName(record ? record.wheel_name.toString() : "")
    setNumSegments(record ? record.num_segments.toString() : "")
    setAccountNbr(record ? record.account_nbr.toString() : "")
    setTotalValue(record ? record.total_value.toString() : "")
    setRemainValue(record ? record.remain_value.toString() : "")
    setOuterRadius(record ? record.outer_radius.toString() : "")
    setTextFrontSize(record ? record.text_fontsize.toString() : "10")
    setRatationAngle(record ? record.rotation_angle.toString() : "")
    setInactived_date(record ? record.inactived_date.toString() : "")
  }

  const onCallback = async () => {
    let msg_error = [];

    if ((!wheelId || wheelId.length == 0) && !isAdd) {
      msg_error.push("-ID chưa điền nội dung");
    }
    if (!wheelName || wheelName.length == 0) {
      msg_error.push("-Tên vòng quay chưa điền nội dung");
    }
    if (!numSegments || numSegments.length == 0) {
      msg_error.push("-Số kết quả trúng thưởng chưa có nội dung");
    }
    if (parseInt(numSegments) > 14) {
      msg_error.push("-Số kết quả trúng thưởng không được lớn hơn 14");
    }
    if (!accountNbr) {
      msg_error.push("-Tài khoản trích tiền chưa có nội dung");
    }
    if (!totalValue) {
      msg_error.push("-Tổng giải thưởng chưa có nội dung");
    }
    if (!textFrontSize) {
      msg_error.push("-Đặt kích thước chữ chưa có nội dung");
    }
    if (parseInt(textFrontSize) < 0) {
      msg_error.push("-Kích thước chữ đang là giá trị bé hơn 0");
    }
    // if (!inactived_date || inactived_date.length == 0) {
    //   msg_error.push("-Hãy chọn ngày kết thúc giải thưởng");
    // }  
    if (!from_date_act || from_date_act.length == 0) {
      msg_error.push("-Hãy chọn ngày bắt đầu giải thưởng");
    } 
    if (!to_date_act || to_date_act.length == 0) {
      msg_error.push("-Hãy chọn ngày kết thúc giải thưởng");
    }
    if (msg_error && msg_error.length > 0) {
      Message.WarningArr("Thông Báo", msg_error);
      return
    }

    const param = {
      ...record,
      "wheel_id": wheelId ? wheelId : 0,
      "num_segments": numSegments,
      "wheel_name": wheelName,
      "account_nbr": accountNbr,
      "total_value": totalValue,
      "remain_value": isAdd ? totalValue : remainValue,
      "outer_radius": outerRadius,
      "text_fontsize": textFrontSize,
      "rotation_angle": ratationAngle,
      "inactived_date": inactived_date,
      "from_date_act": from_date_act,
      "to_date_act": to_date_act,
      "created_date": null,
      "datelastmaint": null,
      "is_approve": true

    }

    // add
    if (isAdd) {
      const result = await dispatch(actionWheel.insertWheel(param));
      if (result) {
        callback({ visible: false });
        Message.Success("Thông Báo", "Thêm mới thành công");
        return;
      }
      Message.Error("Thông Báo", "Thêm mới thất bại");
      return;
    }
    //edit
    const result = await dispatch(actionWheel.updateWheel(param));
    if (result) {
      callback({ visible: false });
      Message.Success("Thông Báo", "Cập nhật thành công");
      return;
    }
    Message.Error("Thông Báo", "Cập nhật thất bại");


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
      cancelText={'Thoát'}
      onOk={onCallback}
      onCancel={onCancel}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgb(3, 77, 162)" }}
        title={isAdd ? "Thêm vòng quay" : 'Cập nhật vòng quay'}
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
            wheelId ? <Row >
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'ID '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Input type="number" style={{ width: '100%' }} value={wheelId} onChange={(text) => setWheelId(text.target.value)} disabled />
              </Col>
            </Row>
              : ""
          }

          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tên vòng quay'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={wheelName} onChange={(text) => setWheelName(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Số kết quả '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Select
                  disabled={false}
                  value={numSegments}
                  style={{ width: '100%' }}
                  onChange={value => setNumSegments(value)}
                >
                  {NUMBER_REWARD.map((item,index)=><Select.Option key={index} value ={item}>{item}</Select.Option>)}
                </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tài khoản trích tiền game '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={accountNbr} onChange={(text) => setAccountNbr(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Tổng giá trị giải '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <InputNumber style={{ width: '100%' }}
                addonAfter={"VND"}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                value={totalValue}
                onChange={(text) => setTotalValue(text)}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Giá trị còn lại '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <InputNumber style={{ width: '100%' }}
                addonAfter={"VND"}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                value={totalValue}
                onChange={(text) => setRemainValue(text)}
                disabled
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Đặt kích thước chữ '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" style={{ width: '100%' }} value={textFrontSize} onChange={(text) => setTextFrontSize(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ 'text-font': true })}>{'Ngày hết hiệu lực '}</Text>
            </Col>
            <Col  {...layoutContent}>

              {/* <DatePicker disabledDate={d => !d || d.isSameOrBefore(moment().set('date', (moment().date())))} value={inactived_date ? moment(inactived_date) : null} onChange={(date) => setInactived_date(date)} /> */}
              <RangePicker
                placeholder={['Bắt đầu','Kết thúc']}
                disabledDate={d => !d || d.isSameOrBefore(moment().set('date', (moment().date() )))}
                value={from_date_act ? [moment(from_date_act, 'YYYY/MM/DD'), moment(to_date_act, 'YYYY/MM/DD')] : []}
                onChange={(dates, dateString) => {
                  if (dates) {
                    setFromDateAct(dateString[0]);
                    setToDateAct(dateString[1]);
                    
                  } else {
                    setFromDateAct(null);
                    setToDateAct(null);
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

export default ModalSegment;