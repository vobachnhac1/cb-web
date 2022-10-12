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

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import Text from 'antd/lib/typography/Text';
import { actions, getters } from '@/redux/system';

export default function AccountManagement(props) {
  const dispatch = useDispatch();
  const accountList = useSelector(getters.getAccountList);
  useEffect(()=>{
    initPage();
  },[]);
  const columns = [
    {
      align: 'center',
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 50,
    }, {
      align: 'center',
      title: 'Tài khoản',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },  {
      align: 'center',
      title: 'Tên đầy đủ',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 100,
    }, {
      width: 100,
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },  {
      align: 'center',
      width: 120,
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),
    },{
      width: 100,
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
    }, {
      align: 'center',
      width: 120,
      title: 'Ngày cập nhật',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),

    }, {
      width: 100,
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    }

  ];

  const initPage = async ()=>{
    const res = await dispatch(actions.setAccountList());
  }
  const onSearch =()=>{initPage()}

  const insertURL =()=>{}
  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <Card
        headStyle={{
          fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
        }}
        title="Quản lí thông tin tài khoản"
        bordered={true}
        style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]} style={{ marginTop: 10 }}>                
                <Col className="gutter-row" span={3}>
                  <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch} >Tìm kiếm</Button>
                </Col>
                <Col className="gutter-row" span={3}>
                  <Button type='primary' size='middle' style={{ width: '100%' }} onClick={insertURL}>Thêm</Button>
                </Col>
            </Row>
          </Col>
        </Card>

        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              columns={columns}
              dataSource={accountList}
              size='small'
              scroll={{ x: 1300, y: '45vh' }}
              loading={false}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome >
  )
}

