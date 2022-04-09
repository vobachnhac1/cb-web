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
import * as Message from '@/components/message';

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from 
'@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import ModalTopic from '@/containers/modal-topic';

export default function Topic(props) {
  const dispatch = useDispatch();
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];
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
      title: 'Status',
      dataIndex: 'status_yn',
      key: 'status_yn',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateTopic(record)} >Edit</Button>
          <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} onClick={() => deleteTopic(record)} >Delete</Button>
        </Space>
      ),
    },
  ];
  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó
  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])

  useEffect(() => {
    // chạy khi có sụ thay đổi của listTopic
  }, [listTopic])


  const initPage = async () => {
    await dispatch(actionTopic.searchTopic()); // hàm gọi xuống store call api search-all topic
  }

  const pagination = {
    current: 1,
    pageSize: 10,
    // total: 200,

  };

  const [visible, setVisible] = useState(false);
  const [bodyModel, setBodyModel] = useState({
    isAdd: false,
    record: null
  });

  const addNewTopic = () => {
    setVisible(true);
    setBodyModel({
      record: null,
      isAdd: true
    });
  }
  const updateTopic = (record) => {
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
        <ModalTopic visible={visible} bodyModel={bodyModel} callback={callbackModal} />
        <Card
          headStyle={{
            fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#0C74CF'
          }}
          title="QUẢN LÝ CHỦ ĐỀ"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewTopic}>Thêm</Button>
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
    </LayoutHome >
  )
}

