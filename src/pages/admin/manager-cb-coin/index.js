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
// for (n; n > 0; n--) {
//   originData.push({
//     key: `${n - 1}`,
//     hethong: `Tên hệ thống  ${n - 1}`,
//     fromDate: ``,
//     toDate: ``,
//     trangthai: n % 2 !== 0 ? false : true
//   });

// }

for (let i = 0; i < n; i++) {
  originData.push({
    key: `${i + 1}`,
    hethong: `Tên hệ thống  ${i + 1}`,
    fromDate: ``,
    toDate: ``,
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
  // let inputNode;
  // if (inputType === "date") {
  //   if (record.fromDate) {
  //     inputNode = (
  //       <DatePicker
  //         value={record.fromDate}
  //         disabledDate={(d) =>
  //           !d || d.isSameOrBefore(moment().set("date", moment().date() - 1))
  //         }
  //       />
  //     );
  //   } else if (record.toDate) {
  //     inputNode = (
  //       <DatePicker
  //         value={record.fromDate}
  //         disabledDate={(d) =>
  //           !d || d.isSameOrBefore(moment().set("date", moment().date() - 1))
  //         }
  //       />
  //     );
  //   }
  //   // inputNode = <DatePicker />;
  // } else {
  //   inputNode = <Input />;
  // }

  // else if(inputType === "active"){
  //   inputNode = <DatePicker />
  // }
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

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const [flagActive, setFlagActive] = useState("")

  const onChangeFlagActive = (flag) => {
    setFlagActive(!flag)
  }

  const edit = (record) => {
    console.log('đã nhấp vào nút cập nhật record :', record)
    setFlagActive(record.trangthai)
    form.setFieldsValue({
      key: "",
      hethong: "",
      fromDate: "",
      toDate: "",
      trangthai: "",
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
    setFlagActive("")
  };


const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      //
      console.log("new data", newData);
      //
      if (index > -1) {
        const item = newData[index];
        item.fromDate = moment(item.fromDate).format("L");
        item.toDate = moment(item.toDate).format("L");
        item.trangthai = flagActive

        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
        setFlagActive("")
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
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
      dataIndex: "key",
      width: 70,
      editable: false
    },
    {
      title: "Tên hệ thống",
      dataIndex: "hethong",
      width: 250,
      editable: true
    },
    {
      title: "Từ ngày",
      dataIndex: "fromDate",
      width: 100,
      editable: true,
      render: (text, record) => {
        return <span>{text ? moment(text).format("YYYY-MM-DD") : ""}</span>;
      }
    },
    {
      title: "Đến ngày",
      dataIndex: "toDate",
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
              onClick={() => save(record.key)}
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
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >

              <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }}>
                Cập nhật
              </Button>
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
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
          col.dataIndex === "fromDate" || col.dataIndex === "toDate"
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
                    {listTopic.map((Item, key) => (
                      <Select.Option value={Item.topic_id} key={key}>{Item.topic_name}</Select.Option>
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


