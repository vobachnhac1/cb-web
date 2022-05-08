/* --------------------------------------------------------
* Author Lê Quý Nam
* Email lqn1604.dev@gmail.com
* Phone 036.847.5269
* Created: 2022-04-07
*------------------------------------------------------- */
// require("./style.module.less");
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Router } from 'next/router';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Popconfirm, Select, Typography, InputNumber, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Text } = Typography;
import * as Message from '@/components/message';
const classNames = require("classnames");
const styles = require("./style.module.less");

import ModalWheelDetail from '@/containers/modal-wheel-detail'

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import { actions as actionWheel } from '@/redux/wheel';
import { getters as gettersWheel } from '@/redux/wheel';
import { actions as actionWheelDetail } from '@/redux/wheel-detail';
import { getters as gettersWheelDetail } from '@/redux/wheel-detail';

WheelDetail.getInitialProps = async ({ query }) => {
  return { query }
}

export default function WheelDetail({ query }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    segment_id: null,
    wheel_name: null,
  });

  const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];
  const listWheelDetail = useSelector(gettersWheelDetail.getStateLoadPageWheelDetail) || [];
  const wheelCurtValue = useSelector(gettersWheelDetail.getStateWheelCurtValue);
  const wheelTotalValue = useSelector(gettersWheelDetail.getStateWheelTotalValue);
  const wheelDetialTotalValue = useSelector(gettersWheelDetail.getStateWheelDetialTotalValue);
  const noWheelDetail_length = useSelector(gettersWheelDetail.getStateWheelDetialNo);
  const WheelNumbersegment = useSelector(gettersWheelDetail.getStateWheelNumbersegment);
  const WheelStatus = useSelector(gettersWheelDetail.getStateWheelStatus);
  const [listSearch, setListSearch] = useState([]);

  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó

  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])

  const initPage = async () => {
    setLoading(true);
    const data = {
      'wheel_id': query.wheel_id
    }
    await dispatch(actionTopic.searchTopic());
    await dispatch(actionSegment.searchSegment({}));
    const { listData } = await dispatch(actionWheelDetail.filterWheelDetail(data));
    setListSearch(listData)
    setLoading(false)
  }

  //tìm kiếm vòng quay
  const onSearch = async () => {
    setLoading(true);
    const result = await dispatch(actionWheelDetail.searchWheelDetailById(filter));
    setListSearch(result)
    setLoading(false)
  }

  // xóa chi tiết vòng quay
  const handleDelete = async (record) => {
    let dataRecord = { ...record }
    const result = await dispatch(actionWheelDetail.deleteWheelDetailById(dataRecord));
    setListSearch(result)
    if (result) {
      Message.Success("Thông Báo", "Xóa thành công");
      return
    }
    Message.Error("Thông Báo", "Xóa thất bại");
  };

  //khôi phục dữ liệu các chi tiết vòng quay bị xóa
  const handleRestore = async (record) => {
    let dataRecord = { ...record }
    // kiểm tra số tiền remain_value có vượt quá Wheel_remain_value
    if (dataRecord.remain_value > wheelCurtValue) {
      Message.Warning("Thông Báo",
        `Số tiền thưởng còn lại của vòng quay:${wheelCurtValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND không đủ để thực hiện việc khôi phục ! `);
      return;
    }
    const result = await dispatch(actionWheelDetail.restoreWheelDetailById(dataRecord));
    setListSearch(result)
    if (result) {
      Message.Success("Thông Báo", "Đã Khôi phục chi tiết vòng quay ");
      return
    }
    Message.Error("Thông Báo", "Khôi phục chi tiết vòng quay thất bại !");
  };

  // lưu lại tất cã data insert update delete gửi về api
  const onSaveListData = async () => {
    let msg_error = [];
    for (let i = 0; i < listWheelDetail.length; i++) {
      if (listWheelDetail[i].is_duplicated) {
        msg_error.push('-STT bị trùng !')
      }
      if (listWheelDetail[i].is_lengthExceeded) {
        msg_error.push('-STT đang bị lớn hơn số vòng quay')
      }
    }

    if (noWheelDetail_length < WheelNumbersegment) {
      msg_error.push(`-Vòng quay đang có số giải thưởng là: ${noWheelDetail_length} nhỏ hơn vòng quay mặt định ${WheelNumbersegment} chi tiết giải thưởng `)
    }

    if (noWheelDetail_length > WheelNumbersegment) {
      msg_error.push(`-Vòng quay chỉ được tối đa ${WheelNumbersegment} chi tiết giải thưởng `)
    }
    if (parseInt(wheelCurtValue) !== 0) {
      msg_error.push(`-Giá trị còn lại vòng quay phải bằng 0 VND `)
    }
    if (msg_error && msg_error.length > 0) {
      Message.WarningArr("Thông Báo", msg_error);
      return
    }

    // return;
    const data = {
      'wheel_id': query.wheel_id,
      'data': listWheelDetail,
      'wheel_curt_value': wheelCurtValue,
      'wheel_total_value': wheelTotalValue,
      'num_segment_wheel': WheelNumbersegment,
      'wheel_status': WheelStatus
    }
    setLoading(true);
    const { success, listData } = await dispatch(actionWheelDetail.SaveOnListWheelDetail(data));
    if (success) {
      Message.Success("Thông Báo", "Đã lưu chi tiết vòng quay thành công.");
      setListSearch(listData)
    } else {
      Message.Error("Thông Báo", "Lưu chi tiết vòng quay thất bại");
    }
    setLoading(false);
  }

  // define colums
  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 40,
      render: (text, record) => {
        return parseInt(text) + 1
      }
    },
    {
      title: 'ID Chi tiết',
      dataIndex: 'wheel_detail_id',
      key: 'wheel_detail_id',
      fixed: 'left',
      width: 100
    },
    {
      title: 'Tên vòng quay',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      fixed: 'left',
      width: 250
    },
    {
      title: 'Tên giải thưởng',
      dataIndex: 'segment_name',
      key: 'segment_name',
      fixed: 'center',
      width: 300
    },
    {
      title: 'Số thứ tự',
      dataIndex: 'no',
      key: 'no',
      fixed: 'center',
      width: 180,
      render: (text, record) => (
        <p style={{
          'width': '100%',
          'display': 'flex',
        }} >
          <span> {record.no}</span>
          {record.is_duplicated ? <span style={{
            'marginLeft': '20px',
            'color': 'red'
          }}>*Stt đang bị trùng </span> : ''}
          {record.is_lengthExceeded ? <span style={{
            'marginLeft': '20px',
            'color': 'red'
          }}>*Stt nên nhỏ hơn sống tổng vòng quay đang có ({noWheelDetail_length}) </span> : ''}
        </p >
      ),
    },
    {
      title: 'Trúng thưởng',
      dataIndex: 'goal_yn',
      key: 'goal_yn',
      fixed: 'center',
      width: 120,
      render: (text, record) => (
        <Space size="large">
          {text == '1' ? 'Y' : 'N'}
        </Space>
      )
    },
    {
      title: 'Số lần còn lại',
      dataIndex: 'remain_number',
      key: 'remain_number',
      fixed: 'center',
      width: 100,

    },
    {
      title: 'Hình ảnh',
      dataIndex: 'imgBase64',
      key: 'imgBase64',
      align: 'center',
      width: 80,
      render: (text, record) => (
        <Space size="large">
          <span>
            <Image alt="example" style={{ width: '40px' }} src={text} />
          </span>
        </Space>
      )

    },
    {
      title: 'Tổng giá trị(VNĐ)',
      dataIndex: 'remain_value',
      key: 'remain_value',
      align: 'end',
      width: 180,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'flex-end',
          'fontWeight': '500'
        }}>
          <span>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </Space>
      )

    },
    {
      align: 'center',
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 170,
      render: (text, record) => {
        return <span>
          {moment(text).format('YYYY-MM-DD, hh:mm:ss')}
        </span>
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (text, record) => (
        <>
          {
            // disabled = { WheelStatus === 'APR' ? true : false}
            WheelStatus === 'APR'
              ?
              <span style={{ color: 'green', }} >
                Đã được duyệt !
              </span>
              :
              record.is_delete ?
                <Space size="middle">
                  {/* onClick={() => viewsDetail(record)} */}
                  <Button style={{ color: '#7cb305', borderColor: '#7cb305', borderWidth: 0.5, }} onClick={() => updateDetail(record)} >Xem</Button>
                  <Popconfirm title="Bạn có muốn?" onConfirm={() => handleRestore(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom">
                    <Button style={{ color: '#faad14', borderColor: '#fa8c16', borderWidth: 0.5 }} >Khôi phục</Button>
                  </Popconfirm>
                </Space>
                :
                <Space size="middle">
                  <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateDetail(record)}  >Cập nhật</Button>
                  <Popconfirm title="Bạn có muốn?" onConfirm={() => handleDelete(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom">
                    <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
                  </Popconfirm>
                </Space>
          }
        </>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const [bodyModel, setBodyModel] = useState({
    isAdd: false,
    record: null
  });

  const addNewWheelDetail = () => {
    const wheel_id = query.wheel_id;
    setVisible(true);
    setBodyModel({
      record: null,
      isAdd: true,
      queryWheel_id: wheel_id,
      dataListSearch: listSearch
    });

  }
  const updateDetail = (record) => {
    setVisible(true);
    setBodyModel({
      record: record,
      isAdd: false,
      dataListSearch: listSearch
    });
  }

  const onViewsWheel = (record) => {
    if (noWheelDetail_length == WheelNumbersegment) {
      setVisible(true);
      setBodyModel({
        record: record,
        isAdd: false,
        isViewsWheel: true,
        dataListSearch: listSearch
      });
    } else {
      Message.Error("Thông Báo", `Vòng quay chưa đủ ${WheelNumbersegment} chi tiết vòng quay !!!`);
      return;
    }

  }

  const callbackModal = (params) => {
    setVisible(params.visible);
    setListSearch(params.data)
  }
  const backToWheel = () => {
    Router.push('/admin/wheel')
  }

  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <ModalWheelDetail visible={visible} bodyModel={bodyModel} callback={callbackModal} />

        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="Chi tiết vòng quay"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" style={{ marginBottom: 10, }}>
                <Button type='primary' size='middle' style={{ width: '100%' }} title="Quay lại" >
                  <Link href="/admin/wheel">
                    <ArrowLeftOutlined style={{
                      'fontSize': '21px',
                      'marginLeft': '-6px',
                      'width': '15px'
                    }} />
                  </Link>
                </Button>
              </Col>
              <Col className="gutter-row" span={5} offset={5}>
                <Text className={classNames({ [styles['text-font']]: true })}>{'Tổng tiền vòng quay: '}</Text>
                <InputNumber style={{ width: '100%' }}
                  addonAfter={"VND"}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  disabled
                  value={wheelTotalValue} />
              </Col>
              <Col className="gutter-row" span={5} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Tiền vòng quay còn lại: '}</Text>
                <InputNumber
                  style={{ width: '100%' }}
                  addonAfter={"VND"}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  disabled
                  value={wheelCurtValue} />
              </Col>
              <Col className="gutter-row" span={5} >
                <Text className={classNames({ [styles['text-font']]: true })}>{'Tổng tiền chi tiết vòng quay '}</Text>
                <InputNumber
                  style={{ width: '100%' }}
                  addonAfter={"VND"}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  disabled
                  value={wheelDetialTotalValue} />
              </Col>
            </Row>

          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              <Select
                allowClear
                placeholder="Tên giải thưởng"
                style={{ width: '100%' }}
                defaultValue=""
                value={filter.segment_id}
                onChange={(value) => setFilter({ ...filter, segment_id: value })}>
                {listSegment.map((Item, key) => (
                  <Select.Option value={Item.segment_id} key={key}>{Item.segment_name}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
            <Col className="gutter-row" span={2}>
              <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewWheelDetail} disabled={WheelStatus === 'APR' ? true : false}>Thêm</Button>
            </Col>
            <Col className="gutter-row" span={2}>
              <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch}>Tìm kiếm</Button>
            </Col>
            <Col className="gutter-row" span={3}>
              <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onViewsWheel}>Xem vòng quay</Button>
            </Col>
            <Col className="gutter-row" span={2}>
              <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSaveListData} disabled={WheelStatus === 'APR' ? true : false}>Lưu lại</Button>
            </Col>
          </Row>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              columns={columns}
              dataSource={listSearch}
              size='small'
              loading={loading}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome>
  )
}

