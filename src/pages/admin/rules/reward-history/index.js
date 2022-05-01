/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-29
*------------------------------------------------------- */
require("./style.module.less");
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import { useState, useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Typography, Tag } from 'antd';
import * as Message from '@/components/message';

const { Text } = Typography;


// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

import moment from 'moment';
import __ from 'lodash';
import Link from 'next/link';


export default function RewardHistory(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const listRewardHis = useSelector(gettersRules.getListRewardHis) || [];
  const [filter, setFilter] = useState({
    wheel_id: null,
    wheel_name: null,
    from_date: null,
    to_date: null,
  });

  useEffect(() => {
    initPage();
  }, [])

  const initPage = async () => {
    // lấy danh sách History
    setLoading(true);
    await dispatch(actionsRules.getRewardHistory());
    setLoading(false);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 30,
      align: 'center',
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
      width: 300,
      render: (text, record) => {
        return (
          <>
            <Text style={{ flexDirection: "row", justifyContent: "center" }}> {text}</Text>
          </>
        )
      }
    }, {
      title: 'Tài khoản trúng thưởng',
      dataIndex: 'user_id',
      key: 'user_id',
      width: 100,
    }, {
      title: 'Vòng quay',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      width: 100,
    }, {
      title: 'Nội dung trúng thưởng',
      dataIndex: 'segment_name',
      key: 'segment_name',
      width: 100,
    }, {
      title: 'Trạng thái nhận thưởng',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (text, record) => {
        let color = 'blue';
        if (record.status == 'FINISH') {
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
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button style={{ width: 200, color: 'green', borderColor: 'green', borderWidth: 0.5 }}
              onClick={() => onComfirm(record)} >Admin Comfirm</Button>
          </Space>
        )
      },
    }
  ];

  const onSearch = () => {
    initPage();
    Message.Info('Thông Báo', 'Tính năng đang được phát triển')
  }
  const onComfirm = () => {
    Message.Info('Thông Báo', 'Tính năng đang được phát triển')
  }

  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        {/* <ModalRules visible={visible} bodyModel={bodyModel} callback={callbackModal} /> */}
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="MÀN HÌNH QUẢN LÝ THÔNG TIN TRÚNG THƯỞNG"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={5}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch}>Search</Button>
              </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Table
            className={styles["table_layout"]}
            columns={columns}
            dataSource={listRewardHis}
            size='small'
            loading={loading}
            scroll={{ x: 1500 }}
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
          {/* </Form> */}
        </Card>
      </Col >
    </LayoutHome >
  )
}

