/* --------------------------------------------------------
* Author Lê Quý Nam
* Email lqn1604.dev@gmail.com
* Phone 036.847.5269
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Popconfirm, Select, Typography, Input, } from 'antd';
import { DownOutlined, UpOutlined, ArrowLeftOutlined } from '@ant-design/icons';
;
const { Text } = Typography;
import * as Message from '@/components/message';

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


import moment from 'moment';
// handhandleDelete
WheelDetail.getInitialProps = async ({ query }) => {
  return { query }
}

export default function WheelDetail({ query }) {
  // const { query } = useRouter();
  const dispatch = useDispatch();
  const [topicId, setTopicId] = useState('');
  const [dataSearch, setDataSearch] = useState('')
  const paramsID = query.wheel_id
  const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];
  const listWheelDetail = useSelector(gettersWheelDetail.getStateLoadPageWheelDetail) || [];
  const [isFlagStt, setIsFlagStt] = useState(false);
  const [indexStt, setIndexStt] = useState(true)
  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó
  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])


  const initPage = async () => {

    const data = {
      'wheel_id': query.wheel_id
    }
    await dispatch(actionTopic.searchTopic());
    await dispatch(actionSegment.searchSegment({}));
    // await dispatch(actionWheel.searchWheel({}));
    // await dispatch(actionWheelDetail.searchWheelDetail());
    await dispatch(actionWheelDetail.filterWheelDetail(data));
  }

  const searchBtn = async () => {
    let paramsSearch = {

    }
    await dispatch(actionSegment.searchSegment(paramsSearch));
  }


  const handleDelete = async (record) => {
    let dataRecord = { ...record }
    const result = await dispatch(actionWheelDetail.deleteWheelDetailById(dataRecord));
    if (result) {
      // initPage();
      Message.Success("NOTYFICATON", "DELETE WHEEL DETAIL SUCCESS");
      return
    }
    Message.Error("NOTYFICATON", "DELETE WHEEL DETAIL FAIL");
  };

  const handleOnOut = async (record) => {
    let payload = {

    }
  }

  const handleDownOut = async (record) => {

  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'wheel_detail_id',
      key: 'wheel_detail_id',
      fixed: 'left',
      width: 60
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Tên vòng quay',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      fixed: 'left',
      width: 150,

    },
    {
      title: 'Tên giải thưởng',
      dataIndex: 'segment_name',
      key: 'segment_name',
      fixed: 'center',
      width: 150,

    },
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      fixed: 'center',
      width: 200,
      render: (text, record) => (
        <p style={{
          'width': '100%',
          'display': 'flex',


        }} >
          <span> {record.no}</span>
          {record.is_duplicated ? <span style={{
            'marginLeft': '20px',
            'color': 'red'
          }}>Stt đang bị trùng </span> : ''}
        </p >
      ),
      // render: (text, record) => (
      //   <p style={{
      //     'width': '100%',
      //     'display': 'flex',
      //     'justifyContent': 'space-between'

      //   }}>
      //     <span> {record.no}</span>
      //     <span style={{
      //       'marginRight': '15px',
      //       'marginLeft': '5px'
      //     }}>
      //       <Button style={{
      //         'color': '#32CD32',
      //         'border': 'none'
      //       }}
      //       >
      //         <UpOutlined />
      //       </Button>
      //       <Button style={{
      //         'color': '#FF0000',
      //         'border': 'none',
      //         'marginLeft': '5px'
      //       }}>
      //         <DownOutlined />
      //       </Button>
      //     </span>
      //     { 
      //       indexStt
      //     }
      //     <span >
      //       <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} >Cập nhật STT</Button>
      //     </span>
      //   </p>
      // ),
    },
    {
      title: 'Trúng thưởng',
      dataIndex: 'goal_yn',
      key: 'goal_yn',
      fixed: 'center',
      width: 100,
      render: (text, record) => (
        <Space size="large">
          {text === '1' ? 'N' : 'Y'}
        </Space>
      )
    },
    {
      title: 'Số lần trung thưởng còn lại',
      dataIndex: 'remain_value',
      key: 'remain_value',
      fixed: 'center',
      width: 150,

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
      queryWheel_id: wheel_id
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
    // initPage();
  }
  const backToWheel = () => {
    Router.push('/admin/wheel')
  }
  console.log('listWheelDetail', listWheelDetail)
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
              <Col className="gutter-row" span={1} style={{ marginBottom: 10 }}>
                <Button type='primary' size='middle' style={{ width: '100%' }} title="Quay lại" >
                  <Link href="/admin/wheel">
                    <ArrowLeftOutlined style={{
                      'fontSize': '21px',
                      'marginLeft': '-6px',
                    }} />
                  </Link>
                </Button>
              </Col>
              <Col className="gutter-row" span={2} style={{ marginBottom: 10 }}>
                <Button type='primary' size='middle' style={{ width: '100%' }} >Lưu lại</Button>
              </Col>
            </Row>

          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={12}>
              <Input allowClear placeholder="Thông tin cần tìm" onChange={(event) => setDataSearch(event.target.value)} />
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
          <Col span={48} style={{ marginTop: 10 }}>

            <Table
              columns={columns}
              dataSource={listWheelDetail}
              size='large'
              loading={false}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome>
  )
}

