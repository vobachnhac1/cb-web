/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./styles.less");
import { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Table, DatePicker, Typography, Popconfirm } from 'antd';
import moment from 'moment';
import __ from 'lodash';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import * as Message from '@/components/message';

const { RangePicker } = DatePicker;
const { Text } = Typography;
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
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
      title: 'Mã',
      dataIndex: 'topic_id',
      key: 'topic_id',
      width: 80,
    },
    {
      width: 200,
      title: 'Tên chủ đề',
      dataIndex: 'topic_name',
      key: 'topic_name',
    },
    {
      align: 'center',
      width: 100,
      title: 'Ngày khởi tạo',
      dataIndex: 'inactived_date',
      key: 'inactived_date',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),

    },
    {
      align: 'center',
      title: 'Action',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          {record.wheel_id_apr === 1
            ?
            <span style={{ color: 'green', }} >
              Có vòng quay đã duyệt và đang sử dụng chủ đề này !
            </span>
            : <>
              <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateTopic(record)} >Cập nhật</Button>
              <Popconfirm title="Bạn có muốn?" onConfirm={() => deleteTopic(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
                <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
              </Popconfirm>
            </>}
        </Space>

      ),
    },
  ];

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
      Message.Success("Thông Báo", "Xóa thành công");
      return
    }
    Message.Error("Thông Báo", "Xóa không thành công");
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
          title="Quản lý chương trình Digital Loyalty"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={4}>
                <Input
                  placeholder='Nhập tên chủ đề'
                  style={{ width: '100%' }}
                  value={filter.topic_name}
                  onChange={(text) => setFilter({ ...filter, topic_name: text.target.value })} />
              </Col>

              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch} >Tìm kiếm</Button>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewTopic}>Thêm</Button>
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
              scroll={{ x: 1300, y: '45vh' }}

              // pagination={pagination}
              loading={false}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome >
  )
}

