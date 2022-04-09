/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
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
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';

import moment from 'moment';
// handhandleDelete


export default function WheelDetail(props) {
  const [topicId, setTopicId] = useState('');
  const [dataSearch, setDataSearch] = useState('')
  const dispatch = useDispatch();
  const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];

  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó
  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])


  const initPage = async () => {
    const paramsInitSegment = {
      "topic_id": 0,
      "segment_id": 0,
      "segment_name": "string",
      "segment_color": "string",
      "inactived_date": "2022-04-08T04:17:56.025Z",
      "created_date": "2022-04-08T04:17:56.025Z",
      "datelastmaint": "2022-04-08T04:17:56.025Z",
      "is_approve": true
    }
    await dispatch(actionSegment.searchSegment(paramsInitSegment));
    await dispatch(actionTopic.searchTopic());
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
      title: 'Mã kết quả\n trúng thưởng',
      dataIndex: 'segment_id',
      key: 'segment_id',
      fixed: 'left',
      width: 100
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Tên kết quả \n trúng thưởng',
      dataIndex: 'segment_name',
      key: 'segment_name',
      fixed: 'left',
      width: 250
    },
    {
      title: 'Chủ đề',
      dataIndex: 'topic_name',
      key: 'topic_name',
      fixed: 'center',
      width: 250,

    },
    {
      title: 'Ngày hết hiệu lực',
      dataIndex: 'inactived_date',
      key: 'inactived_date',
      width: 170,
      render: (text, record) => {
        return <p>
          {!text ? '' : moment(text).format('YYYY-MM-DD, hh:mm:ss')}
        </p>
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 170,
      render: (text, record) => {
        return <p>
          {moment(text).format('YYYY-MM-DD, hh:mm:ss')}
        </p>
      }
    },

    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (text, record) => (

        <Space size="middle">
          <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateSegment(record)} >Edit</Button>

          {listSegment.length >= 1 ? (
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

  const addNewSegment = () => {
    setVisible(true);
    setBodyModel({
      record: null,
      isAdd: true
    });
  }
  const updateSegment = (record) => {
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
        <ModalSegment visible={visible} bodyModel={bodyModel} callback={callbackModal} />

        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgb(3, 77, 162)" }}
          title="Chi tiết vòng quay"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>

              <Col className="gutter-row"  >
                <Text style={{ marginLeft: '4px' }}>{'Chủ đề :'}</Text>
              </Col>
              <Col className="gutter-row" span={4}>

                <Select
                  style={{ width: '100%' }}
                  defaultValue=""
                  value={topicId}
                  onChange={(value) => setTopicId(value)}>
                  {listTopic.map((Item, key) => (
                    <Select.Option value={Item.topic_id} key={key}>{Item.topic_name}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col className="gutter-row" span={12}>
                <Input placeholder="Thông tin cần tìm" onChange={(event) => setDataSearch(event.target.value)} />
              </Col>
            </Row>
            <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewSegment}>Thêm</Button>
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
              dataSource={listSegment}
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

