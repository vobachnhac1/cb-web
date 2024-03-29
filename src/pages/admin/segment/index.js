/* --------------------------------------------------------
* Author Lê Quý Nam
* Email lqn1604.dev@gmail.com
* Phone 036.847.5269
* Created: 2022-04-07
*------------------------------------------------------- */
require("./styles.less");
import { useState, useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Popconfirm, Select, Input, DatePicker, Pagination } from 'antd';

const { RangePicker } = DatePicker;
import * as Message from '@/components/message';
import ModalSegment from '@/containers/modal-segment';
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic } from '@/redux/topic';

import moment from 'moment';
import __ from 'lodash';

export default function Segment(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const listSegment = useSelector(gettersSegment.getStateLoadPageSegment) || [];
  const pagination = useSelector(gettersSegment.getPagination) || [];
  const listTopic = useSelector(gettersTopic.getTopicCommon) || [];
  const [filter, setFilter] = useState({
    segment_name: null,
    topic_id: null,
    from_date_act: null,
    to_date_act: null
  });

  useEffect(() => {
    initPage();
  }, [])

  const initPage = async () => {
    setLoading(true);
    await dispatch(actionSegment.filterSegment({
      item_page: pagination?.item_page,
      current_page: pagination?.current_page,
    }));
    await dispatch(actionTopic.searchTopic());
    setLoading(false);
  }

  const onSearch = async () => {
    const { segment_name, topic_id, from_date_act, to_date_act } = filter;
    if (__.isNil(segment_name) && __.isNil(topic_id) && __.isNil(from_date_act) && __.isNil(to_date_act)) {
      initPage();
    } else {
      setLoading(true);
      const { success } = await dispatch(actionSegment.filterSegment(
        {...filter,
        item_page: pagination?.item_page,
        current_page: 1,
      }));
      if (success) setLoading(false);
    }

  }

  const handleDelete = async (record) => {
    let dataRecord = record
    const result = await dispatch(actionSegment.deleteSegmentById(dataRecord));
    if (result) {
      onSearch();
      Message.Success("Thông Báo", "Xóa thành công");
      return
    }
    Message.Error("Thông Báo", "Xóa thất bại!");
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 50,
      render: (text, record) => {
        return (pagination.current_page - 1)*pagination.item_page  + parseInt(text) + 1
      }
    },
    {
      title: 'Mã giải thưởng',
      dataIndex: 'segment_id',
      key: 'segment_id',
      fixed: 'left',
      width: 120
    },
    {
      title: 'Tên giải thưởng',
      dataIndex: 'segment_name',
      key: 'segment_name',
      fixed: 'left',
      width: 200
    },
    {
      title: 'Chủ đề',
      dataIndex: 'topic_name',
      key: 'topic_name',
      width: 200
    },
    {
      align: 'end',
      title: 'Giá trị giải thưởng(VNĐ)',
      dataIndex: 'segment_value',
      key: 'segment_value',
      width: 200,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'flex-end',
          'fontWeight': '500'
        }}>
          <span>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>

        </Space>
      )
    },
    {
      title: 'Ngày hết hiệu lực',
      dataIndex: 'inactived_date',
      key: 'inactived_date',
      width: 170,
      align: 'center',
      render: (text, record) => {
        return <span>
          {!text || text == "0000-00-00 00:00:00" ? 'Không giới hạn' : moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </span>
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 170,
      align: 'center',
      render: (text, record) => {
        return <span>
          {moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </span>
      }
    },

    {
      title: 'Action',
      key: 'action',
      width: 170,
      render: (text, record) => (
        record.number_segment_used === 1 ?
          <span style={{ color: 'green', }} >
            Có vòng quay đang sử dụng giải thưởng này !
          </span>
          :
          <Space size="middle">
            <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateSegment(record)} >Cập nhật</Button>
            {listSegment.length >= 1 ? (
              <Popconfirm title="Bạn có muốn?" onConfirm={() => handleDelete(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
                <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
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
    onSearch()
  }

  const onChangePagination = async (value)=>{
    await dispatch(actionSegment.filterSegment(
      {
        ...filter,
        item_page: 20,
        current_page: value
      }
    )); 
  }   
  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <ModalSegment visible={visible} bodyModel={bodyModel} callback={callbackModal} />
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="Tất cả kết quả giải thưởng"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={4}>
                <Select
                  allowClear
                  placeholder="Chủ đề"
                  style={{ width: '100%' }}
                  defaultValue={null}
                  value={filter.topic_id}
                  onChange={(value) => setFilter({ ...filter, topic_id: value })}>
                  {listTopic.map((Item, key) => (
                    <Select.Option value={Item.topic_id} key={key}>{Item.topic_name}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col className="gutter-row" span={4}>
                <Input placeholder="Tên giải thưởng cần tìm" allowClear value={filter.segment_name} onChange={(event) => setFilter({ ...filter, segment_name: event.target.value ? event.target.value : null })} />
              </Col>
              <Col className="gutter-row" span={5}>
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
            <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewSegment}>Thêm</Button>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch}>Tìm kiếm</Button>
              </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              className="table_layout"
              columns={columns}
              dataSource={listSegment}
              size='small'
              loading={loading}
              pagination={false}
              scroll={{ x: 1300, y: '45vh' }}
            />
             <Pagination 
              style={{marginTop: 10}} 
              pageSize={pagination?.item_page || 20}
              defaultCurrent={pagination?.current_page} 
              total={pagination?.total_item} 
              current={pagination?.current_page} 
              showSizeChanger={false}
              onChange={onChangePagination}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome>
  )
}

