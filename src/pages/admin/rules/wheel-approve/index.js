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
import { Button, Card, Col, Row, Space, Table, Popconfirm, Tag, Input } from 'antd';
import * as Message from '@/components/message';

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

import moment from 'moment';
import __ from 'lodash';
import ModalWheelApprove from '@/containers/modal-wheel-approve';

export default function WheelApprove(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const listWheel = useSelector(gettersRules.getListWheel) || [];
  const listRules = useSelector(gettersRules.getListRulesStateYes) || [];
  const [filter, setFilter] = useState({
    wheel_name: null,
  });

  useEffect(() => {
    initPage();
  }, [])


  const initPage = async () => {
    setLoading(true);
    await dispatch(actionsRules.getWheelScreenRules());
    await dispatch(actionsRules.getListRulesStateApprove());
    setLoading(false);
  }

  const onSearch = async () => {
    const { wheel_name } = filter;
    if (__.isNil(wheel_name)) {
      initPage();
    } else {
      setLoading(true);
      await dispatch(actionsRules.getWheelScreenRules({ wheel_name: wheel_name }));
      setLoading(false)
      return;
    }
  }

  const columns = [
    {
      title: 'Key',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 40,
      align: 'center'
    },
    {
      title: 'Wheel ID',
      dataIndex: 'wheel_id',
      key: 'wheel_id',
      width: 80,
      align: 'center'
    },
    {
      title: 'Tên vòng quay',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      align: 'left',
      width: 300
    },
    {
      title: 'Số kết quả',
      dataIndex: 'num_segments',
      key: 'num_segments',
      align: 'center',
      width: 100,
    },
    {
      title: 'Tổng giá trị giải (VNĐ)',
      dataIndex: 'total_value',
      key: 'total_value',
      align: 'right',
      width: 180,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'space-between',
          'fontWeight': '500',
          justifyContent: 'flex-end'
        }}>
          <span>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </Space>
      )

    },
    {
      title: 'Giá trị còn lại  (VNĐ)',
      dataIndex: 'remain_value',
      key: 'remain_value',
      align: 'right',
      width: 180,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'space-between',
          'fontWeight': '500',
          justifyContent: 'flex-end'

        }}>
          <span >
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </Space>
      )
    }, {
      title: 'Ngày hết hiệu lực',
      dataIndex: 'inactived_date',
      key: 'inactived_date',
      align: 'center',

      width: 170,
      render: (text, record) => {
        return <span>
          {moment(text).format('YYYY-MM-DD, HH:mm:ss')}
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
    }, {
      title: 'Trạng thái',
      dataIndex: 'is_valid',
      key: 'is_valid',
      width: 170,
      render: (text, record) => {
        return <Tag color={text == 1 ? 'green' : 'error'}>
          {
            text == 1 ? 'Hợp lệ' : 'Không hợp lệ'
          }
        </Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 210,
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        const color = record.is_valid == 1 && record.wheel_status === 'APR' ? 'red' : 'green'
        return (
          <Space size="middle">
            {
              record.is_valid != 1 ?
                <span style={{ color: '#d46b08' }} >
                  Vui lòng kiểm tra lại vòng quay!
                </span> : null
            }
            {
              record.is_valid == 1 ? <Button style={{ width: 80, color: color, borderColor: color, borderWidth: 0.5 }}
                onClick={() => onApproved(record)} > {record.wheel_status === 'APR' ? 'Từ chối' : 'Phê duyệt'}</Button> : null
            }
            {
              record.is_valid == 1 && record.wheel_status === 'APR' && <Button style={{ width: '100%', color: 'blue', borderColor: 'blue', borderWidth: 0.5 }}
                onClick={() => onAddRules(record)} >Thêm quy tắc</Button>
            }
          </Space>
        )
      },
    },
  ];

  const onApproved = async (record) => {
    setLoading(true);
    const param = {
      wheel_id: record.wheel_id,
      wheel_status: record.wheel_status === 'APR' ? 'NEW' : 'APR',

    }
    const result = await dispatch(actionsRules.updateStateWheel(param))
    if (!result) {
      Message.Error("THÔNG BÁO", `MÃ VÒNG QUAY ${record.wheel_id} PHÊ DUYỆT THẤT BẠI`);
      return;
    }
    Message.Success("THÔNG BÁO", `MÃ VÒNG QUAY ${record.wheel_id} PHÊ DUYỆT THÀNH CÔNG`);
    setLoading(false);
  }

  const onAddRules = (record) => {
    // Message.Info("THÔNG BÁO", "TÍNH NĂNG ĐĂNG PHÁT TRIỂN");
    setVisible(!visible);
    setDataModal({
      ...dataModal,
      record: record
    })
  }

  // xử lý modal approve
  const [dataModal, setDataModal] = useState({
    isAdd: false,
    record: null
  });

  const [visible, setVisible] = useState(false);

  const callback = ({ visible }) => {
    setVisible(visible);
    setDataModal({
      isAdd: false,
      record: null
    });
    onSearch()
  }


  return (
    <LayoutHome>
      <ModalWheelApprove visible={visible} callback={callback} bodyModel={dataModal} listRules={listRules} />
      <Col style={{ marginBottom: 30 }}>
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="Phê duyệt vòng quay"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={12}>
                <Input allowClear placeholder="Tên vòng quay cần tìm" value={filter.wheel_name} onChange={(event) => setFilter({ ...filter, wheel_name: event.target.value })} />
              </Col>
            </Row>
            <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
              <Col className="gutter-row" span={5}>
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
              loading={loading}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome >
  )
}

