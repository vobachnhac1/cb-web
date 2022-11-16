/* --------------------------------------------------------
* Author Lê Quý Nam
* Email lqn1604.dev@gmail.com
* Phone 036.847.5269
* Created: 2022-04-07
*
* 03-11-2022: Nhac Vo -[E]- chuyển từ thời gian kết thúc  sang thời gian áp dụng: fromDate -> toDate
* 
*
*
*
*
*
*------------------------------------------------------- */



require("./styles.less");
import * as classnames from 'classnames';
import { useState, useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Popconfirm, Input, DatePicker, Pagination } from 'antd';
const { RangePicker } = DatePicker;
import * as Message from '@/components/message';
import ModalWheel from '@/containers/modal-wheel'
import router from 'next/router';

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
  const pagination = useSelector(gettersWheel.getPagination) || [];

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
    // thêm điều kiện wheel/select-all-wheel/current_page/item_page/wheel_status/from_date_act/to_date_act/wheel_name/wheel_status_arr
    await dispatch(actionWheel.searchWheel(
      {
        ...filter,
        item_page: 20,
        current_page: 1
      }
    ));
    setLoading(false);
  }
  const onSearch = async () => {
    const { wheel_name, from_date_act, to_date_act } = filter;
    if (__.isNil(wheel_name) && __.isNil(from_date_act) && __.isNil(to_date_act)) {
      initPage();
    } else {
      setLoading(true);
      // await dispatch(actionWheel.filterWheel(filter));
      await dispatch(actionWheel.searchWheel(
        {
          ...filter,
          item_page: 20,
          current_page: 1
        }
      ));
      setLoading(false)
      return;
    }
  }
  const handleDelete = async (record) => {
    const result = await dispatch(actionWheel.deleteWheelById(record));
    if (result) {
      initPage();
      Message.Success("Thông Báo", "Xóa Vòng Quay Thành Công");
      return
    }
    Message.Error("Thông Báo", "DELETE WHEEL FAIL");
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 50,
      render: (text, record) => {
        return (pagination.current_page - 1) * pagination.item_page + parseInt(text) + 1
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
      width: 200
    },
    {
      title: 'Số kết quả',
      dataIndex: 'num_segments',
      key: 'num_segments',
      fixed: 'center',
      width: 75,
    },
    {
      align: 'end',
      title: 'Tổng giá trị giải(VNĐ)',
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
        </Space>
      )

    },
    {
      align: 'end',
      title: 'Giá trị còn lại(VNĐ)',
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
      align: 'center',
      title: 'Ngày áp dụng',
      dataIndex: 'from_date_act',
      key: 'from_date_act',
      width: 170,
      render: (text, record) => {
        return <span>
          {text && moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </span>
      }
    }, {
      align: 'center',
      title: 'Ngày kết thúc',
      dataIndex: 'to_date_act',
      key: 'to_date_act',
      width: 170,
      render: (text, record) => {
        return <span>
          {text && moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </span>
      }
    },
    {
      align: 'center',
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 170,
      render: (text, record) => {
        return <span>
          {text && moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </span>
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 450,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ color: '#7cb305', borderColor: '#7cb305', borderWidth: 0.5 }}>
            <Link href={`/admin/wheel-detail/${record.wheel_id}`}>
              Chi tiết vòng quay
            </Link>
          </Button>
          {
            record.wheel_status === "APR" || record.wheel_status === "SAVE" ?
              <span style={{ color: record.wheel_status === "APR" ? "green" : "#faad14", }} >
                {record.wheel_status === "APR" ? "Vòng quay đã duyệt !" : "Vòng quay đang gửi phê duyệt !"}
              </span>
              : <>
                <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateWheel(record)} >Cập nhật</Button>
                {listWheel.length >= 1 ? (
                  <Popconfirm title="Bạn có muốn?" onConfirm={() => handleDelete(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom">
                    <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
                  </Popconfirm>
                ) : null
                }
                <Button style={{ color: record.wheel_status !== "EDIT" ? "" : '#faad14', borderColor: record.wheel_status !== "EDIT" ? "" : '#faad14', borderWidth: 0.5 }} disabled={record.wheel_status !== "EDIT" ? true : false} onClick={() => sendApprove(record)} >Gửi phê duyệt</Button>
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

  const sendApprove = async (record) => {
    const param = {
      wheel_id: record.wheel_id,
      wheel_status: "SAVE"
    }

    const result = await dispatch(actionWheel.sendAppove(param));
    if (result) {
      Message.Success("Thông Báo", "Gửi phê duyệt thành công");
      onSearch()
      return;
    }
    Message.Error("Thông Báo", "Gửi phê duyệt thất bại");

  }


  const callbackModal = (params) => {
    setVisible(params.visible);
    onSearch()
  }

  const onDoubleClick = (record, rowIndex) => {
    // setVisible(true);
    // setBodyModel({
    //   record: record,
    //   isAdd: false
    // });
    router.push(`/admin/wheel-detail/${record.wheel_id}`)
  }
  const onChangePagination = async (value) => {
    await dispatch(actionWheel.searchWheel(
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
              size='small'
              pagination={false}
              loading={loading}
              scroll={{ x: 1300, y: '45vh' }}
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
            <Pagination
              style={{ marginTop: 10 }}
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
    </LayoutHome >
  )
}

