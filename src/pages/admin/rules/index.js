/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-22
*------------------------------------------------------- */
require("./style.module.less");
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import { useState, useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Typography, Popconfirm, Input, Tag, DatePicker } from 'antd';
import * as Message from '@/components/message';
import ModalRules from '@/containers/modal-rules'
const { Text } = Typography;
const { RangePicker } = DatePicker;

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

import moment from 'moment';
import __ from 'lodash';
import Link from 'next/link';

export default function Rules(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const listRules = useSelector(gettersRules.getStateLoadPageRules) || [];
  const [filter, setFilter] = useState({
    rules_id: null,
    rules_name: null,
    from_date: null,
    to_date: null,
    status_rules: null,
  });

  useEffect(() => {
    initPage();
  }, [])

  const initPage = async () => {
    setLoading(true);
    await dispatch(actionsRules.filterRules(filter));
    setLoading(false);
  }
  const onSearch = async () => {
    initPage()
  }
  const columns = [
    {
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 30,
      render: (text, record) => {
        return (
          <>
            <Text> {parseInt(text)}</Text>
          </>
        )
      }
    },
    {
      title: 'Tên quy tắc',
      dataIndex: 'rules_name',
      key: 'rules_name',
      width: 100,
    }, {
      title: 'Tổng số giải trúng',
      dataIndex: 'total_reward',
      key: 'total_reward',
      width: 100,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'space-between',
          fontWeight: '500'
        }}>
          <Text>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </Space>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status_rules_name',
      key: 'status_rules_name',
      width: 50,
      render: (text, record) => {
        return (
          // <>
          //   <Text type={record.status_rules == 'Y' ? 'success' : "danger"} >{text}</Text>
          // </>
          <Tag color={record.status_rules == 'Y' ? 'green' : "red"} key={text}>
            {text}
          </Tag>
        )
      }
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'from_date',
      key: 'from_date',
      width: 100,
      render: (text, record) => {
        return <Text>
          {moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </Text>
      }
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'to_date',
      key: 'to_date',
      width: 100,
      render: (text, record) => {
        return <Text>
          {moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </Text>
      }
    },
    {
      align: 'center',
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => {
        const color = record.status_rules == 'N' ? 'green' : 'red';
        const tagName = record.status_rules == 'N' ? 'Approve' : 'Reject';
        return (
          <Space size="middle">
            <Button style={{ color: color, borderColor: color, borderWidth: 0.5 }} onClick={() => approveRules(record)} >{tagName}</Button>
            <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateRules(record)} >Edit</Button>
            <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} onClick={() => deleteRules(record)} >Delete</Button>
          </Space>
        );
      }

    },
  ];


  const [visible, setVisible] = useState(false);

  const [bodyModel, setBodyModel] = useState({
    isAdd: false,
    record: null
  });

  const addRules = () => {
    setVisible(true);
    setBodyModel({
      record: null,
      isAdd: true
    });
  }

  const updateRules = (record) => {
    setVisible(true);
    setBodyModel({
      record: record,
      isAdd: false
    });
  }

  const deleteRules = async (record) => {
    await dispatch(actionsRules.deleteRules({
      rules_id: record.rules_id,
      is_delete: 'Y'
    }))
  }
  const approveRules = async (record) => {
    await dispatch(actionsRules.approveRules({
      rules_id: record.rules_id,
      status_rules: !record.status_rules || record.status_rules && record.status_rules == 'N' ? 'N' : 'Y',
    }))
  }

  const callbackModal = (params) => {
    setVisible(params.visible);
    setBodyModel({
      record: null,
      isAdd: false
    });
  }
  const onDoubleClick = (record, rowIndex) => {
    setVisible(true);
    setBodyModel({
      record: record,
      isAdd: false
    });
  }

  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <ModalRules visible={visible} bodyModel={bodyModel} callback={callbackModal} />

        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="PHÂN BỐ TỈ LỆ TRÚNG THƯỞNG"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={4}>
                <Input
                  placeholder='Input Rules Name'
                  style={{ width: '100%' }}
                  value={filter.rules_name}
                  onChange={(text) => setFilter({ ...filter, rules_name: text.target.value })} />
              </Col>
              <Col className="gutter-row" span={8}>
                <RangePicker

                  onChange={(dates, dateString) => {
                    if (dates) {
                      setFilter({
                        ...filter,
                        from_date: dateString[0],
                        to_date: dateString[1],
                      });
                    } else {
                      setFilter({
                        ...filter,
                        from_date: null,
                        to_date: null,
                      });
                    }
                  }}
                />
              </Col>
            </Row>
            <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addRules}>Thêm</Button>
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
              dataSource={listRules}
              size='small'
              loading={loading}
              scroll={{ x: 1300 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => { }, // click row
                  onDoubleClick: event => {
                    onDoubleClick(record, rowIndex)
                  }, // double click row { }
                  onContextMenu: event => { }, // right button click row
                  onMouseEnter: event => { }, // mouse enter row
                  onMouseLeave: event => { }, // mouse leave row
                };
              }}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome >
  )
}

