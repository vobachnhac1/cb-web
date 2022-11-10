/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-22
*------------------------------------------------------- */
require("./styles.less");
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
import ModalCustom from '@/containers/modal-wheel-approve';
import { STATE_WHEEL } from '@/constants/common';

export default function WheelApprove(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const listWheel = useSelector(gettersRules.getListWheelApproved) || [];
  const listRules = useSelector(gettersRules.getListRulesStateYes) || [];
  const [filter, setFilter] = useState({
    wheel_name: null,
  });
  const [recordRow, setRecord] = useState(null);
  const [keyRows, setKeyRows] = useState(null);
  const [contentModel, setContentModel] = useState({
    _tittle: null,
    _content1: null,
    _content2: null
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    initPage();
  }, [])


  const initPage = async () => {
    setLoading(true);
    await dispatch(actionsRules.getWheelScreenRulesAPR());
    setLoading(false);
  }

  const onSearch = async () => {
    initPage();
  }

  const columns = [
    {
      title: 'Key',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 40,
      align: 'center'
    },
    // {
    //   title: 'Wheel ID',
    //   dataIndex: 'wheel_id',
    //   key: 'wheel_id',
    //   width: 80,
    //   align: 'center'
    // },
    {
      title: 'Tên vòng quay',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      align: 'left',
      width: 300
    },
    // {
    //   title: 'Số kết quả',
    //   dataIndex: 'num_segments',
    //   key: 'num_segments',
    //   align: 'center',
    //   width: 100,
    // }, 
    {
      title: 'Trạng thái',
      dataIndex: 'wheel_status',
      key: 'wheel_status',
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
      title: 'Thời gian bắt đầu',
      dataIndex: 'from_date_act',
      key: 'from_date_act',
      align: 'center',

      width: 170,
      render: (text, record) => {
        return <span>
          {moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </span>
      }
    },{
      title: 'Thời gian kết thúc',
      dataIndex: 'to_date_act',
      key: 'to_date_act',
      align: 'center',

      width: 170,
      render: (text, record) => {
        return <span>
          {moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </span>
      }
    },{
      title: 'Xem quy tắc vòng quay',
      key: 'link_rules',
      align: 'center',

      width: 170,
      render: (text, record) => {
        return <span style={{textDecorationLine:'underline', fontStyle:'italic'}}> {'Xem chi tiết quy tắc'} </span>
      }
    },
    {
      title: 'Nút nhấn',
      key: 'action',
      dataIndex: 'wheel_status',
      align: 'center',
      width: 300,
      render: (text, record) => {
        if(text == STATE_WHEEL.APR){
          return <Space size="middle">

          <Button style={{ width: '100%', color: 'blue', borderColor: 'blue', borderWidth: 0.5 }}
            onClick={() => actionRow(record, text)} >Phê duyệt</Button>          
          <Button style={{ width: '100%', color: 'green', borderColor: 'green', borderWidth: 0.5, marginRight:10 }}
            onClick={() => actionRow(record, 'REJECT')} >Trả lại</Button>
          </Space>
        }else if(text == STATE_WHEEL.START){
          return <Button style={{ width: '100%', color: 'red', borderColor: 'red', borderWidth: 0.5 }}
          onClick={() => actionRow(record, text)} >Ngừng khẩn cấp</Button>
        }
        return <></>
      }
    },
    
  ];

  const actionRow = async (record, key)=>{ 
    setVisible(true)
    setRecord(record);
    setKeyRows(key)
    if(key == STATE_WHEEL.START){
      const _tittle = 'Bạn có muốn NGỪNG VÒNG QUAY KHẨN CẤP';
      const _content1 = `Tên vòng quay: ${record?.wheel_name}`
      const _content2 = `Thời gian bắt đầu: ${moment(record?.from_date_act).format('YYYY-MM-DD')} - Thời gian kết thúc: ${moment(record?.to_date_act).format('YYYY-MM-DD')}`
      setContentModel({
        _tittle,
        _content1,
        _content2
      })
    }else if(key == STATE_WHEEL.APR){
      const _tittle = 'Bạn có muốn Áp dụng ngay vòng quay';
      const _content1 = `Tên vòng quay: ${record?.wheel_name}`
      const _content2 = `Thời gian bắt đầu: ${moment(record?.from_date_act).format('YYYY-MM-DD')} - Thời gian kết thúc: ${moment(record?.to_date_act).format('YYYY-MM-DD')}`
      setContentModel({
        _tittle,
        _content1,
        _content2
      })
    }else if(key == 'REJECT'){
      const _tittle = 'Bạn có muốn vòng quay cài đặt lại cơ cấu trúng thưởng';
      const _content1 = `Tên vòng quay: ${record?.wheel_name}`
      const _content2 = `Thời gian bắt đầu: ${moment(record?.from_date_act).format('YYYY-MM-DD')} - Thời gian kết thúc: ${moment(record?.to_date_act).format('YYYY-MM-DD')}`
      setContentModel({
        _tittle,
        _content1,
        _content2
      })
    }
  }

  const onStop = async (record) => {
    setLoading(true);
    const param = {
      wheel_id: record.wheel_id,
      wheel_status: STATE_WHEEL.STOP,
    }
    const result = await dispatch(actionsRules.updateStateWheel(param))
    if (!result) {
      Message.Error("THÔNG BÁO", `VÒNG QUAY ${record.wheel_name} ĐÃ ĐƯỢC DỪNG KHẨN CẤP`);
      setLoading(false);
      initPage();
      return;
    }
    setLoading(false);
  }

  const onStart = async (record) => {
    setLoading(true);
    const param = {
      wheel_id: record.wheel_id,
      wheel_status: STATE_WHEEL.START,
    }
    const result = await dispatch(actionsRules.updateStateWheel(param))
    if (!result) {
      Message.Error("THÔNG BÁO", `VÒNG QUAY ${record.wheel_name} ĐÃ ĐƯỢC KÍCH HOẠT`);
      setLoading(false);
      initPage();
      return;
    }
    setLoading(false);
  }

  const onRule = async (record) => {
    setLoading(true);
    const param = {
      wheel_id: record.wheel_id,
      wheel_status: STATE_WHEEL.RULE,
    }
    const result = await dispatch(actionsRules.updateStateWheel(param))
    if (!result) {
      Message.Error("THÔNG BÁO", `VÒNG QUAY ${record.wheel_name} ĐÃ TRẢ VỀ BƯỚC TẠO GIẢI`);
      setLoading(false);
      initPage();
      return;
    }
    setLoading(false);
  }
  const callback = async (value) => {
    setVisible(false)
    if(value.comfirm){
      if(keyRows == STATE_WHEEL.START){
        await onStop(recordRow)
        setKeyRows(null)
        setRecord(null)
      }
      else if(keyRows == STATE_WHEEL.APR){
        await onStart(recordRow);
        setKeyRows(null)
        setRecord(null)
      }else if(keyRows == 'REJECT'){
        await onRule(recordRow);
        setKeyRows(null)
        setRecord(null)
      }
    }
    initPage();
  }


  return (
    <LayoutHome>
      <ModalCustom visible={visible} callback={callback} contentModel={contentModel}  />
      <Col style={{ marginBottom: 30 }}>
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="Phê duyệt vòng quay"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            {/* <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={12}>
                <Input allowClear placeholder="Tên vòng quay cần tìm" value={filter.wheel_name} onChange={(event) => setFilter({ ...filter, wheel_name: event.target.value })} />
              </Col>
            </Row> */}
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

