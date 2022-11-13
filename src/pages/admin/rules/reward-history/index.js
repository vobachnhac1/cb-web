/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-29
*------------------------------------------------------- */
require("./styles.less");
import * as classnames from 'classnames';
import { useState, useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Typography, Tag, Select, Input, DatePicker, Pagination } from 'antd';
import * as Message from '@/components/message';

const { Text } = Typography;
const { RangePicker } = DatePicker;


// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

import moment from 'moment';
import __, { set } from 'lodash';
import Link from 'next/link';
import { STATE_REWARD, TYPE_REWARD } from '@/constants/common';


export default function RewardHistory(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const listRewardHis = useSelector(gettersRules.getListRewardHis) || [];
  const listWheelStart = useSelector(gettersRules.getListWheelStart) || [];
  const pagination = useSelector(gettersRules.getPagination) || [];

  const [filter, setFilter] = useState({
    systemCode: null,
    wheel_id: null,
    wheel_name: null,
    type_reward: null,
    state_reward: null,
    from_date: null,
    to_date: null,
  });

  useEffect(() => {
    initPage();
  }, [])

  const initPage = async () => {
    // lấy danh sách History
    setLoading(true);
    await dispatch(actionsRules.getWheelScreenRulesSTART());
    setLoading(false);
  };

  const formatTypeSegment = (value)=>{
    if(value < 0){
      return {
        text:TYPE_REWARD[1],
        color: 'green'
      }
    }else if(value == 0){
      return {
        text:TYPE_REWARD[2],
        color: 'blue'
      }
    }else{
      return {
        text:TYPE_REWARD[3],
        color: 'red'
      }
    }
  }

  const formatStateReward = (value)=>{
    if(TYPE_REWARD[0] == filter.type_reward){
      return  null
    }else if(TYPE_REWARD[1] == filter.type_reward){
      return'<'
    }else if(TYPE_REWARD[2] == filter.type_reward){
      return '='
    }else if(TYPE_REWARD[3] == filter.type_reward){
      return '>'
    }
  }
  const columns = [
    {
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 30,
      align: 'center',
      fixed: 'left',
      render: (text, record) => {
        return (
          <>
            <Text style={{ flexDirection: "row", justifyContent: "center" }}> {parseInt(text)}</Text>
          </>
        )
      }
    }, {
      title: 'Mã trúng giải thưởng',
      dataIndex: 'reward_id',
      key: 'reward_id',
      align: 'center',
      fixed: 'left',
      width: 150,
      render: (text, record) => {
        return (
          <>
            <Text style={{ flexDirection: "row", justifyContent: "center" }}> {text?.toLowerCase()}</Text>
          </>
        )
      }
    }, {
      title: 'Tài khoản trúng thưởng',
      dataIndex: 'user_id',
      key: 'user_id',
      fixed: 'left',
      width: 100,
    }, {
      title: 'Tên Khách Hàng',
      dataIndex: 'user_name',
      key: 'user_name',
      width: 150,
    }, {
      title: 'Vòng quay',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      width: 150,
    }, {
      title: 'Nội dung trúng thưởng',
      dataIndex: 'segment_name',
      key: 'segment_name',
      width: 150,
    }, {
      title: 'Thuộc tính giải thưởng',
      dataIndex: 'segment_value',
      key: 'segment_value',
      width: 150,
      render: (text, record) => {
        return <Tag color={formatTypeSegment(text)?.color}>
          {formatTypeSegment(text)?.text}
        </Tag>
      }
    }, {
      title: 'Trạng thái nhận thưởng',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (text, record) => {
        let color = 'blue';
        if (record.status == 'FINISHED') {
          color = 'green';
        } else if (record.status == 'IN-PROCCESS') {
          color = 'yellow';
        }
        return <Tag color={color}>
          {text}
        </Tag>
      }
    }, {
      title: 'Ngày trúng thưởng',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 100,
      render: (text, record) => {
        return <Text>
          {text && moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </Text>
      }
    }, {
      title: 'Ngày nhận thưởng',
      dataIndex: 'received_reward_date',
      key: 'received_reward_date',
      width: 100,
      render: (text, record) => {
        return <Text>
          {text && moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </Text>
      }
    }, {
      title: 'Action',
      key: 'action',
      width: 200,
      // fixed: 'right',
      align: 'center',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button style={{ width: 200, color: 'green', borderColor: 'green', borderWidth: 0.5 }}
              onClick={() => onComfirm(record)} >Xác nhận trao giải</Button>
          </Space>
        )
      },
    }
  ];

  const onSearch = async () => {
    await dispatch(actionsRules.getRewardHistory({
      ...filter,
      type_reward : formatStateReward(filter.state_reward),
      item_page: 10,
      current_page: pagination.current_page
    })); 
    // Message.Info('Thông Báo', 'Tính năng đang được phát triển')
  }
  const onComfirm = async (record) => {
    const result = await dispatch(actionsRules.comfirmReceived({ reward_id: record.reward_id }));
    if (result) {
      Message.Success('Thông Báo', 'Đã xác nhận trao thưởng thành công')
      initPage();
    } else {
      Message.Error('Thông Báo', 'Đã xác nhận trao thưởng thất bại')
    }
  }

  const onSearchCommon = ()=>{
    Message.Info('Thông Báo', 'Tính năng đang phát triển')
  }
  const onChangePagination = async (value)=>{
    await dispatch(actionsRules.getRewardHistory(
      {
        ...filter,
        type_reward : formatStateReward(filter.state_reward),
        item_page: 10,
        current_page: value
      }
    )); 
  }   

  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        {/* <ModalRules visible={visible} bodyModel={bodyModel} callback={callbackModal} /> */}
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="Màn hình quản lý thông tin trúng thưởng"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={5}>
                 <Select
                  placeholder="Hệ thống Phòng/Ban"
                  style={{ width: '100%' }}
                  defaultValue={null}
                  value={filter.systemCode}
                  onChange={(text) =>  setFilter({
                    ...filter,
                    systemCode: text,
                  })}
                  // onChange={onChangeSelectWheel}
                >
                  {/* {listWheel?.map((item, key) => (
                    <Select.Option value={item.wheel_id} key={key}>{`[${item.wheel_status}]`} - {item.wheel_name}</Select.Option>
                  ))} */}
                </Select>
              </Col> 
              <Col className="gutter-row" span={5}>
                 <Select
                  placeholder="Tên vòng quay"
                  style={{ width: '100%' }}
                  defaultValue={null}
                  value={filter.wheel_id}
                  // onChange={onChangeSelectWheel}
                  onChange={(text) =>  setFilter({
                    ...filter,
                    wheel_id: text,
                  })}
                >
                  {listWheelStart?.map((item, key) => (
                    <Select.Option value={item.wheel_id} key={key}>{`[${item.wheel_status}]`} - {item.wheel_name}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col className="gutter-row" span={5}>
                 <Select
                  allowClear
                  placeholder="Trạng thái"
                  style={{ width: '100%' }}
                  defaultValue={null}
                  value={filter.state_reward}
                  // onChange={onChangeSelectWheel}
                  onChange={(text) =>  setFilter({
                    ...filter,
                    state_reward: text,
                  })}
                >
                  {STATE_REWARD?.map((item, key) => (
                    <Select.Option value={item.id} key={key}>{item.value}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col className="gutter-row" span={5}>
                 <Select
                  allowClear
                  placeholder="Thuộc tính giải thưởng"
                  style={{ width: '100%' }}
                  defaultValue={null}
                  value={filter.type_reward}
                  // onChange={onChangeSelectWheel}
                  onChange={(text) =>  setFilter({
                    ...filter,
                    type_reward: text,
                  })}
                >
                  {TYPE_REWARD?.map((item, key) => (
                    <Select.Option value={item} key={key}>{item}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row gutter={[16, 24]} style={{marginTop:10}}>
              <Col className="gutter-row" span={5}>
                <Input 
                  style={{ width: '100%' }} 
                  placeholder={'Mã khách hàng / Tài khoản trúng thưởng'}
                value={filter.wheel_name} 
                onChange={(text) =>  setFilter({
                  ...filter,
                  wheel_name: text.target.value,
                })}
                />
              </Col> 
              <Col className="gutter-row" span={5}>
                <RangePicker
                  style={{width:'100%'}}
                  placeholder={['Bắt đầu','Kết thúc']}
                  // disabledDate={d => !d || d.isSameOrBefore(moment().set('date', (moment().date() )))}
                  value={filter.from_date&&[moment(filter.from_date, 'YYYY/MM/DD'), moment(filter.to_date, 'YYYY/MM/DD')]}
                  onChange={(dates, dateString) => {
                    if (dates) {
                      setFilter({
                        ...filter,
                        from_date:dateString[0],
                        to_date:dateString[1],
                      })                      
                    } else {
                      setFilter({
                        ...filter,
                        from_date: null,
                        to_date :null
                      })
                    }
                  }}
                />
                </Col> 
            </Row>
             <Row gutter={[16, 24]} style={{marginTop:10}}>
              <Col className="gutter-row" span={5}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch}>Tìm kiếm</Button>
              </Col>
              <Col className="gutter-row" span={5}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearchCommon}>Xuất Excel</Button>
              </Col>
              <Col className="gutter-row" span={5}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearchCommon}>Update  file đối soát</Button>
              </Col>
              <Col className="gutter-row" span={5}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearchCommon}>File đối soát mẫu</Button>
              </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Table
            className={"table_layout"}
            columns={columns}
            dataSource={listRewardHis}
            size='small'
            loading={loading}
            scroll={{ x: 1300, y: '48vh' }}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => { }, // click row
                onDoubleClick: event => { },
                onContextMenu: event => { }, // right button click row
                onMouseEnter: event => { }, // mouse enter row
                onMouseLeave: event => { }, // mouse leave row
              };
            }}
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
        </Card>
      </Col >
    </LayoutHome >
  )
}

