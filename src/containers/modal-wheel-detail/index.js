/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
// require("./style.module.less");

import Header from '@/components/Head';
import Layout from '@/layout';
import { Card, Col, Form, Input, Modal, Row, Select, Typography, Radio, InputNumber, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Wheel from '@/pages/wheel'
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { getters as gettersTopic } from '@/redux/topic';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';
import { actions as actionWheel } from '@/redux/wheel';
import { getters as gettersWheel } from '@/redux/wheel';
import { actions as actionWheelDetail } from '@/redux/wheel-detail';
import { getters as gettersWheelDetail } from '@/redux/wheel-detail';

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
const ModalWheelDetail = (props) => {
  const { callback, visible = false, bodyModel: { isAdd = false, record = null, queryWheel_id, dataListSearch, isViews, isViewsWheel } } = props;
  const dispatch = useDispatch();

  const [wheelDetailId, setWheelDetailId] = useState(record ? record.wheel_detail_id : "")
  const [wheelId, setWheelId] = useState(record ? record.wheel_id : "")
  const [segmentId, setSegmentId] = useState(record ? record.segment_id : "");
  const [no, setNo] = useState(record ? record.no : "")
  const [remainValue, setRemainValue] = useState(record ? record.remain_value : "")
  const [remainNumber, setRemainNumber] = useState(record ? record.remain_number : "")
  const [url, setUrl] = useState(record ? record.url : '')
  const [imgBase64, setImgBase64] = useState(record ? record.imgBase64 : '')
  const [wheelCurtValue_update, setWheelCurtValue_update] = useState(0)
  const [wheelDetailTotalValue_update, setWheelDetailTotalValue_update] = useState(0)
  const [goalYn, setGoalYn] = useState(record ? record.goal_yn : 0)

  // state xử lý hình ảnh
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])


  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];
  const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];
  const listWheel = useSelector(gettersWheel.getStateLoadPageWheel) || [];
  const noWheelDetail_length = useSelector(gettersWheelDetail.getStateWheelDetialNo);
  const listWheelDetail = useSelector(gettersWheelDetail.getStateLoadPageWheelDetail) || [];

  let wheelCurtValue = useSelector(gettersWheelDetail.getStateWheelCurtValue);
  let wheelTotalValue = useSelector(gettersWheelDetail.getStateWheelTotalValue);
  let wheelDetialTotalValue = useSelector(gettersWheelDetail.getStateWheelDetialTotalValue);

  useEffect(() => {
    initPage();
  }, [visible]);

  const initPage = async () => {
    setWheelCurtValue_update(parseInt(wheelCurtValue))
    setWheelDetailTotalValue_update(record ? record.remain_value : 0)
    setWheelDetailId(record ? record.wheel_detail_id : "")
    setWheelId(record ? record.wheel_id : queryWheel_id)
    setSegmentId(record ? record.segment_id : "")
    setNo(record ? record.no : "")
    setRemainNumber(record ? record.remain_number : "")
    setRemainValue(record ? record.remain_value : 0)
    setGoalYn(record ? record.goal_yn : -1)
    setImgBase64(record ? record.imgBase64 : '')
    setUrl(record ? record.url : '')

    //xử lý file hình
    setFileList([])
    setPreviewImage('')
    setPreviewTitle('')
  }

  const onCallback = async () => {
    let msg_error = [];
    // kiểm tra form
    if (!segmentId) {
      msg_error.push('-Kết quả trúng thưởng chưa được chọn')
      // Message.Warning("NOTYFICATON", "Kết quả trúng thưởng chưa được chọn");
      // return;
    }
    if (!remainNumber || remainNumber <= -1) {
      msg_error.push('-Số lần trúng thưởng chưa hợp lệ hoặc chưa có nội dung')
      // Message.Warning("NOTYFICATON", "Số lần trúng thưởng chưa hợp lệ hoặc chưa có nội dung");
      // return;
    }
    if (!no || no <= 0) {
      msg_error.push('-Số thứ tự chưa hợp lệ hoặc chưa có nội dung')
      // Message.Warning("NOTYFICATON", "Số thứ tự chưa hợp lệ hoặc chưa có nội dung");
      // return;
    }
    if (!isAdd && no > noWheelDetail_length && !record.is_delete) {
      msg_error.push("-Số thứ tự phải nhỏ hơn hoặc bằng " + ' ' + (noWheelDetail_length))
      // Message.Warning("NOTYFICATON", "Số thứ tự phải nhỏ hơn hoặc bằng " + ' ' + (noWheelDetail_length));
      // return;
    }
    if (isAdd && no > noWheelDetail_length + 1) {
      msg_error.push("-Số thứ tự phải nhỏ hơn hoặc bằng " + ' ' + (noWheelDetail_length + 1))
      // Message.Warning("NOTYFICATON", "Số thứ tự phải nhỏ hơn hoặc bằng " + ' ' + (noWheelDetail_length + 1));
      // return;
    }
    if (goalYn === -1) {
      msg_error.push('-Trúng thưởng chưa được chọn')
      // Message.Warning("NOTYFICATON", "Trúng thưởng chưa được chọn");
      // return;
    }
    if (!imgBase64) {
      msg_error.push('-Hình chưa được chọn')
      // Message.Warning("NOTYFICATON", "Trúng thưởng chưa được chọn");
      // return;
    }


    // param
    let param = {
      ...record,
      wheel_detail_id: wheelDetailId ? wheelDetailId : 0,
      wheel_id: wheelId,
      segment_id: segmentId,
      no: no,
      goal_yn: goalYn,
      remain_number: remainNumber,
      imgBase64: imgBase64,
      url: url
    }
    //get wheelname
    for (let i = 0; i < listWheel.length; i++) {
      if (wheelId == listWheel[i].wheel_id) {
        param.wheel_name = listWheel[i].wheel_name;
        break
      }
    }
    // segmentname, 
    for (let i = 0; i < listSegment.length; i++) {
      if (segmentId == listSegment[i].segment_id) {
        // Thêm segment_name vào param
        param.segment_name = listSegment[i].segment_name;
        if (!listSegment[i].remain_value) {
          // Thêm  tổng giá trị chi tiết vòng quay vào param (remain_number * segment_value) vào param
          param.remain_value = (listSegment[i].segment_value * param.remain_number);
        }
        break
      }
    }

    //trường hợp thêm mới 
    if (isAdd && param.remain_value > wheelCurtValue) {
      msg_error.push(`-Số tiền chi tiết vòng hiện tại là: ${param.remain_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND đã vượt quá số tiền còn lại của tổng vòng quay : ${wheelCurtValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND, Vui lòng chọn lại giải thưởng hoặc số lần trúng thưởng còn lại ! `)
    }// trường hợp update
    else if (!isAdd) {
      if (wheelCurtValue_update < 0) {
        // wheelDetailTotalValue_update > (wheelTotalValue - wheelDetialTotalValue) && parseInt(wheelDetailTotalValue_update) !== parseInt(remainValue)
        msg_error.push(`-Số tiền chi tiết vòng hiện tại là: ${param.remain_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND đã vượt quá số tiền còn lại của tổng vòng quay : ${wheelCurtValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND, Vui lòng chọn lại giải thưởng hoặc số lần trúng thưởng còn lại ! `)
      }
    }

    if (msg_error && msg_error.length > 0) {
      Message.WarningArr("Thông Báo", msg_error);
      return
    }

    // add
    if (isAdd) {
      const result = await dispatch(actionWheelDetail.insertWheelDetail(param));
      let data = result
      if (result) {
        callback({ visible: false, data: data });
        Message.Success("NOTYFICATON", "ADD NEW WHEEL DETAIL SUCCESS");
        return;
      }
      Message.Error("NOTYFICATON", "ADD NEW WHEEL DETAIL FAILED");
      return;
    }
    //edit
    const result = await dispatch(actionWheelDetail.updateWheelDetail(param));
    let data = result
    if (result) {
      callback({
        visible: false, data: data
      });
      Message.Success("NOTYFICATON", "UPDATE WHEELDETAIL SUCCESS");
      return;
    }
    Message.Error("NOTYFICATON", "UPDATE WHEELDETAIL FAILED");
  }

  //tính toán giá trị  CurtValue_update ,DetailTotalValue_update
  const calculator = (value, segment_id) => {
    const segment_id_value = segment_id ? segment_id : segmentId
    if (!value || value == 0 && isAdd) {
      setWheelDetailTotalValue_update(0)
      setWheelCurtValue_update(parseInt(wheelCurtValue))
    } else {
      for (let i = 0; i < listSegment.length; i++) {
        if (parseInt(segment_id_value) === parseInt(listSegment[i].segment_id)) {
          let totalWheelDetailcur = 0
          let totalWheelDetail = (parseInt(value) * parseInt(listSegment[i].segment_value))
          // trường hợp khi tổng chi tiết totalWheelDetail = 0, thì sẽ tính lại WheelCurtValue_update = WheelCurtValue_update + record.remainvalue
          if (totalWheelDetail == 0) {
            // totalWheelDetailcur = parseInt(wheelCurtValue) + parseInt(remainValue)wheelCurtValue
            totalWheelDetailcur = wheelCurtValue
          } else {
            totalWheelDetailcur = parseInt(wheelTotalValue) - ((parseInt(wheelDetialTotalValue) - parseInt(remainValue)) + parseInt(totalWheelDetail))
          }
          // thay đổi giá trị state curtvalue && total chi tiet
          setWheelCurtValue_update(totalWheelDetailcur)
          setWheelDetailTotalValue_update(totalWheelDetail)
          break
        }
      }
    }
    setRemainNumber(value)
  }

  const onChangeRemainNumber = (text) => {
    //khi text.target.value  = null || == 0, && trường hợp là thêm thì sẽ lấy giá trị value hiện tại trên state redux
    const value = text.target.value;
    calculator(value, segmentId)

  }

  const onChangeSegment = async (value) => {
    setSegmentId(value)
    calculator(1, value)
  }


  const onCancel = () => {
    callback({ visible: false, data: dataListSearch });
  }

  const onChangeRadio = (e) => {
    setGoalYn(e.target.value);
  }

  //flow xử lý hình ảnh

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleChange = async ({ fileList }) => {

    for (let i = 0; i < fileList.length; i++) {
      //status: "done"
      if (fileList[i].status === "done") {
        let database64 = await getBase64(fileList[i].originFileObj)
        setImgBase64(database64)
        break
      }
    }

    setFileList(fileList)
  };
  const handlePreview = async file => {
    // console.log('handlePreview', file)
    // console.log('handlePreview checkfile', typeof file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // console.log('fileList', fileList)
  // console.log('setImgBase64', imgBase64)

  return (
    <Modal
      width={750}
      maskClosable={false}
      closable={false}
      centered
      visible={visible}
      okText={'Comfirm'}
      okButtonProps={{ disabled: isViewsWheel ? true : false }}
      cancelText={'Cancel'}
      onOk={onCallback}
      onCancel={onCancel}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
        title={isViewsWheel ? 'Xem vòng quay' : (isAdd ? "Thêm chi tiết vòng quay" : 'Cập nhật chi tiết vòng quay')}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
        {/* test wheel */}
        {
          isViewsWheel ? <Row style={{ marginTop: 10 }}>
            <Wheel arrItem={listWheelDetail} manager={'manager'} />
          </Row> : <Form
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
                <Text className={classNames({ [styles['text-font']]: true })}>{'Tổng tiền vòng quay: '}</Text>
              </Col>
              <Col  {...layoutContent}>

                <InputNumber
                  style={{ width: '100%' }}
                  addonAfter={"VND"}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  disabled
                  value={wheelTotalValue}
                />
              </Col>

            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Tiền vòng quay còn lại: '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <InputNumber
                  style={{ width: '100%' }}
                  addonAfter={"VND"}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  disabled
                  value={wheelCurtValue_update}

                />
              </Col>
              {/* wheelCurtValue */}
            </Row >
            {
              !isAdd ?
                <Row style={{ marginTop: 10 }} >
                  <Col {...layoutHeader} >
                    <Text className={classNames({ [styles['text-font']]: true })}>{'ID'}</Text>
                  </Col>
                  <Col  {...layoutContent}>
                    <Input disabled style={{ width: '100%' }} value={wheelDetailId} onChange={(text) => setWheelDetailId(text.target.value)} />
                  </Col>
                </Row>
                : ''
            }
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Mã vòng quay '}</Text>
              </Col>
              <Col  {...layoutContent}>

                <Select disabled={true}
                  style={{ width: '100%' }}
                  defaultValue=""
                  value={
                    wheelId}
                  onChange={(value) => setWheelId(value)}>
                  {listWheel.map((Item, key) => (
                    <Select.Option value={Item.wheel_id} key={key}>{Item.Wheel_name}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Kết quả trúng thưởng'}</Text>
              </Col>
              <Col  {...layoutContent}>

                <Select
                  style={{ width: '100%' }}
                  value={segmentId}
                  onChange={onChangeSegment}>
                  {listSegment.map((Item, key) => (
                    <Select.Option value={Item.segment_id} key={key}>{Item.segment_name}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Số lần trúng thưởng '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Input type="number" min={0} style={{ width: '100%' }} value={remainNumber} onChange={onChangeRemainNumber} />
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Tổng tiền chi tiết vòng quay '}</Text>
              </Col>
              <Col  {...layoutContent}>

                {/* <Input disabled type="number" style={{ width: '100%' }} value={wheelCurtValue_update === wheelCurtValue ? 0 : wheelCurtValue_update} /> */}

                <InputNumber
                  style={{ width: '100%' }}
                  addonAfter={"VND"}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  disabled
                  value={wheelDetailTotalValue_update}
                />
                {/* viêt span ở đây, nếu Tổng tiền chi tiết vòng quay > wheelcur thì báo lỗi */}
                {wheelCurtValue_update < 0 ? <span style={{ color: 'red' }}>
                  Số tiền giải thưởng hiện tại đang lớn hơn số tiền còn lại của vòng quay !
                </span> : ""
                }
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Số thứ tự trên vòng quay '}</Text>
              </Col>
              <Col  {...layoutContent}>

                <Input type="number" min="1" max="15" style={{ width: '100%' }} value={no} onChange={(text) => setNo(text.target.value)} />
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Trúng thưởng '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Radio.Group onChange={onChangeRadio} value={goalYn ? goalYn : 0}>
                  <Radio value={1}>Có</Radio>
                  <Radio value={0}>Không</Radio>

                </Radio.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Hình ảnh '}</Text>
              </Col>
              <Col  {...layoutContent} style={{ height: '104px' }}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={() => setPreviewVisible(false)}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Col>
            </Row>


          </Form>
        }

      </Card>
    </Modal>
  )
}

export default ModalWheelDetail;