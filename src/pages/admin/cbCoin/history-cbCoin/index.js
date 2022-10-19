/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./styles.less");
import { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Table, DatePicker, Typography, Popconfirm, Select } from 'antd';
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

export default function HisotryCbCoin(props) {
  const dispatch = useDispatch();
  const listManagerCbCoin = useSelector(gettersManagerCbCoin.getStateLoadPageManagerCbCoin) || [];
  const listManagerCbCoinUserHistory = useSelector(gettersManagerCbCoin.getStateLoadPageManagerCbCoinHistory) || [];
  const [filter, setFilter] = useState({
    criteria_code: null,
    from_date_act: null,
    to_date_act: null
  });

  const columns = [
    {

      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 50,
      fixed: 'left',
    },
    {

      title: 'Mã hệ thống',
      dataIndex: 'criteria_code',
      key: 'criteria_code',
      width: 80,
      fixed: 'left',
    },
    {

      title: 'Tên hệ thống',
      dataIndex: 'criteria_name',
      key: 'criteria_name',
      width: 270,
      fixed: 'left',
    },
    {
      align: 'center',
      width: 80,
      title: 'Mã hành vi',
      dataIndex: 'behaviorCode',
      key: 'behaviorCode',
    },
    {
      width: 170,
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      width: 100,
      title: 'Số điểm',
      dataIndex: 'point',
      key: 'point',
    },
    {
      align: 'center',
      width: 120,
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Text>{text === 'Y' ? 'Hoạt động' : 'Dừng hoạt động'}</Text>
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
    await dispatch(actionsManagerCbCoin.searchManagerCbCoin());
  }

  const onSearch = async () => {
    await dispatch(actionsManagerCbCoin.searchManagerCbCoinHistory(filter))

  }
  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>

        <Card
          headStyle={{
            fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
          }}
          title="Lịch sử tích điểm trên hệ thống"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={5}>
                <Select
                  // allowClear
                  placeholder="Chọn hệ thống"
                  style={{ width: '100%' }}
                  defaultValue={null}
                  value={filter.criteria_code}
                  onChange={(value) => setFilter({ ...filter, criteria_code: value })}>
                  {listManagerCbCoin.map((Item, key) => (
                    <Select.Option value={Item.criteria_code} key={key}>{Item.criteria_name}</Select.Option>
                  ))}
                </Select>
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

