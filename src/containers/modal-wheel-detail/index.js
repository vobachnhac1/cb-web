/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-08
*------------------------------------------------------- */
// require("./style.module.less");

import { Card, Col, Form, Input, Modal, Row, Select, Typography, Radio, InputNumber, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Message from '@/components/message';
import { useEffect, useState } from 'react';
import moment from 'moment';
// import DisplayWheel from '@/pages/wheel1/[wheel-info]';
import DisplayWheel from '@/pages/wheel1/[wheel-info]';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { getters as gettersTopic } from '@/redux/topic';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';
import { actions as actionWheel } from '@/redux/wheel';
import { getters as gettersWheel } from '@/redux/wheel';
import { actions as actionWheelDetail } from '@/redux/wheel-detail';
import { getters as gettersWheelDetail } from '@/redux/wheel-detail';
import { isBuffer } from 'lodash';

const classNames = require("classnames");
require("./styles.less");
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
  const { callback, visible = false, bodyModel: { isAdd = false, record = null, queryWheel_id, dataListSearch, isViews, isViewsWheel }, recordWheel } = props;
  const dispatch = useDispatch();

  const [wheelDetailId, setWheelDetailId] = useState(record ? record.wheel_detail_id : "")
  const [wheelId, setWheelId] = useState(record ? record.wheel_id : "")
  const [segmentId, setSegmentId] = useState(record ? record.segment_id : "");
  const [segmentValue, setSegmentValue] = useState(1);
  const [wheelColor, setWheelColor] = useState(record ? record.wheel_color : "#659bc9");
  const [no, setNo] = useState(record ? record.no : "")
  const [remainValue, setRemainValue] = useState(record ? record.remain_value : "")
  const [remainNumber, setRemainNumber] = useState(record ? record.remain_number : "")
  const [url, setUrl] = useState(record ? record.url : '')
  const [imgBase64, setImgBase64] = useState(record ? record.imgBase64 : '')
  const [topicId, setTopicId] = useState(record ? record.topic_id : '')
  const [wheelCurtValue_update, setWheelCurtValue_update] = useState(0)
  const [wheelDetailTotalValue_update, setWheelDetailTotalValue_update] = useState(0)
  const [goalYn, setGoalYn] = useState(record ? record.goal_yn : 0)

  // state xử lý hình ảnh
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const [isChanged, setIsChanged] = useState(false);


  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];
  const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];
  const [listSegmentSearch, setListSegmentSearch] = useState([])
  const listWheel = useSelector(gettersWheel.getStateLoadPageWheel) || [];
  const noWheelDetail_length = useSelector(gettersWheelDetail.getStateWheelDetialNo);
  const listWheelDetail = useSelector(gettersWheelDetail.getStateLoadPageWheelDetail) || [];
  const WheelNumbersegment = useSelector(gettersWheelDetail.getStateWheelNumbersegment);

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
    setTopicId(record ? record.topic_id : '')
    setNo(record ? record.no : noWheelDetail_length + 1)
    setRemainNumber(record ? record.remain_number : "")
    setRemainValue(record ? record.remain_value : 0)
    setWheelColor(record ? record.wheel_color : "#659bc9")
    setGoalYn(record ? record.goal_yn : -1)
    setImgBase64(record ? record.imgBase64 : '')
    setUrl(record ? record.url : '')
    setSegmentValue(record ? record.remain_value : 1)
    setListSegmentSearch(listSegment)

    //xử lý file hình

    const dataImg = record && record.imgBase64 ? [{
      uid: "-1",
      name: 'image.png',
      status: 'done',
      preview: true,
      thumbUrl: record ? record.imgBase64 : ''
    }] : []
    setFileList(dataImg)
    setPreviewImage('')
    setPreviewTitle('')
    setIsChanged(false)
  }

  const onCallback = async () => {
    let msg_error = [];
    // kiểm tra form
    if (!segmentId) {
      msg_error.push('-Kết quả trúng thưởng chưa được chọn')
    }
    if (!remainNumber.toString() || parseInt(remainNumber) < 0) {
      msg_error.push('-Số lần trúng thưởng chưa hợp lệ hoặc chưa có nội dung')
    }
    if (!no || no <= 0) {
      msg_error.push('-Số thứ tự chưa hợp lệ hoặc chưa có nội dung')
    }
    if (!isAdd && no > WheelNumbersegment && !record.is_delete) {
      msg_error.push("-Số thứ tự phải nhỏ hơn hoặc bằng " + ' ' + (WheelNumbersegment))
    }
    if (isAdd && no > WheelNumbersegment) {
      msg_error.push("-Số thứ tự phải nhỏ hơn hoặc bằng " + ' ' + (WheelNumbersegment))
    }
    if (goalYn === -1) {
      msg_error.push('-Trúng thưởng chưa được chọn')
    }
    if (!wheelColor || wheelColor.length == 0) {
      msg_error.push("- Màu sắc hiển thị chưa chọn");
    }
    if (!imgBase64) {
      msg_error.push('-Hình chưa được chọn')
    }


    // param
    let param = {
      ...record,
      wheel_detail_id: wheelDetailId ? wheelDetailId : 0,
      wheel_id: wheelId,
      segment_id: segmentId,
      no: no,
      goal_yn: goalYn,
      wheel_color: wheelColor,
      remain_number: remainNumber,
      imgBase64: imgBase64,
      url: url,
      topic_id: topicId
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
        param.segment_color = listSegment[i].segment_color;
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
      param.created_date = moment().format('YYYY-MM-DD, HH:mm:ss')
      const result = await dispatch(actionWheelDetail.insertWheelDetail(param));
      let data = result
      if (result) {
        callback({ visible: false, data: data });
        Message.Success("Thông Báo", "Thêm mới thành công");
        return;
      }
      Message.Error("Thông Báo", "Thêm mới thất bại");
      return;
    }
    //edit
    const result = await dispatch(actionWheelDetail.updateWheelDetail(param));
    let data = result
    if (result) {
      callback({
        visible: false, data: data
      });
      Message.Success("Thông Báo", "Cập nhật thành công");
      return;
    }
    Message.Error("Thông Báo", "Cập nhật thất bại");
  }

  //tính toán giá trị  CurtValue_update ,DetailTotalValue_update
  const calculator = (value, segment_id) => {
    const segment_id_value = segment_id ? segment_id : segmentId
    let remainNumber_value = '';
    if (!value || value == 0 && isAdd) {
      setWheelDetailTotalValue_update(0)
      setWheelCurtValue_update(parseInt(wheelCurtValue))
      remainNumber_value = value == '' ? '' : 0
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
          remainNumber_value = listSegment[i].segment_value == 0 ? 0 : value
          setWheelCurtValue_update(totalWheelDetailcur)
          setWheelDetailTotalValue_update(totalWheelDetail)
          setSegmentValue(listSegment[i].segment_value)

          break
        }
      }
    }
    setRemainNumber(remainNumber_value)
  }

  const onChangeRemainNumber = (text) => {
    const value = text.target.value;
    calculator(value, segmentId)
  }

  const onChangeSegment = async (value) => {
    calculator(1, value)
    setSegmentId(value)
  }

  const onChangeTopic = async (value) => {
    const filter = {
      topic_id: value,
    }
    const { success, data } = await dispatch(actionSegment.filterSegmentByIdTopic(filter));
    if (success) {
      let _from = new Date(recordWheel?.from_date_act);
      let _to = new Date(recordWheel?.to_date_act);
      const _arr = data.listSegmentSearch?.map(item=>{
        const _current = new Date(item.inactived_date);
        if(_to <= _current ||  _current == "Invalid Date"){
          return {
            ...item,
            disabled: false
          }
        }
        return {
          ...item,
          disabled: true
        }
      })
      setListSegmentSearch(_arr)
      onChangeSegment(data.segment_id)
    }
    setTopicId(value)
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

  function beforeUpload(file, arrFile) {
    const isPNG = file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isPNG) {
      Message.Error(`${file.name} is not a png file`);
    }
    if (!isLt2M) {
      Message.Error('Image must smaller than 2MB!');
    }
    if (isPNG && isLt2M) {
      setIsChanged(true)
    }
    return isPNG && isLt2M;
  }

  const handleChange = async ({ fileList }) => {

    if (isChanged) {
      for (let i = 0; i < fileList.length; i++) {
        //status: "done"
        if (fileList[i].status === "done") {
          let database64 = await getBase64(fileList[i].originFileObj)
          setImgBase64(database64)
          break
        }
      }
      setFileList(fileList)
    }
  };

  const handlePreview = async file => {
    if (file.preview) {
      setPreviewImage(file.thumbUrl)
      setPreviewVisible(true)
      setPreviewTitle(file.name)
    } else if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      setPreviewImage(file.url || file.preview)
      setPreviewVisible(true)
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }

  };

  const onRemove = file => {
    setFileList([])
    setImgBase64('')
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  useEffect(() => {

  }, [])

  return (
    <Modal
      width={'50vw'}
      
      maskClosable={false}
      closable={isViewsWheel ? true : false}
      centered
      visible={visible}
      okText={'Xác nhận'}
      okButtonProps={{ disabled: isViewsWheel ? true : false }}
      cancelText={'Thoát'}
      onOk={onCallback}
      onCancel={onCancel}
    >
      <Card
        headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
        title={isViewsWheel ? 'Xem vòng quay' : (isAdd ? "Thêm chi tiết vòng quay" : 'Cập nhật chi tiết vòng quay')}
        bordered={true}
        style={{ backgroundColor: '#FFFFFF', marginTop: '20px' }}>
        {/* test wheel */}
        {
          isViewsWheel ? <Row style={{ marginTop: 10 }}>
            <DisplayWheel arrItem={listWheelDetail} manager={'manager'} />
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
                <Text className={classNames({ 'text-font': true })}>{'Tổng tiền vòng quay: '}</Text>
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
                <Text className={classNames({ 'text-font': true })}>{'Tiền vòng quay còn lại: '}</Text>
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
                    <Text className={classNames({ 'text-font': true })}>{'ID'}</Text>
                  </Col>
                  <Col  {...layoutContent}>
                    <Input disabled style={{ width: '100%' }} value={wheelDetailId} onChange={(text) => setWheelDetailId(text.target.value)} />
                  </Col>
                </Row>
                : ''
            }
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Mã vòng quay '}</Text>
              </Col>
              <Col  {...layoutContent}>

                <Select disabled={true}
                  style={{ width: '100%' }}
                  defaultValue=""
                  value={wheelId}
                  onChange={(value) => setWheelId(value)}>
                  {listWheel.map((item, key) => (
                    <Select.Option value={item?.wheel_id} key={key}>{item?.Wheel_name}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Chủ đề'}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Select
                  style={{ width: '100%' }}
                  value={topicId}
                  onChange={onChangeTopic}>
                  {listTopic.map((item, key) => (
                    <Select.Option value={item?.topic_id} key={key}>{item?.topic_name}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Kết quả giải thưởng'}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Select
                  style={{ width: '100%' }}
                  disabled={topicId ? false : true}
                  value={segmentId}
                  onChange={onChangeSegment}>
                  {listSegmentSearch.map((item, key) => (
                    <Select.Option disabled={item?.disabled} value={item.segment_id} key={key}>{item.segment_name}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Số lần trúng thưởng '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Input type="number" style={{ width: '100%' }} value={remainNumber} disabled={segmentValue == 0 ? true : false} onChange={onChangeRemainNumber} />
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Tổng tiền chi tiết vòng quay '}</Text>
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
                <Text className={classNames({ 'text-font': true })}>{'Số thứ tự trên vòng quay '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Input type="number" min="1" max="15" style={{ width: '100%' }} value={no} onChange={(text) => setNo(text.target.value)} />
              </Col>
            </Row>
            {/* <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Trúng thưởng '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Radio.Group onChange={onChangeRadio} value={goalYn ? goalYn : 0}>
                  <Radio value={1}>Có</Radio>
                  <Radio value={0}>Không</Radio>
                </Radio.Group>
              </Col>
            </Row> */}
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Màu sắc hiển thị '}</Text>
              </Col>
              <Col  {...layoutContent}>
                <Input type="color" style={{ width: '26%' }} value={wheelColor} onChange={(text) => setWheelColor(text.target.value)} />
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col {...layoutHeader} >
                <Text className={classNames({ 'text-font': true })}>{'Hình ảnh '}</Text>
              </Col>
              <Col  {...layoutContent} style={{ height: '104px' }}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                  onRemove={onRemove}

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