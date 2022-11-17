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
import { actions as actionsManagerCbCoin } from '@/redux/manager-cb-coin';
import { getters as gettersManagerCbCoin } from '@/redux/manager-cb-coin';

export default function HistoryUser(props) {
  const dispatch = useDispatch();
  const listManagerCbCoinUserHistory = useSelector(gettersManagerCbCoin.getStateLoadPageManagerCbCoinUserHistory) || [];
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({
    topic_name: null,
    from_date_act: null,
    to_date_act: null
  });

  const columns = [
    {
      align: 'center',
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 50,
    },
    {
      align: 'center',
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {

      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 250,
    },
    {
      width: 150,
      title: 'Mã khách hàng',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      width: 120,
      title: 'Cmnn/cccd',
      dataIndex: 'nationalId',
      key: 'nationalId',
    },
    {
      width: 200,
      title: 'Tổng điểm',
      dataIndex: 'totalPoint',
      key: 'totalPoint',
    },
    {
      width: 150,
      title: 'Số lượt hiện tại',
      dataIndex: 'numTimes',
      key: 'numTimes',
    },
    {
      align: 'center',
      width: 120,
      title: 'Trạng thái',
      dataIndex: 'inActive',
      key: 'inActive',
      render: (text) => (
        <Text>{text === 'ACT' ? 'Hoạt động' : 'Dừng hoạt động'}</Text>
      ),
    },
    {
      align: 'center',
      width: 200,
      title: 'Ngày khởi tạo',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),
    }
  ];

  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó
  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])

  const initPage = async () => {
    await dispatch(actionsManagerCbCoin.searchManagerCbCoinUserHistory());
  }

  const onSearch = async () => {
    // const { topic_name, from_date_act, to_date_act } = filter;
    // if (!__.isNil(topic_name) && topic_name.length > 0 && __.isNil(from_date_act) && __.isNil(to_date_act)) {
    //   const result = await dispatch(actionTopic.filterTopic(filter));
    //   return;
    // } else if (!__.isNil(topic_name) && !__.isNil(from_date_act) && !__.isNil(to_date_act)) {
    //   const result = await dispatch(actionTopic.filterTopic(filter));
    //   return;
    // }
    // if (!__.isNil(from_date_act) && !__.isNil(to_date_act)) {
    //   const result = await dispatch(actionTopic.filterTopic(filter));
    //   return;
    // }
    initPage();
  }
  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>

        <Card
          headStyle={{
            fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
          }}
          title="Quản lý danh sách khách hàng trên hệ thống"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={4}>
                <Input
                  placeholder='Nhập tên tên khách hàng '
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
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch} >Tìm kiếm</Button>
              </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              columns={columns}
              dataSource={listManagerCbCoinUserHistory}
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

