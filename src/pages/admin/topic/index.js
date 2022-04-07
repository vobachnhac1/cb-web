/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import { useState } from 'react';
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table } from 'antd';


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
  }, {
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

const data = [
  {
    topic_id: '1',
    topic_name: 'Trúng Nhà',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '2',
    topic_name: 'Trúng Xe',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '3',
    topic_name: 'Trúng Điện Thoại',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '4',
    topic_name: 'Trúng Laptop',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '5',
    topic_name: 'Trúng Nhà',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '6',
    topic_name: 'Trúng Xe',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '7',
    topic_name: 'Trúng Điện Thoại',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '8',
    topic_name: 'Trúng Laptop',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '9',
    topic_name: 'Trúng Điện Thoại',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '10',
    topic_name: 'Trúng Laptop',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '11',
    topic_name: 'Trúng Điện Thoại',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  }, {
    topic_id: '12',
    topic_name: 'Trúng Laptop',
    inactived_date: '11:00 07/04/2022',
    tags: ['nice', 'developer'],
  },
];

export default function Topic(props) {
  const pagination = {
    current: 1,
    pageSize: 10,
    total: 200,

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
              dataSource={data}
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

