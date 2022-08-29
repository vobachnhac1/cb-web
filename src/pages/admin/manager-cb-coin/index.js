import React, { useState } from "react";
import moment from "moment";
import LayoutHome from '@/containers/Home';
import ModalManagerCbCoin from '@/containers/modal-manager-cb-coin'
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
  DatePicker,
  Col,
  Card,
  Row
} from "antd";

require("./styles.less");
const originData = [];
let n = 10


for (let i = 0; i < n; i++) {
  originData.push({
    ord_numbers: `${i + 1}`,
    criteria_name: `Tên hệ thống  ${i + 1}`,
    from_date: ``,
    to_date: ``,
    trangthai: i % 2 !== 0 ? false : true
  });

}

let totalStt = parseInt(originData.length) - parseInt(1);

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
  const inputNode =
    inputType === "date" ? (
      <DatePicker
        disabledDate={(d) =>
          !d || d.isSameOrBefore(moment().set("date", moment().date() - 1))
        }
      />
    ) : (
      <Input />
    );
 
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${title}!`
            }
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

export default function ManagerCbCoin(props) {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [count, setCount] = useState(totalStt);

  const [editingord_numbers, setEditingord_numbers] = useState("");
  const isEditing = (record) => record.ord_numbers === editingord_numbers;

  const [flagActive, setFlagActive] = useState("")

  const onChangeFlagActive = (flag) => {
    setFlagActive(!flag)
  }

  const edit = (record) => {
    console.log('đã nhấp vào nút cập nhật record :', record)
    setFlagActive(record.trangthai)
    form.setFieldsValue({
      ord_numbers: "",
      criteria_name: "",
      from_date: "",
      to_date: "",
      trangthai: "",
      ...record
    });
    setEditingord_numbers(record.ord_numbers);
  };

  const cancel = () => {
    setEditingord_numbers("");
    setFlagActive("")
  };


const save = async (ord_numbers) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => ord_numbers === item.ord_numbers);
      //
      console.log("new data", newData);
      //
      if (index > -1) {
        const item = newData[index];
        item.from_date = moment(item.from_date).format("L");
        item.to_date = moment(item.to_date).format("L");
        item.trangthai = flagActive

        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingord_numbers("");
        setFlagActive("")
      } else {
        newData.push(row);
        setData(newData);
        setEditingord_numbers("");
      }
      console.log(newData);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onDelete = (recordID) =>{
    // call action xóa

  }

  const columns = [
    {
      title: "STT",
      dataIndex: "ord_numbers",
      width: 70,
      editable: false
    },
    {
      title: "Tên hệ thống",
      dataIndex: "criteria_name",
      width: 250,
      editable: true
    },
    {
      title: "Từ ngày",
      dataIndex: "from_date",
      width: 100,
      editable: true,
      render: (text, record) => {
        return <span>{text ? moment(text).format("YYYY-MM-DD") : ""}</span>;
      }
    },
    {
      title: "Đến ngày",
      dataIndex: "to_date",
      width: 100,
      editable: true,
      render: (text, record) => {
        return <span>{text ? moment(text).format("YYYY-MM-DD") : ""}</span>;
      }
    },
    {
      align: 'center',
      title: "Trạng thái",
      dataIndex: "trangthai",
      width: 120,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link

              style={{
                marginRight: 8,
              }}
            >
              <Button onClick={() => onChangeFlagActive(flagActive)} style={{ color: `${flagActive ? 'white' : 'green'}`, borderColor: 'green', borderWidth: 0.5, background: `${flagActive ? 'green' : ''}` }}>
                Active
              </Button>

            </Typography.Link>
            <Typography.Link

              style={{
                marginRight: 8,
              }}
            >
              <Button onClick={() => onChangeFlagActive(flagActive)} style={{ color: `${flagActive ? 'red' : 'white'}`, borderColor: 'red', borderWidth: 0.5, background: `${flagActive ? '' : 'red'}` }}>
                Inactive
              </Button>

            </Typography.Link>

          </span>
        ) : (
          <div
            style={{
              fontWeight: "500"
            }}
          >
            {record.trangthai ? <span style={{ color: "green" }}>Đang hoạt động</span> : <span style={{ color: "red" }}>Dừng hoạt động</span>}
          </div>
        );
      }

    },
    {
      align: 'center',
      title: "Action",
      dataIndex: "operation",
      width: 100,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.ord_numbers)}
              style={{
                marginRight: 8
              }}
            >
              <Button style={{ color: 'green', borderColor: 'green', borderWidth: 0.5 }}>
                Lưu
              </Button>
            </Typography.Link>
            <Popconfirm
              okText="Xác nhận"
              cancelText="Thoát"
              title="Bạn muốn hủy?"
              onConfirm={cancel}
            >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }}>
                Hủy
              </Button>
            </Popconfirm>
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "500"
            }}
          >
            <Typography.Link
              disabled={editingord_numbers !== ""}
              onClick={() => edit(record)}
            >

              <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }}>
                Cập nhật
              </Button>
            </Typography.Link>
            <Typography.Link
              disabled={editingord_numbers !== ""}
            >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }}>
                Xóa
              </Button>
            </Typography.Link>
          </div>
        );
      }
    }
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "from_date" || col.dataIndex === "to_date"
            ? "date"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  // modal
  const [visible, setVisible] = useState(false);
  const [bodyModel, setBodyModel] = useState({
    isAdd: false,
    record: null
  });

  const addNew = () => {
    setVisible(true);
    setBodyModel({
      record: null,
      isAdd: true
    });
  }

  const callbackModal = (params) => {
    setVisible(params.visible);
    // onSearch()
  }

  return (
    <div className="manager-CbCoin">
      <LayoutHome>
        <Col style={{ marginBottom: 30 }}>
          {/* modal */}
          <ModalManagerCbCoin visible={visible} bodyModel={bodyModel} callback={callbackModal} />

          <Card
            headStyle={{
              fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
            }}
            title="Quản lý tiêu chí CBCoin"
            bordered={true}
            style={{ backgroundColor: '#FFFFFF' }}>
            <Col span={48} >
              {/* function tìm kiếm */}
              {/* <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={4}>
                  <Select
                    allowClear
                    placeholder="Chủ đề"
                    style={{ width: '100%' }}
                    defaultValue={null}
                    value={filter.topic_id}
                    onChange={(value) => setFilter({ ...filter, topic_id: value })}>
                    {listTopic.map((Item, ord_numbers) => (
                      <Select.Option value={Item.topic_id} ord_numbers={ord_numbers}>{Item.topic_name}</Select.Option>
                    ))}
                  </Select>
                </Col>
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
                <Col className="gutter-row" span={6}>
                  <Input placeholder="Tên giải thưởng cần tìm" allowClear value={filter.segment_name} onChange={(event) => setFilter({ ...filter, segment_name: event.target.value ? event.target.value : null })} />
                </Col>
              </Row> */}
              <Row gutter={[16, 24]} style={{ marginTop: '10px' }}>
                <Col className="gutter-row" span={3}>
                  <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addNew}>Thêm</Button>
                </Col>
                <Col className="gutter-row" span={3}>
                  <Button type='primary' size='middle' style={{ width: '100%' }} >Tìm kiếm</Button>
                </Col>
              </Row>
            </Col>
          </Card>
          <div style={{ marginTop: 20 }} />
          <Card>
            <Col span={48} style={{ marginTop: 10 }}>
              {/* table */}
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell
                    }
                  }}
                  scroll={{ x: 1300, y: "45vh" }}
                  bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel
                  }}
                />
              </Form>

            </Col>
          </Card>
        </Col>
      </LayoutHome >
    </div>
  );
};


