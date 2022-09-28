/* --------------------------------------------------------
* Author Lê Quý Nam
* Email lqn1604.dev@gmail.com
* Phone 036.847.5269
* Created: 2022-04-07
*------------------------------------------------------- */
require("./styles.less");
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Popconfirm, Select, Input, DatePicker } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import * as Message from '@/components/message';
import ModalManagerDetailCbCoin from '@/containers/modal-manager-detail-cb-coin';

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionManagerDetailCbCoin } from '@/redux/manager-detail-cb-coin';
import { getters as gettersManagerDetailCbCoin } from '@/redux/manager-detail-cb-coin';

import moment from 'moment';
import __ from 'lodash';

ManagerDetailCbCoin.getInitialProps = async ({ query }) => {
  return { query }
}

export default function ManagerDetailCbCoin({ query }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const listManagerDetailCbCoin = useSelector(gettersManagerDetailCbCoin.getStateLoadPageManagerDetailCbCoin) || [];
  const [filter, setFilter] = useState({
    segment_name: null,
    topic_id: null,
    from_date_act: null,
    to_date_act: null
  });

  useEffect(() => {
    initPage();
  }, [])

  const initPage = async () => {
    setLoading(true);
    const data = {
      'cbCoin_id': query.cbCoin_id
    }
    await dispatch(actionManagerDetailCbCoin.searchManagerDetailCbCoin(data));
    setLoading(false);
  }

  // const onSearch = async () => {

  //   const { segment_name, topic_id, from_date_act, to_date_act } = filter;
  //   if (__.isNil(segment_name) && __.isNil(topic_id) && __.isNil(from_date_act) && __.isNil(to_date_act)) {
  //     initPage();
  //   } else {
  //     setLoading(true);
  //     // const { success } = await dispatch(actionSegment.filterSegment(filter));
  //     if (success)
  //       setLoading(false);
  //   }

  // }

  const handleDelete = async (record) => {
    let dataRecord = record
    const result = await dispatch(actionManagerDetailCbCoin.deleteManagerDetailCbCoin(dataRecord));
    if (result) {
      // onSearch();
      Message.Success("Thông Báo", "Xóa thành công");
      return
    }
    Message.Error("Thông Báo", "Xóa thất bại!");
  };

  const handleUnDelete = async (record) => {
    let dataRecord = record
    const result = await dispatch(actionManagerDetailCbCoin.unDeleteManagerDetailCbCoin(dataRecord));
    if (result) {
      // onSearch();
      Message.Success("Thông Báo", "Khôi phục thành công");
      return
    }
    Message.Error("Thông Báo", "Khôi phục thất bại!");
  };

  const columns = [
    {
      title: 'Giao dịch được tính coin',
      dataIndex: 'behaviorCode',
      key: 'behaviorCode',
      fixed: 'left',
      width: 50,

    },
    {
      title: 'Số điểm trên lần',
      dataIndex: 'point',
      key: 'point',
      width: 40
    },
    {
      title: 'Số lần',
      dataIndex: 'numBehavior',
      key: 'numBehavior',
      width: 40

    },
    {
      title: 'Số Loại',
      dataIndex: 'type',
      key: 'type',
      width: 50

    },
    {
      align: 'center',
      title: 'Action',
      key: 'action',
      width: 50,
      render: (text, record) => (
        <Space size="middle">
          {record.isDelete
            ?
            <Button
              style={{ color: 'white', borderColor: '#fa8c16', borderWidth: 0.5, background: '#faad14' }}
              onClick={() => handleUnDelete(record)}
            >
              Khôi phục</Button>
            : <>
              <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5, marginRight: 10 }} onClick={() => onUpdate(record)}>Cập nhật</Button>
              <Popconfirm title="Bạn có muốn?" onConfirm={() => handleDelete(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
                <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
              </Popconfirm>
            </>

          }
        </Space>
      ),
    },
  ];


  const [visible, setVisible] = useState(false);
  const [bodyModel, setBodyModel] = useState({
    isAdd: false,
    record: null
  });

  const onAddNew = () => {
    setVisible(true);
    setBodyModel({
      record: null,
      isAdd: true
    });
  }
  const onUpdate = (record) => {
    setVisible(true);
    setBodyModel({
      record: record,
      isAdd: false
    });
  }

  const onSave = async (record) => {
    const data = {
      data: listManagerDetailCbCoin
    }
    
    const result = await dispatch(actionManagerDetailCbCoin.saveManagerDetailCbCoin(data));
    if (result) {
      onCancel()
      Message.Success("Thông Báo", "Lưu thành công");
      return
    }
    Message.Error("Thông Báo", "Lưu thất bại!");
  }

  const onCancel = async (record) => {
    //call lại data
    setLoading(true);
    const data = {
      'cbCoin_id': query.cbCoin_id
    }
    await dispatch(actionManagerDetailCbCoin.searchManagerDetailCbCoin(data));
    setLoading(false);

  }

  const callbackModal = (params) => {
    setVisible(params.visible);
    // onSearch()
  }

  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <ModalManagerDetailCbCoin visible={visible} bodyModel={bodyModel} callback={callbackModal} />
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="Quản lý chi tiết CBCoin"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            {/* justify="end" */}
            <Row gutter={[16, 24]} style={{
              'display': 'flex',
              'justifyContent': 'space-between',
              'marginTop': '10px'
            }}>
              <Col className="gutter-row" style={{ marginBottom: 10, }}>
                <Link href="/admin/manager-cb-coin">
                  <Button type='primary' size='middle' style={{ width: '100%' }} title="Quay lại" >
                    <ArrowLeftOutlined style={{
                      'fontSize': '21px',
                      'marginLeft': '-6px',
                      'width': '15px'
                    }} />
                  </Button>
                </Link>
              </Col>

              <Col style={{
                'display': 'flex',
                'flexWrap': 'nowrap'
              }}
              >
                <Col className="gutter-row" style={{
                  'width': '125px'
                }}>
                  <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSave}>Lưu</Button>
                </Col>
                <Col className="gutter-row" style={{
                  'width': '125px'
                }}>
                  <Button type='primary' danger size='middle' style={{ width: '100%' }} onClick={onCancel}>Hủy bỏ</Button>
                </Col>
              </Col>

            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Col className="gutter-row" span={3}>
            <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onAddNew}>Thêm</Button>
          </Col>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              className="table_layout"
              columns={columns}
              dataSource={listManagerDetailCbCoin}
              size='small'
              loading={loading}
              scroll={{ x: 1300, y: '45vh' }}
            />
          </Col>
        </Card>
      </Col >
    </LayoutHome >
  )
}

