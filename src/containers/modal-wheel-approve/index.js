/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
require("./style.module.less");
import { Card, Col, Form, Select, Modal, Row, Typography, DatePicker, Tag } from 'antd';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import _, { set } from 'lodash';

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
const ModalWheelApprove = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { callback, visible = false, bodyModel: { isAdd = false, record = null } } = props;
  const [rules, setRules] = useState(null)
  const [listRules, setListRules] = useState([])
  const [body, setBody] = useState(record ? record : {
    rules_id: null,
    wheel_id: null,
    wheel_name: null,
  });

  useEffect(() => {
    initPage();
  }, [visible]);

  const initPage = () => {
    setListRules(record ? props.listRules : [])
    setBody(record ? record : {
      rules_id: null,
      wheel_id: null,
      wheel_name: null,
    })
  }

  const onCancel = () => {
    callback({ visible: false });
  }

  const onCallback = async () => {
    if (!rules || rules && rules < 0) {
      Message.Warning("THÔNG BÁO", "VUI LÒNG NHẬP QUY TẮC TRƯỚC KHI XÁC NHẬN")
      return
    }
    const param = {
      wheel_id: body.wheel_id,
      rules_id: rules,
    }
    const result = await dispatch(actionsRules.updateWheelWithRules(param));
    if (result) {
      callback({ visible: false });
      Message.Success("Thông Báo", "Thêm mới thành công");
      setRules(null);
      setBody(null);
      setListRules([]);
      return;
    }
    Message.Error("Thông Báo", "Thêm mới thất bại");
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
              <Text className={classNames({ [styles['text-font']]: true })}>{'Mã quy tắc:'}</Text>
            </Col>
            <Col  {...layoutContent}>
              {/* <Input style={{ width: '100%' }} onChange={(text) => { }} /> */}
              <Col  {...layoutContent}>

                <Select
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue=""
                  value={rules}
                  onChange={(value) => setRules(value)}>
                  {listRules.map((item, key) => (
                    <Select.Option value={item.rules_id} key={key}>{item.rules_name}</Select.Option>
                    // <option value={option.value}>{option.label}</option>
                  ))}
                </Select>
              </Col>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}

export default ModalWheelApprove;