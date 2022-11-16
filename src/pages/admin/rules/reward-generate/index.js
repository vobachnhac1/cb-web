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
import { Button, Card, Col, Row, Space, Table, Typography, Select, Input, Form, Tag, DatePicker, Popconfirm, Modal } from 'antd';
import * as Message from '@/components/message';
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

import moment from 'moment';
import __ from 'lodash';
import { STATE_WHEEL } from '@/constants/common';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalCustom from '@/containers/modal-wheel-approve';

export default function GenerateReward(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [listWheelDt, setListWheelDt] = useState([]);
  const [listWheelDtTemp, setListWheelDtTemp] = useState([]);
  const listWheelRule = useSelector(gettersRules.getListWheelRule) || [];
  const listRules = useSelector(gettersRules.getListRulesStateYes) || [];
  const [filter, setFilter] = useState({
    wheel_id: null,
    wheel_name: null,
    from_date: null,
    to_date: null,
    rules_id: null
  });

  useEffect(() => {
    initPage();
  }, [])


  const initPage = async () => {
    setLoading(true);
    // lấy danh sách wheel có trạng thái  RULE
    await dispatch(actionsRules.getWheelWithStateRule());
    setLoading(false);
  };

  const onSearch = async () => {
    setEditingKey('')
    setIsEditData(false)
    // search by filter
    const { wheel_id } = filter;
    if (!wheel_id || wheel_id && wheel_id <= 0) {
      Message.Warning("THÔNG BÁO", "Vui lòng chọn vòng quay")
      return;
    }
    setLoading(true);
    const result = await dispatch(actionsRules.getWheelDtStateApprove(filter.wheel_id));
    if (result.length > 0) {
      setListWheelDt(result.map((item, index) => ({ ...item, key: index })))
      setListWheelDtTemp(result.map((item, index) => ({ ...item, key: index })))
    } else {
      setListWheelDt([]);
      setListWheelDtTemp([]);
    }
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
    },
    {
      title: 'Tên giải thưởng',
      dataIndex: 'segment_name',
      key: 'segment_name',
      width: 145,
    },
    {
      title: 'Tên vòng quay ',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      width: 100,
    }, {
      title: 'Tên quy tắc',
      dataIndex: 'rules_name',
      key: 'rules_name',
      width: 100,
    }, {
      title: 'Tổng số giải trúng',
      dataIndex: 'total_number',
      key: 'total_number',
      align: 'center',
      width: 100,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'space-between',
          fontWeight: '500',
          justifyContent: 'center'
        }}>
          <Text>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </Space>
      )
    }, {
      title: 'Giải còn lại',
      dataIndex: 'remain_number',
      key: 'remain_number',
      align: 'center',
      width: 65,
      inputType: 'number',
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'space-between',
          fontWeight: '500',
          justifyContent: 'center'
        }}>
          <Text>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </Space>
      )
    }, {
      title: 'Giải được trúng',
      dataIndex: 'total_reward',
      key: 'total_reward',
      width: 100,
      align: 'center',
      editable: true,
      render: (text, record) => (
        <Space size="large" style={{
          'display': 'flex',
          'justifyContent': 'space-between',
          fontWeight: '500',
          justifyContent: 'center'
        }}>
          <Text>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </Space>
      )
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'from_date',
      key: 'from_date',
      width: 110,
      align: 'center',
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
      width: 110,
      align: 'center',
      render: (text, record) => {
        return <Text>
          {moment(text).format('YYYY-MM-DD, HH:mm:ss')}
        </Text>
      }
    }, {
      key: 'action',
      title: 'Action',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div>
            <Popconfirm title="Bạn có lưu?" onConfirm={() => _save(record.key)}>

              <Button style={{ color: 'green', borderColor: 'green', borderWidth: 0.5 }}>
                Lưu
              </Button>
            </Popconfirm>
            <Popconfirm title="Bạn muốn thoát?" onConfirm={_cancel} >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5, marginLeft: 10 }}>
                Thoát
              </Button>
            </Popconfirm>
          </div>
        ) :
          record.total_number != 0 && <Typography.Link disabled={editingKey !== ''} onClick={() => _edit(record)}> <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }}>
            Edit
          </Button>
          </Typography.Link>
      },
    },
  ];

  const _onKeyPress = (event) => {
    let code = event.keyCode || event.charCode;
    if ((code >= 48 && code <= 57) || code === 13) {
      setIsChangeText(true);
    } else {
      setIsChangeText(false);
    }
  }
  const [isEditData, setIsEditData] = useState(false)
  const [isChangeText, setIsChangeText] = useState(false)
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input
      onKeyPress={_onKeyPress}
      onChange={(text) => {
        if (!isChangeText) {
          setIsChangeText(true);
          return;
        };
      }} />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(`Vui lòng nhập ${title.toLowerCase()}!`);
                  }
                  if (parseInt(value).toString() == 'NaN') {
                    return Promise.reject("Vui lòng chỉ nhập số!");
                  }
                  if (value && parseInt(value).toString() != 'NaN' && (parseInt(value) > record['remain_number'])) {
                    return Promise.reject("Số giải trúng > số giải còn lại");
                  }
                  return Promise.resolve();
                },
              }
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )
        }
      </td >
    );
  };

  // edit table
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;

  const _edit = (record) => {
    const { total_number } = record;
    if (total_number > 0) {
      form.setFieldsValue(record);
      setEditingKey(record.key);
    } else {
      Message.Warning("THÔNG BÁO", "GIẢI THƯỞNG KHÔNG ĐƯỢC PHÉP CHỈNH SỬA");
    }
  };

  const _cancel = () => {
    setEditingKey('');
  };

  const _save = async (key) => {
    const rowText = await form.validateFields();
    if (rowText['total_reward'].toString().trim().length === 0 || parseInt(rowText['total_reward']).toString() == 'NaN') {
      Message.Error("Thông báo", "Giá trị có kí tự chữ");
      return;
    }
    const row = {
      total_reward: parseInt(rowText['total_reward'])
    }
    const newData = [...listWheelDt];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      if (JSON.stringify(newData) == JSON.stringify(listWheelDtTemp)) {
        setIsEditData(false)
      } else {
        setIsEditData(true)
      }
      setListWheelDt(newData);
      setEditingKey('');
    } else {
      newData.push(row);
      if (JSON.stringify(newData) == JSON.stringify(listWheelDtTemp)) {
        setIsEditData(false)
      } else {
        setIsEditData(true)
      }
      setListWheelDt(newData);
      setEditingKey('');
    }
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // add function phê duyệt
  const onSave = async () => {
    setLoading(true);
    if (listWheelDt.length > 0) {
      const dataFormat = listWheelDt.map(item => ({
        "wheel_id": item.wheel_id,
        "wheel_detail_id": item.wheel_detail_id,
        "total_reward": item.total_reward,
      }));
      const params = {
        list_length: dataFormat.length,
        wheel_id: __.head(dataFormat).wheel_id,
        list_wheel_detail: dataFormat
      }
      const result = await dispatch(actionsRules.updateWheelDetailWithRules(params));
      if (result) {
        onGenerated(true);
        Message.Success("THÔNG BÁO", "CẬP NHẬT THÀNH CÔNG");
        setIsEditData(false);
        setListWheelDtTemp(listWheelDt);
      } else {
        Message.Error("THÔNG BÁO", "CẬP NHẬT THẤT BẠI");
      }
    }
    setLoading(false);
  };

  const onGenerated = async (value) => {
    setLoading(true);
    const { wheel_id, rules_id } = filter;

    if (!wheel_id || wheel_id < 0) {
      Message.Warning("THÔNG BÁO", "Vui lòng chọn vòng quay và nhấn nút 'Search'");
      setLoading(false);
      return;
    }
    if (!rules_id || rules_id <= 0) {
      Message.Warning("THÔNG BÁO", "Vui lòng chọn quy tắc áp dụng");
      setLoading(false);
      return;
    }
    if (!listWheelDt || listWheelDt && listWheelDt.length == 0) {
      Message.Warning("THÔNG BÁO", "Không có dữ liệu, vui lòng chọn vòng quay và nhấn nút 'Search'");
      setLoading(false);
      return;
    }
    const recoreWheel = listWheelRule?.find(item => item.wheel_id == filter.wheel_id)

    const result = await dispatch(actionsRules.generateRewardOfRules({
      wheel_id: recoreWheel.wheel_id,
      rules_id: filter.rules_id > 0 ? filter.rules_id : recoreWheel.rules_id,
    }));
    if (!result) {
      if(!value){
        Message.Warning("THÔNG BÁO", "Vui lòng chọn thử lại")
      }
      setLoading(false);
      return;
    }
    if(!value){
      Message.Success("THÔNG BÁO", "Đã Tạo thành công");

    }
    onSearch();
    setLoading(false);
  }

  const onApproved = async () => {
    // phải có wheel_id, rules_id, listApporve có data
    // lấy tổng giải so với tổng giải của rules
    const { rules_id, wheel_id } = filter;
    if (!rules_id || rules_id <= 0) {
      return;
    }
    if (!wheel_id || wheel_id <= 0) {
      return;
    }
    const rules = listRules.find(item => item.rules_id == rules_id);
    let total_reward_list = null;
    if (listWheelDt && listWheelDt.length > 0) {
      total_reward_list = listWheelDt.map(item => item.total_reward).reduce((a, b) => a + b);
    }
    // if (!total_reward_list || total_reward_list != rules?.total_reward) {
    //   Message.Warning("Thông Báo", "Vui lòng thực hiện tạo ngẫu nhiên trước");
    //   return;
    // }
    // call API change status 'RULE' => 'APR'
    setLoading(true);
    const param = {
      wheel_id: wheel_id,
      wheel_status: STATE_WHEEL.APR,
    }
    const result = await dispatch(actionsRules.updateStateWheel(param))
    if (!result) {
      Message.Error("THÔNG BÁO", `MÃ VÒNG QUAY ${wheel_id} CHUYỂN PHÊ DUYỆT THẤT BẠI`);
      setLoading(false);
      initPage();
      return;
    }
    Message.Success("THÔNG BÁO", `MÃ VÒNG QUAY ${wheel_id} CHUYỂN PHÊ DUYỆT THÀNH CÔNG`);
    setLoading(false);
    setFilter({
      wheel_id: null,
      wheel_name: null,
      from_date: null,
      to_date: null,
      rules_id: null
    })
    initPage();
    setListWheelDt([]);
    setListWheelDtTemp([]);
  }

  const onReject = async () => {
    const { wheel_id } = filter;
    if(!wheel_id){
      Message.Success("THÔNG BÁO", `VUI LÒNG CHỌN VÒNG QUAY`);
      return;
    }
    // change status = "RULE"
    // set state filter null là dc
    try {// call API change status 'RULE' => 'SAVE'
      setLoading(true);
      const param = {
        wheel_id: wheel_id,
        wheel_status: STATE_WHEEL.SAVE,
      }
      const result = await dispatch(actionsRules.updateStateWheel(param))
      if (!result) {
        Message.Error("THÔNG BÁO", `[ERROR] MÃ VÒNG QUAY ${wheel_id} CÀI ĐẶT LẠI QUY TẮC LỖI`);
        setLoading(false);
        initPage();
        return;
      }
      Message.Success("THÔNG BÁO", `MÃ VÒNG QUAY ${wheel_id} CÀI ĐẶT LẠI QUY TẮC`);
      setFilter({
        wheel_id: null,
        wheel_name: null,
        from_date: null,
        to_date: null,
        rules_id: null
      });
      setListWheelDt([]);
      setListWheelDtTemp([]);
      initPage();
      setLoading(false);
      // từ chối có nghĩa chrnh lại wheel detail
    } catch (error) {
      Message.Error("THÔNG BÁO", `MÃ VÒNG QUAY ${wheel_id} Từ chối thất bại`);
      setLoading(false);
    }
  }

  const onChangeSelectWheel = async (value) => {
    // lấy rules
    if(value){
      setLoading(true);
      const _rs = await dispatch(actionsRules.getListRulesStateApprove({wheel_id: value}));
      const _rule = listRules[0];

      setFilter({
        ...filter,
        wheel_id: value,
        rules_id: listRules[0]?.rules_id,
      });
      // TH 1: lấy đúng 1 row trùng với thời gian hiệu lực vòng quay
      // B1: lấy thông tin vòng quay
      const _wheel = listWheelRule?.find(ele => ele.wheel_id == value);
      const result = await dispatch(actionsRules.getWheelDtStateApprove(value));
      if (result.length > 0) {
        setListWheelDt(result.map((item, index) => ({ ...item, key: index })))
        setListWheelDtTemp(result.map((item, index) => ({ ...item, key: index })))
      } else {
        setListWheelDt([]);
        setListWheelDtTemp([]);
      }

      // TH 2: lấy hiển thị hết trên 1 row
      setLoading(false);
    }else{
      setFilter({
        ...filter,
        wheel_id: value,
        rules_id: null
      })
      setListWheelDt([]);
      setListWheelDtTemp([]);
    }
  }

  const [contentModel, setContentModel] = useState({
    _tittle: null,
    _content1: null,
    _content2: null
  });
  const [keyRows, setKeyRows] = useState(null);
  const [visible, setVisible] = useState(false);
  const actionRow = async (key)=>{ 
    setVisible(true)
    setKeyRows(key)
    if(key == 'COMFIRM'){
      if(!filter.wheel_id)return;
      const _wheel =  listWheelRule?.find(item => item.wheel_id == filter.wheel_id)
      const _content1 = `Tên vòng quay: ${_wheel?.wheel_name}`
      const _content2 = `Thời gian bắt đầu: ${moment(_wheel?.from_date_act).format('YYYY-MM-DD')} - Thời gian kết thúc: ${moment(_wheel?.to_date_act).format('YYYY-MM-DD')}`
      setContentModel({
        _tittle:'Bạn có muốn chuyển bước Phê duyệt vòng quay',
        _content1: _content1,
        _content2: _content2    
      })
    }else if(key == 'REJECT'){
      if(!filter.wheel_id)return;
      const _wheel =  listWheelRule?.find(item => item.wheel_id == filter.wheel_id)
      const _content1 = `Tên vòng quay: ${_wheel?.wheel_name}`
      const _content2 = `Thời gian bắt đầu: ${moment(_wheel?.from_date_act).format('YYYY-MM-DD')} - Thời gian kết thúc: ${moment(_wheel?.to_date_act).format('YYYY-MM-DD')}`
      setContentModel({
        _tittle:'Bạn có muốn cài đặt lại quy tắc vòng quay',
        _content1: _content1,
        _content2: _content2    
      })
    }
  }

  const callback = async (value) => {
    setVisible(false)
    if(value.comfirm){
      if(keyRows == 'COMFIRM'){
        await onApproved()
        setKeyRows(null)
      }
      else if(keyRows =='REJECT'){
        await onReject();
        setKeyRows(null)
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
          title="Tạo phần thưởng tự động"
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
                  {listWheelRule?.map((item, key) => (
                    <Select.Option value={item.wheel_id} key={key}> {item.wheel_name}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%', height: 30 }} onClick={initPage}>Làm mới</Button>
              </Col>
            </Row>
            <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
              <Col className="gutter-row" span={6} style={{ margin: 10, height: 40 }}>
                <Button type='primary' size='middle' style={{ width: '100%', height: 30 }} onClick={()=>actionRow('COMFIRM')}>Chuyển bước phê duyệt</Button>
              </Col>
              <Col className="gutter-row" span={4} style={{ margin: 10, height: 40 }}>
                <Button type='primary' size='middle' style={{ width: '100%', height: 30 }} onClick={()=>actionRow('REJECT')}>Trả về tạo quy tắc</Button>
              </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} >
            <Row style={{ justifyContent: "space-between" }}>
              <Col span={4}>
                <Col className="gutter-row" span={4} style={{ margin: 10, height: 40 }}>
                  {isEditData && <Tag style={{ fontSize: 12, padding: 5, height: 30 }} color={'error'}>{isEditData ? "Dữ liệu có thay đổi" : ""} </Tag>}
                </Col>
              </Col>
              <Col span={20}>
                <Row style={{ justifyContent: "space-between" }}>
                  <Col className="gutter-row" span={4} style={{ margin: 10, height: 40 }}>
                    {isEditData && <Button type='primary' size='middle' style={{ width: '100%', height: 30 }} onClick={onSave}>Lưu Lại</Button>}
                  </Col>
                  <Col className="gutter-row" span={6} style={{ margin: 10, height: 40 }}>
                    <Button disabled={filter.wheel_id == null || listWheelDt.length == 0} type='primary' size='middle' style={{ width: '100%', height: 30 }} onClick={onGenerated}>Tạo giải ngẫu nhiên</Button>
                  </Col>
                
                </Row>
              </Col>
            </Row>
            <Form form={form} component={false}>
              <Table
                className="table_layout"
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                columns={mergedColumns}
                dataSource={listWheelDt}
                size='small'
                loading={loading}
                scroll={{ x: 1300, y: '45vh' }}
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
            </Form>
          </Col>
        </Card>
      </Col >
    </LayoutHome >
  )
}

