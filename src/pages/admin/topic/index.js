/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Table, DatePicker } from 'antd';
import moment from 'moment';
import __ from 'lodash';
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import * as Message from '@/components/message';

const { RangePicker } = DatePicker;
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from
  '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';
import ModalTopic from '@/containers/modal-topic';

export default function Topic(props) {
  const dispatch = useDispatch();
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({
    topic_name: null,
    from_date_act: null,
    to_date_act: null
  });
  const [bodyModel, setBodyModel] = useState({
    isAdd: false,
    record: null
  });
  const columns = [
    {
      align: 'center',
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 50,
    }, {
      align: 'center',
      title: 'Topic ID',
      dataIndex: 'topic_id',
      key: 'topic_id',
      width: 80,
      render: text => <a>{text}</a>,
    },
    {
      width: 300,
      title: 'Topic Name',
      dataIndex: 'topic_name',
      key: 'topic_name',
    },
    {
      align: 'center',
      width: 200,
      title: 'InActive Date',
      dataIndex: 'inactived_date',
      key: 'inactived_date',
      render: (text) => (
        <p>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</p>
      ),

    }, {
      align: 'center',
      title: 'Status',
      dataIndex: 'status_yn',
      key: 'status_yn',
      render: (text) => (
        <p>{text == 'Y' ? 'YES' : 'NO'}</p>
      ),
    },
    {
      align: 'center',
      title: 'Action',
      key: 'action',
      render: (text, record) => (

        <Space size="middle">
          {record.wheel_id_apr === 1
            ?
            <span style={{ color: 'green', }} >
              Đã phê duyệt
            </span>
            : <>
              <Button style={{ color: 'green', borderColor: 'green', borderWidth: 0.5 }} onClick={() => approveTopic(record)} >Approve</Button>
              <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateTopic(record)} >Edit</Button>
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} onClick={() => deleteTopic(record)} >Delete</Button>
            </>}

        </Space>

      ),
    },
  ];
  // const pagination = {
  //   current: 1,
  //   pageSize: 10,
  // };

  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó
  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])

  const initPage = async () => {
    await dispatch(actionTopic.searchTopic()); // hàm gọi xuống store call api search-all topic
  }

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

  const approveTopic = async (record) => {
    const result = await dispatch(actionTopic.approveTopic(record));
    if (result) {
      initPage();
      Message.Success("NOTYFICATON", "APPROVE TOPIC SUCCESS");
      return
    }
    Message.Error("NOTYFICATON", "APPROVE TOPIC FAILED");
  }

  const callbackModal = (params) => {
    setVisible(params.visible);
    initPage();
  }

  const onSearch = async () => {
    const { topic_name, from_date_act, to_date_act } = filter;
    if (!__.isNil(topic_name) && topic_name.length > 0 && __.isNil(from_date_act) && __.isNil(to_date_act)) {
      const result = await dispatch(actionTopic.filterTopic(filter));
      return;
    } else if (!__.isNil(topic_name) && !__.isNil(from_date_act) && !__.isNil(to_date_act)) {
      const result = await dispatch(actionTopic.filterTopic(filter));
      return;
    }
    if (!__.isNil(from_date_act) && !__.isNil(to_date_act)) {
      const result = await dispatch(actionTopic.filterTopic(filter));
      return;
    }
    initPage();
  }
  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <ModalTopic visible={visible} bodyModel={bodyModel} callback={callbackModal} />
        <Card
          headStyle={{
            fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
          }}
          title="TOPIC MANAGEMENT"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={4}>
                <Input
                  placeholder='Input Topic Name'
                  style={{ width: '100%' }}
                  value={filter.topic_name}
                  onChange={(text) => setFilter({ ...filter, topic_name: text.target.value })} />
              </Col>
              <Col className="gutter-row" span={8}>
                <RangePicker

                  onChange={(dates, dateString) => {
                    if (dates) {
                      setFilter({
                        ...filter,
                        from_date_act: dateString[0],
                        to_date_act: dateString[1],
                      });
                    } else {
                      setFilter({
                        ...filter,
                        from_date_act: null,
                        to_date_act: null,
                      });
                    }
                  }}
                />
              </Col>
            </Row>
            <Row gutter={[16, 24]} style={{ marginTop: 10 }}>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewTopic}>Add</Button>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch} >Search</Button>
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
              size='small'
              // pagination={pagination}
              loading={false}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome >
  )
}

