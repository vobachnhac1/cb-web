/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./style.module.less");
import { Card, Col, Form, Input, Modal, Row, Typography, DatePicker } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionWheel } from '@/redux/wheel';


const classNames = require("classnames");
const styles = require("./style.module.less");
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


  const dispatch = useDispatch();


  useEffect(() => {
    initPage();
  }, [visible]);

  const initPage = async () => {
    setWheelId(record ? record.wheel_id : "")
    setWheelName(record ? record.wheel_name : "")
    setNumSegments(record ? record.num_segments : "")
    setAccountNbr(record ? record.account_nbr : "")
    setTotalValue(record ? record.total_value : "")
    setRemainValue(record ? record.remain_value : "")
    setOuterRadius(record ? record.outer_radius : "")
    setTextFrontSize(record ? record.text_fontsize : "")
    setRatationAngle(record ? record.rotation_angle : "")
    setInactived_date(record ? record.inactived_date : "")
  }

  const onCallback = async () => {
    let msg_error = [];

    if ((!wheelId || wheelId.lenght == 0) && !isAdd) {
      msg_error.push("-ID chưa điền nội dung");
    }
    if (!wheelName || wheelName.lenght == 0) {
      msg_error.push("-Tên vòng quay chưa điền nội dung");
    }
    if (!numSegments || numSegments.lenght == 0) {
      msg_error.push("-Số kết quả trúng thưởng chưa có nội dung");
    }
    if (!accountNbr || accountNbr.lenght == 0) {
      msg_error.push("-Tài khoản trích tiền chưa có nội dung");
    }
    if (!totalValue || totalValue.lenght == 0) {
      msg_error.push("-Tổng giải thưởng chưa có nội dung");
    }
    if (!remainValue || remainValue.lenght == 0) {
      msg_error.push("-Tổng giá trị giải thuưởng còn lại chưa có nội dung");
    }
    if (!outerRadius || outerRadius.lenght == 0) {
      msg_error.push("-Bán kính vòng quay chưa có nội dung");
    }
    if (!textFrontSize || textFrontSize.lenght == 0) {
      msg_error.push("-Đặt kích thước chữ chưa có nội dung");
    }
    if (!ratationAngle || ratationAngle.lenght == 0) {
      msg_error.push("-Đặt góc vòng quay chưa có nội dung");
    }
    if (!inactived_date || inactived_date.lenght == 0) {
      msg_error.push("-Hãy chọn ngày kết thúc giải thưởng");
    }
    if (msg_error && msg_error.length > 0) {
      Message.WarningArr("Thông Báo", msg_error);
      return
    }

    const param = {
      ...record,
      "wheel_id": wheelId,
      "num_segments": numSegments,
      "wheel_name": wheelName,
      "account_nbr": accountNbr,
      "total_value": totalValue,
      "remain_value": remainValue,
      "outer_radius": outerRadius,
      "text_fontsize": textFrontSize,
      "rotation_angle": ratationAngle,
      "inactived_date": inactived_date,
      "created_date": "2022-04-09T08:41:40.514Z",
      "datelastmaint": "2022-04-09T08:41:40.514Z",
      "is_approve": true

    }

    // add
    if (isAdd) {
      const result = await dispatch(actionWheel.insertWheel(param));
      if (result) {
        callback({ visible: false });
        Message.Success("NOTYFICATON", "ADD NEW WHEEL SUCCESS");
        return;
      }
      Message.Error("NOTYFICATON", "ADD NEW WHEEL FAILED");
      return;
    }
    //edit
    const result = await dispatch(actionWheel.updateWheel(param));
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
                <Text className={classNames({ [styles['text-font']]: true })}>{'ID '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Input type="number" style={{ width: '100%' }} value={wheelId} onChange={(text) => setWheelId(text.target.value)} disabled />
              </Col>
            </Row>
              : ""
          }

          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Tên vòng quay'}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={wheelName} onChange={(text) => setWheelName(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text type="number" className={classNames({ [styles['text-font']]: true })}>{'Số kết quả '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={numSegments} onChange={(text) => setNumSegments(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Tài khoản trích tiền game '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Input style={{ width: '100%' }} value={accountNbr} onChange={(text) => setAccountNbr(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Tổng giá trị giải '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" style={{ width: '100%' }} value={totalValue} onChange={(text) => setTotalValue(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Giá trị còn lại '}</Text>
            </Col>
            <Col  {...layoutContent}>

              <Input type="number" style={{ width: '100%' }} value={remainValue} onChange={(text) => setRemainValue(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Bán kính vòng quay '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" style={{ width: '100%' }} value={outerRadius} onChange={(text) => setOuterRadius(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text className={classNames({ [styles['text-font']]: true })}>{'Đặt kích thước chữ '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input type="number" style={{ width: '100%' }} value={textFrontSize} onChange={(text) => setTextFrontSize(text.target.value)} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col {...layoutHeader} >
              <Text type="number" className={classNames({ [styles['text-font']]: true })}>{'Đặt góc vòng quay '}</Text>
            </Col>
            <Col  {...layoutContent}>
              <Input style={{ width: '100%' }} value={ratationAngle} onChange={(text) => setRatationAngle(text.target.value)} />
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