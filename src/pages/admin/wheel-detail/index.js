/* --------------------------------------------------------
* Author Lê Quý Nam
* Email lqn1604.dev@gmail.com
* Phone 036.847.5269
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Popconfirm, Select, Typography, Input } from 'antd';
const { Text } = Typography;
import * as Message from '@/components/message';
import ModalSegment from '@/containers/modal-segment';
import ModalTopic from '@/containers/modal-topic';
import ModalWheelDetail from '@/containers/modal-wheel-detail'
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import { actions as actionWheelDetail } from '@/redux/wheel-detail';
import { getters as gettersWheelDetail } from '@/redux/wheel-detail';

import moment from 'moment';
// handhandleDelete


export default function WheelDetail(props) {
  const [topicId, setTopicId] = useState('');
  const [dataSearch, setDataSearch] = useState('')
  const dispatch = useDispatch();
  const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];
  const listWheelDetail = [
    {
      "wheel_detail_id": 1,
      "wheel_id": 0,
      "segment_id": 1,
      "no": 1,
      "goal_yn": 1,
      "remain_value": 1,
      "created_date": "2022-04-06T17:05:36.000Z",
      "datelastmaint": "2022-04-06T17:05:36.000Z"
    }
  ];

  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó
  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])


  const initPage = async () => {
    // const paramsInitSegment = {
    //   "wheel_id": 0,
    //   "wheel_detail_id": 0,
    //   "segment_id": 0,
    //   "no": 0,
    //   "goal_yn": 0,
    //   "remain_value": 0,
    //   "inactived_date": "2022-04-11T06:06:50.653Z",
    //   "created_date": "2022-04-11T06:06:50.653Z",
    //   "datelastmaint": "2022-04-11T06:06:50.653Z",
    //   "is_approve": true
    // }
    // await dispatch(actionSegment.searchSegment(paramsInitSegment));
    await dispatch(actionTopic.searchTopic());
    await dispatch(actionWheelDetail.searchWheelDetail());
  }

  const searchBtn = async () => {
    let paramsSearch = {
      "topic_id": topicId,
      "segment_id": 0,
      "segment_name": "string",
      "segment_color": "string",
      "inactived_date": "2022-04-08T04:17:56.025Z",
      "created_date": "2022-04-08T04:17:56.025Z",
      "datelastmaint": "2022-04-08T04:17:56.025Z",
      "is_approve": true,
      'dataSearch': dataSearch,
    }
    console.log(paramsSearch)
    await dispatch(actionSegment.searchSegment(paramsSearch));
  }


  const handleDelete = async (record) => {
    let dataRecord = { ...record }
    console.log('đã click nut delete', dataRecord)
    const result = await dispatch(actionSegment.deleteSegmentById(dataRecord));
    if (result) {
      initPage();
      Message.Success("NOTYFICATON", "DELETE TOPIC SUCCESS");
      return
    }
    Message.Error("NOTYFICATON", "DELETE TOPIC FAIL");
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'wheel_detail_id',
      key: 'wheel_detail_id',
      fixed: 'left',
      width: 100
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Mã vòng quay',
      dataIndex: 'wheel_id',
      key: 'wheel_id',
      fixed: 'left',
      width: 250
    },
    {
      title: 'Mã trúng thưởng',
      dataIndex: 'segment_id',
      key: 'segment_id',
      fixed: 'center',
      width: 250,

    },
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      fixed: 'center',
      width: 250,

    },
    {
      title: 'Số lần trung thưởng còn lại',
      dataIndex: 'remain_value',
      key: 'remain_value',
      fixed: 'center',
      width: 250,

    },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (text, record) => (

        <Space size="middle">
          <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateDetail(record)} >Edit</Button>
          {listWheelDetail.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)} >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Delete</Button>
            </Popconfirm>
          ) : null
          }
        </Space>
      ),
    },
  ];
  const pagination = {
    current: 1,
    pageSize: 10,
    total: 200,

  };


  const [visible, setVisible] = useState(false);
  const [bodyModel, setBodyModel] = useState({
    isAdd: false,
    record: null
  });

  const addNewWheelDetail = () => {
    setVisible(true);
    setBodyModel({
      record: null,
      isAdd: true
    });
  }
  const updateDetail = (record) => {
    setVisible(true);
    setBodyModel({
      record: record,
      isAdd: false
    });
  }


  const callbackModal = (params) => {
    setVisible(params.visible);
    initPage();
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
              <Col className="gutter-row" span={12}>
                <Input placeholder="Thông tin cần tìm" onChange={(event) => setDataSearch(event.target.value)} />
              </Col>
            </Row>
            <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewWheelDetail}>Thêm</Button>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={searchBtn}>Tìm kiếm</Button>
              </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              columns={columns}
              dataSource={listWheelDetail}
              size='large'
              pagination={pagination}
              loading={false}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome>
  )
}

