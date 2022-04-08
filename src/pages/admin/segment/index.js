/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import { useState,useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table,Popconfirm } from 'antd';
import ModalSegment from '@/containers/modal-segment';
import ModalTopic from '@/containers/modal-topic';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';

// handhandleDelete


export default function Segment(props) {
  const dispatch = useDispatch();
 const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];


  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó
  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])
   useEffect(() => {
    
  }, [listSegment])

  // useEffect(() => {
  //   // chạy khi có sụ thay đổi của listTopic
  // }, [listSegment])

  const initPage = async () => {
    await dispatch(actionSegment.searchSegment()); 
  }


  const handleDelete = (key) => {
    console.log('đã click nut delete')
};
const columns = [
  {
    title: 'Mã kết quả trúng thưởng',
    dataIndex: 'segment_id',
    key: 'segment_id',
    fixed: 'left'
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Tên kết quả trúng thưởng',
    dataIndex: 'segment_name',
    key: 'segment_name',
    fixed: 'left'
  },
  {
    title: 'Chủ đề',
    dataIndex: 'topic_name',
    key: 'topic_name',
    
   
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
    render: (text, record) =>(

        <Space size="middle">
        <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateSegment(record)} >Edit</Button>
      
        { listSegment.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} >
                <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }}>Delete</Button>
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

  const deleteTopic = async (record) => {
    const result = await dispatch(actionTopic.deleteTopic(record));
    if (result) {
      initPage();
      Message.Success("NOTYFICATON", "DELETE TOPIC SUCCESS");
      return
    }
    Message.Error("NOTYFICATON", "DELETE TOPIC FAIL");
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
          title="Tất cả kết quả giải thưởng"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF',padding:0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={3}>
               
								<Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewSegment}>Thêm</Button>
						
                
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

