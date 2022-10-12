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

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import Text from 'antd/lib/typography/Text';
import { actions, getters } from '@/redux/system';

export default function PathsManagement(props) {
  const [perSystem, setPerSystem]= useState('FE');

  const pathsFEList = useSelector(getters.getPathsFEList);
  const pathsBEList = useSelector(getters.getPathsBEList);
  const dispatch = useDispatch();
  useEffect(()=>{
    initPage();
  },[]);

  const initPage = async ()=>{
    const params = {
      roleId : 1,
      systemCode : "LAB",
      perSystem : perSystem,
    }
    const res = await dispatch(actions.setPathsList(params))
  }

  const insertURL =()=>{

  }  
  const onSearch = async()=>{
    const params = {
      roleId : 1,
      systemCode : "LAB",
      perSystem : perSystem,
    }
      await dispatch(actions.setPathsList(params))
  }  
  const onChangeSelectPer =(value)=>{
    setPerSystem(value)
  }

  const columns = [
    {
      align: 'center',
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 50,
    }, {
      align: 'center',
      title: 'Chức vụ',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 100,
    }, {
      width: 150,
      title: 'Nội dung URL',
      dataIndex: 'url',
      key: 'url',
    }, {
      width: 180
      ,
      title: 'Hệ thống',
      dataIndex: 'systemName',
      key: 'systemName',
    }, {
      width: 100,
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
    // {
    //   align: 'center',
    //   title: 'Action',
    //   key: 'action',
    //   width: 200,
    //   render: (text, record) => (
    //     <Space size="middle">
    //       {record.wheel_id_apr === 1
    //         ?
    //         <span style={{ color: 'green', }} >
    //           Có vòng quay đã duyệt và đang sử dụng chủ đề này !
    //         </span>
    //         : <>
    //           {/* <Button style={{ color: record.status_yn == 'N' ? 'green' : 'red', borderColor: record.status_yn == 'N' ? 'green' : 'red', borderWidth: 0.5 }}
    //             onClick={() => approveTopic(record)} >{
    //               record.status_yn == 'N' ? "Phê duyệt" : "Từ chối"
    //             }</Button> */}
    //           {/* {
    //             record.status_yn == 'N' && <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateTopic(record)} >Cập nhật</Button>
    //           } */}
    //           <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateTopic(record)} >Cập nhật</Button>
    //           <Popconfirm title="Bạn có muốn?" onConfirm={() => deleteTopic(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
    //             <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
    //           </Popconfirm>
    //         </>}
    //     </Space>

    //   ),
    // },
  ];

  return (
    <LayoutHome>
        <Col style={{ marginBottom: 30 }}>
          <Card
          headStyle={{
            fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
          }}
          title="Quản lý Phân quyền URL theo chức vụ"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
            <Col span={48} >
              <Row gutter={[16, 24]} style={{ marginTop: 10 }}>
              <Col className="gutter-row" span={8}>
                <Select
                  placeholder="Quyền hệ thống"
                  style={{ width: '100%' }}
                  defaultValue={'FE'}
                  value={perSystem}
                  onChange={onChangeSelectPer}
                >
                  <Select.Option value={'BE'} key={'BE'}> {'Quyền Server'}</Select.Option>
                  <Select.Option value={'FE'} key={'FE'}> {'Quyền Client'}</Select.Option>
                </Select>
              </Col>
               
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
                dataSource={perSystem =='FE'? pathsFEList: pathsBEList}
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

