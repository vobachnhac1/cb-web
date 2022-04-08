/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import { useEffect, useState } from 'react';
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';

const columns = [
  {
    title: 'Topic ID',
    dataIndex: 'topic_id',
    key: 'topic_id',
    width: 80,
    render: text => <a>{text}</a>,
  },
  {
    title: 'Topic Name',
    dataIndex: 'topic_name',
    key: 'topic_name',
  },
  {
    title: 'InActive Date',
    dataIndex: 'inactived_date',
    key: 'inactived_date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];


export default function Topic(props) {
  const dispatch = useDispatch();
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];
  useEffect(() => {
    initPage();
  }, [])
  useEffect(() => {
  }, [listTopic])
  const initPage = async () => {
    await dispatch(actionTopic.searchTopic());
  }

  const pagination = {
    current: 1,
    pageSize: 10,
    // total: 200,

  };
  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgba(87, 131, 122, 1)" }}
          title="QUẢN LÝ CHỦ ĐỀ"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }}>Thêm</Button>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }}>Tìm kiếm</Button>
              </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              columns={columns}
              dataSource={listTopic}
              size='large'
              pagination={pagination}
              loading={false}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome>
  )
}

