/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-22
*------------------------------------------------------- */
require("./styles.less");
import classNames, * as classnames from 'classnames';
import { useState, useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Typography, Popconfirm, Input, Tag, DatePicker, Select, Modal } from 'antd';
import * as Message from '@/components/message';
import ModalRules from '@/containers/modal-rules'
const { Text } = Typography;
const { RangePicker } = DatePicker;

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';
import { STATE_WHEEL } from '@/constants/common';

import moment from 'moment';
import __ from 'lodash';
import Link from 'next/link';
import ModalCustom from '@/containers/modal-wheel-approve';

export default function RulesManagement(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const listRules = useSelector(gettersRules.getStateLoadPageRules) || [];
  const listWheel = useSelector(gettersRules.getListWheel) || [];
  const [filter, setFilter] = useState({
    rules_id: null,
    rules_name: null,
    from_date: null,
    to_date: null,
    status_rules: null,
    wheel_id: null
  });

  useEffect(() => {
    initPage();
  }, [])

  const initPage = async () => {
    setLoading(true);
    await dispatch(actionsRules.filterRules({
      rules_id: null,
      rules_name: null,
      from_date: null,
      to_date: null,
      status_rules: null,
      wheel_id: null
    }));
    await dispatch(actionsRules.getWheelScreenRules({
      wheel_status: STATE_WHEEL.SAVE 
    }));
    setWheelInfo(null)
    setEnableNextStep(false)
    setFilter({
      rules_id: null,
      rules_name: null,
      from_date: null,
      to_date: null,
      status_rules: null,
      wheel_id: null
    })
    setLoading(false);
  }
  const onSearch = async () => {
    initPage();
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
      title: 'Actions',
      key: 'action',
      width: 200,
      render: (text, record) => {
        const isShow = record.status_rules == 'N' ? true : false;
        const color = record.status_rules == 'N' ? 'green' : 'red';
        const tagName = record.status_rules == 'N' ? 'Áp dụng' : 'Ngừng sử dụng';
        const no_remove = record.no_remove == 1 ? true : false;
        if (no_remove) {
          return (
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {'Quy tắc được sử dụng cho vòng quay đã phê duyệt'}
            </Text>
          )
        }
        return (
          <Space size="middle">
            <Popconfirm title="Bạn có muốn?" onConfirm={() => {
              setTimeout(() => {
                approveRules(record)
              }, 25)
            }} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
              <Button style={{ color: color, borderColor: color, borderWidth: 0.5 }} >{tagName}</Button>
            </Popconfirm>
            {isShow && <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateRules(record)} >Cập nhật</Button>}
            {isShow && <Popconfirm title="Bạn có muốn?" onConfirm={() => deleteRules(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
            </Popconfirm>}
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
    if(!wheelInfo){
      Message.Warning("Thông Báo", "Vui lòng chọn vòng quay");
      return;
    }
    if(listRules && listRules.length > 0){
      Message.Warning("Thông Báo", "Vòng quay đã có quy tắc");
      return;
    }
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
      wheel_id: record.wheel_id,
      is_delete: 'Y'
    }))
  }

  const approveRules = async (record) => {
    await dispatch(actionsRules.approveRules({
      wheel_id: record.wheel_id,
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

  const [wheelInfo, setWheelInfo ]=useState(null)
  const [enableNextStep, setEnableNextStep ]=useState(false)

  const onChangeSelectWheel = async(value)=>{
    const _item_wheel = listWheel.find(item=>item.wheel_id == value)
    setWheelInfo(_item_wheel)
    setFilter({...filter, wheel_id: value}); 
    const _rs = await dispatch(actionsRules.filterRules({...filter, wheel_id: value}));
  }

  useEffect(()=>{    
    if(listRules && listRules.length > 0){
      const _sort = listRules?.sort((a, b) => (moment(a.to_date) > moment(b.to_date) ? -1 : 1))
      if(moment (_sort[0]?.to_date).format('YYYY-MM-DD') ==  moment(wheelInfo?.to_date_act).format('YYYY-MM-DD')){
        const _verify = listRules?.filter(item=> item.status_rules =='N')
        if( !_verify ||  _verify&&_verify.length == 0){
          setEnableNextStep(true)
        }else{
          setEnableNextStep(false)
        }
      }else{
        setEnableNextStep(false)
      }
    }else{
      setEnableNextStep(false)
    }
  },[listRules])


  const onChangeStateWheel =async(value)=>{
    // call chuyển step
    // SAVE => tới EDIT => record sẽ chuyển tới màn hình Thiết lập lại vòng quay    //
    setLoading(true);
    const result = await dispatch(actionsRules.updateStateWheel({
      wheel_id : wheelInfo.wheel_id,
      wheel_status :value? STATE_WHEEL.RULE:STATE_WHEEL.EDIT,
    }))
    initPage()
    setLoading(false);
  }
  
  const [contentModel, setContentModel] = useState({
    _tittle: null,
    _content1: null,
    _content2: null
  });
  const [keyRows, setKeyRows] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const actionRow = async (key)=>{ 
    setVisibleModal(true)
    setKeyRows(key)
    if(key == 'COMFIRM'){
      const _content1 = `Tên vòng quay: ${wheelInfo?.wheel_name}`
      const _content2 = `Thời gian bắt đầu: ${moment(wheelInfo?.from_date_act).format('YYYY-MM-DD')} - Thời gian kết thúc: ${moment(wheelInfo?.to_date_act).format('YYYY-MM-DD')}`
      setContentModel({
        _tittle:'Bạn có muốn tới bước tạo giải thưởng theo quy tắc',
        _content1: _content1,
        _content2: _content2    
      })
    }else if(key == 'REJECT'){
      if(listRules?.length > 0){
        Message.Warning('Thông Báo','Vui lòng xóa quy tắc đã thêm vào vòng quay')
        return;
      }      
      const _content1 = `Tên vòng quay: ${wheelInfo?.wheel_name}`
      const _content2 = `Thời gian bắt đầu: ${moment(wheelInfo?.from_date_act).format('YYYY-MM-DD')} - Thời gian kết thúc: ${moment(wheelInfo?.to_date_act).format('YYYY-MM-DD')}`
      setContentModel({
        _tittle:'Bạn có muốn thiết lập lại vòng quay',
        _content1: _content1,
        _content2: _content2    
      })
    }
  }

  const callback = async (value) => {
    setVisibleModal(false)
    if(value.comfirm){
      if(keyRows == 'COMFIRM'){
        await onChangeStateWheel(true);
        setKeyRows(null)
        initPage();
      }
      else if(keyRows =='REJECT'){
        await onChangeStateWheel(false);
        setKeyRows(null)
        initPage();
      }
    }
    initPage();
  }

  return (
    <LayoutHome>
      <ModalCustom visible={visibleModal} callback={callback} contentModel={contentModel}  />
      <Col style={{ marginBottom: 30 }}>
        <ModalRules visible={visible} bodyModel={bodyModel} callback={callbackModal}/>
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="PHÂN BỐ GIẢI THƯỞNG TỰ ĐỘNG" 
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={8}>
                 <Select
                  allowClear
                  placeholder="Tên vòng quay"
                  style={{ width: '100%' }}
                  defaultValue={null}
                  value={filter.wheel_id}
                  onChange={onChangeSelectWheel}
                >
                  {listWheel?.map((item, key) => (
                    <Select.Option value={item.wheel_id} key={key}>{`[${item.wheel_status}]`} - {item.wheel_name}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch}>{'Làm mới'}</Button>
              </Col>
              <Col className="gutter-row" span={6}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addRules}>{'Thêm quy luật trúng thưởng'}</Button>
              </Col>
              <Col className="gutter-row" span={6}>
                {wheelInfo?.wheel_id && <Button type='primary' size='middle' style={{ width: '100%' }} onClick={()=>actionRow('REJECT')}>{'Trả hồ sơ'}</Button>}
              </Col>
              <Col className="gutter-row" span={6}>
                {enableNextStep && <Button type='primary' size='middle' style={{ width: '100%' }} onClick={()=>actionRow('COMFIRM')}>{'Chuyển bước tạo giải thưởng'}</Button>}
              </Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={24}>
                <Text style={{fontWeight:'bold'}}>               
                  {`Nút nhấn chuyển bước chỉ xuất hiện khi đạt điều kiện phải có: `}
                </Text>
              </Col>
              <Col span={24}>
                <Text>               
                    {`1. Quy tắc trao trưởng có thời gian giống với thời gian hiệu lực vòng quay.`}
                </Text>
              </Col>
              <Col span={24}>
                <Text>               
                {`2. Trạng thái quy tắc phải là active`}
                </Text>
              </Col>  
              <Col span={24}>
                <Text>               
                {`3. Không có trạng thái "RULE" tồn tại ở next step`}
                </Text>
              </Col>              
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Row>
            <Col span={24}>
              <Row style={{ marginTop: 10 }}>
                <Col className="gutter-row" span={12}>
                  <Text className={classNames({ 'text-font': true })}>{'Mã vòng quay '}</Text>
                </Col>
                <Col  className="gutter-row" span={12}>
                  <Text className={classNames({ 'text-font': true })}>{wheelInfo?.wheel_id}</Text>
                </Col>
              </Row> 
            </Col>
            <Col span={24}>
              <Row style={{ marginTop: 10 }}>
                <Col className="gutter-row" span={12}>
                  <Text className={classNames({ 'text-font': true })}>{'Tên vòng quay'}</Text>
                </Col>
                <Col  className="gutter-row" span={12}>
                  <Text className={classNames({ 'text-font': true })}>{wheelInfo?.wheel_name}</Text>
                </Col>
              </Row>
            </Col>
          </Row> 
          <Row>
              <Col span={24}>
                <Row style={{ marginTop: 10 }}>
                  <Col className="gutter-row" span={12}>
                    <Text className={classNames({ 'text-font': true })}>{'Thời gian bắt đầu'}</Text>
                  </Col>
                  <Col  className="gutter-row" span={12}>
                    <Text className={classNames({ 'text-font': true })}>{wheelInfo?.from_date_act &&  moment(wheelInfo?.from_date_act).format('HH:mm:ss , DD-MM-YYYY ')}</Text>
                  </Col>
                </Row> 
              </Col>
              <Col span={24}>
                <Row style={{ marginTop: 10 }}>
                  <Col className="gutter-row" span={12}>
                    <Text className={classNames({ 'text-font': true })}>{'Thời gian kết thúc'}</Text>
                  </Col>
                  <Col  className="gutter-row" span={12}>
                    <Text className={classNames({ 'text-font': true })}>{ wheelInfo?.to_date_act && moment(wheelInfo?.to_date_act).format('HH:mm:ss , DD-MM-YYYY ')}</Text>
                  </Col>
                </Row>
            </Col>
          </Row>
          
          
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
              scroll={{ x: 1300, y: '48vh' }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => { }, // click row
                  onDoubleClick: event => {
                    // onDoubleClick(record, rowIndex)
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

