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
import { Button, Card, Col, Row, Space, Table,Popconfirm } from 'antd';
require("./style.module.less");

const handleDelete = (key) => {
    console.log('đã click nut delete')
};
const columns = [
  {
    title: 'Mã kết quả trúng thưởng',
    dataIndex: 'segment_id',
    key: 'segment_id',
    
    render: text => <a>{text}</a>,
  },
  {
    title: 'Tên kết quả trúng thưởng',
    dataIndex: 'segment_name',
    key: 'segment_name',
  },
  {
    title: 'chủ đề',
    dataIndex: 'topic_name',
    key: 'topic_name',
    
    render: text => <a>{text}</a>,
  },
  {
    title: 'Ngày hết hiệu lực',
    dataIndex: 'inactived_date',
    key: 'inactived_date',
  },
   {
    title: 'Ngày tạo',
    dataIndex: 'created_date',
    key: 'created_date',
  }, 
  
  {
    title: 'Action',
    key: 'action',
    render: (_, record) =>(

        <Space size="middle">
        <a>Edit</a>
        { data.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} >
                <a style={{color:'red'}}>Delete</a>
              </Popconfirm>
            ) : null
          }
      </Space>
     ),
  },
];

const data = [
  {
    segment_id: '1',
    segment_name: 'tên ket qua trung thuoc',
    topic_name: 'chủ đề',
    inactived_date:'11:00 07/04/2022',
    created_date:'11:00 05/04/2022'
  }, 
   {
    segment_id: '1',
    segment_name: 'tên ket qua trung thuoc',
    topic_name: 'chủ đề',
    inactived_date:'11:00 07/04/2022',
    created_date:'11:00 05/04/2022'
  }, 
   {
    segment_id: '1',
    segment_name: 'tên ket qua trung thuoc',
    topic_name: 'chủ đề',
    inactived_date:'11:00 07/04/2022',
    created_date:'11:00 05/04/2022'
  }, 
   {
    segment_id: '1',
    segment_name: 'tên ket qua trung thuoc',
    topic_name: 'chủ đề',
    inactived_date:'11:00 07/04/2022',
    created_date:'11:00 05/04/2022'
  }, 
  
];

export default function Segment(props) {


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
          title="Tất cả kết quả giải thưởng"
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
              scroll={{ x: 1300 }}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome>
  )
}

