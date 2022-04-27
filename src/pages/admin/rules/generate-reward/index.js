/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import { useState, useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Typography, Select, Input, Form, Tag, DatePicker, Popconfirm } from 'antd';
import * as Message from '@/components/message';
import ModalRules from '@/containers/modal-rules'
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

import moment from 'moment';
import __ from 'lodash';
import Link from 'next/link';


export default function GenerateReward(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [listWheelDt, setListWheelDt] = useState([]);
  const [listWheelDtTemp, setListWheelDtTemp] = useState([]);
  // const listRules = useSelector(gettersRules.getStateLoadPageRules) || [];
  const listWheelApproved = useSelector(gettersRules.getListWheelApproved) || [];
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
    // lấy danh sách wheel đã được Approved
    setLoading(true);
    await dispatch(actionsRules.getWheelWithStateApprove());
    setLoading(false);
  }
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
    }, {
      title: 'Tên giải thưởng',
      dataIndex: 'segment_name',
      key: 'segment_name',
      width: 100,
    }, {
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
    }, {
      title: 'Giải còn lại',
      dataIndex: 'remain_number',
      key: 'remain_number',
      editable: true,
      width: 100,
      inputType: 'number',
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
    }, {
      title: 'Giải được trúng theo đợt',
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
    }, {
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
    }, {
      key: 'action',
      title: 'Action',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const onKeyPress = (event) => {
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
      onKeyPress={onKeyPress}
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
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // edit table
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    const row = await form.validateFields();
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
      console.log('JSON.stringify(newData) == JSON.stringify(listWheelDtTemp): ', JSON.stringify(newData) == JSON.stringify(listWheelDtTemp));
      setListWheelDt(newData);
      setEditingKey('');
    } else {
      newData.push(row);
      console.log('JSON.stringify(newData) == JSON.stringify(listWheelDtTemp): ', JSON.stringify(newData) == JSON.stringify(listWheelDtTemp));
      if (JSON.stringify(newData) == JSON.stringify(listWheelDtTemp)) {

        setIsEditData(false)
      } else {
        setIsEditData(true)
      }
      setListWheelDt(newData);
      setEditingKey('');
    }
    // console.log('key: ', key);
    // setEditingKey('');
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

  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        {/* <ModalRules visible={visible} bodyModel={bodyModel} callback={callbackModal} /> */}
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="MÀN HÌNH TẠO RANDOM GIẢI THƯỞNG"
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
                  onChange={(value) => setFilter({ ...filter, wheel_id: value })}
                >
                  {listWheelApproved.map((item, key) => (
                    <Select.Option value={item.wheel_id} key={key}> {item.wheel_name}</Select.Option>
                  ))}
                </Select>
              </Col>
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
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch}>Generated</Button>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch}>Add</Button>
              </Col>
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch}>Search</Button>
              </Col>
            </Row>
          </Col>
        </Card>
        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Row gutter={[16, 24]} style={{ marginBottom: 10 }}>
              <Col className="gutter-row" span={8}>
                {isEditData && <Tag color={'error'}>{isEditData ? "Dữ liệu có thay đổi" : ""} </Tag>}
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
                scroll={{ x: 1300, y: 300 }}
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
      </Col>
    </LayoutHome >
  )
}

