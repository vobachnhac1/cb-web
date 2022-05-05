/* --------------------------------------------------------
* Author Lê Quý Nam
* Email lqn1604.dev@gmail.com
* Phone 036.847.5269
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import { useState, useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Popconfirm, Input, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import * as Message from '@/components/message';
import ModalWheel from '@/containers/modal-wheel'

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionWheel } from '@/redux/wheel';
import { getters as gettersWheel } from '@/redux/wheel';

import moment from 'moment';
import __ from 'lodash';
import Link from 'next/link';

export default function Wheel(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const listWheel = useSelector(gettersWheel.getStateLoadPageWheel) || [];
  const [filter, setFilter] = useState({
    wheel_name: null,
    from_date_act: null,
    to_date_act: null
  });

  useEffect(() => {
    initPage();
  }, [])


  const initPage = async () => {
    setLoading(true);
    await dispatch(actionWheel.searchWheel());
    setLoading(false);
  }
  const onSearch = async () => {
    const { wheel_name, from_date_act, to_date_act } = filter;
    if (__.isNil(wheel_name) && __.isNil(from_date_act) && __.isNil(to_date_act)) {
      initPage();
    } else {
      setLoading(true);
      await dispatch(actionWheel.filterWheel(filter));
      setLoading(false)
      return;
    }
  }
  const handleDelete = async (record) => {
    const result = await dispatch(actionWheel.deleteWheelById(record));
    if (result) {
      initPage();
      Message.Success("NOTYFICATON", "DELETE WHEEL SUCCESS");
      return
    }
    Message.Error("NOTYFICATON", "DELETE WHEEL FAIL");
  };
  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 50,
      render: (text, record) => {
        return parseInt(text) + 1
      }
    },
    {
      title: 'ID',
      dataIndex: 'wheel_id',
      key: 'wheel_id',
      fixed: 'left',
      width: 50
    },
    {
      title: 'Tên vòng quay',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      fixed: 'left',
      width: 300
    },
    {
      title: 'Số kết quả',
      dataIndex: 'num_segments',
      key: 'num_segments',
      fixed: 'center',
      width: 100,
    },
    {
      align: 'center',
      title: 'Tổng giá trị giải',
      dataIndex: 'total_value',
      key: 'total_value',
      width: 180,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'flex-end',
          'fontWeight': '500'
        }}>
          <span>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span >
            VND
          </span>
        </Space>
      )

    },
    {
      align: 'center',
      title: 'Giá trị còn lại',
      dataIndex: 'remain_value',
      key: 'remain_value',
      width: 180,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'flex-end',
          'fontWeight': '500'
        }}>
          <span >
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span >
            VND
          </span>
        </Space>
      )
    },
    {
      align: 'center',
      title: 'Tài khoản khách hàng',
      dataIndex: 'account_nbr',
      key: 'account_nbr',
      width: 220,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'flex-end',
        }}>
          <span>
            {text}
          </span>
        </Space>
      )

    },
    {
      title: 'Kích thước chữ',
      dataIndex: 'text_fontsize',
      key: 'text_fontsize',
      width: 120,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'flex-end',
        }}>
          <span>
            {text}
          </span>
        </Space>
      )
    },
    {
      title: 'Ngày hết hiệu lực',
      dataIndex: 'inactived_date',
      key: 'inactived_date',
      width: 170,
      render: (text, record) => {
        return <span>
          {moment(text).format('YYYY-MM-DD, hh:mm:ss')}
        </span>
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 170,
      render: (text, record) => {
        return <span>
          {moment(text).format('YYYY-MM-DD, hh:mm:ss')}
        </span>
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 320,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ color: '#7cb305', borderColor: '#7cb305', borderWidth: 0.5 }}>
            <Link href={`/admin/wheel-detail/${record.wheel_id}`}>
              Chi tiết vòng quay
            </Link>
          </Button>
          {
            record.wheel_status === "APR" ?
              <span style={{ color: 'green', }} >
                Vòng quay đã duyệt !
              </span>
              : <>
                <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateWheel(record)} >Cập nhật</Button>
                {listWheel.length >= 1 ? (
                  <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)} >
                    <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
                  </Popconfirm>
                ) : null
                }
              </>
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
  const addNewWheel = () => {
    setVisible(true);
    setBodyModel({
      record: null,
      isAdd: true
    });
  }

  const updateWheel = (record) => {
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

  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <ModalWheel visible={visible} bodyModel={bodyModel} callback={callbackModal} />

        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="Vòng Quay"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
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
              <Col className="gutter-row" span={8}>
                <Input allowClear placeholder="Tên vòng quay cần tìm" value={filter.wheel_name} onChange={(event) => setFilter({ ...filter, wheel_name: event.target.value })} />
              </Col>

            </Row>
            <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNewWheel}>Thêm</Button>
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
              dataSource={listWheel}
              size='large'
              loading={loading}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome >
  )
}

