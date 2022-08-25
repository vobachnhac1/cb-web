import React, { useState } from "react";
import moment from "moment";
import LayoutHome from '@/containers/Home';
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
for (n; n > 0; n--) {
  originData.push({
    key: `${n - 1}`,
    hethong: `Tên hệ thống  ${n - 1}`,
    fromDate: ``,
    toDate: ``,
    trangthai: n % 2 !== 0 ? false : true
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

  const edit = (record) => {
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
  };

  const handleAdd = () => {
    let index = data.length;
    const newData = {
      key: `${index + 1}`,
      hethong: "",
      fromDate: "",
      toDate: "",
      trangthai: ""
    };
    // sắp xếp data lại ngay chổ này
    setData([...data, newData]);
    setCount(count + 1);
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
        //
        item.fromDate = moment(item.fromDate).format("L");
        console.log("item", newData[0]);
        console.log('moment().format("L")', moment().format("L"));
        console.log("item.key", item.key);
        console.log("item.fromDate1", moment(newData[0].fromDate).format("L"));
        console.log("item.fromDate", moment(item.fromDate).format("L"));
        item.toDate = moment(item.toDate).format("L");
        //

        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
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
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <Button style={{ color: 'green', borderColor: 'green', borderWidth: 0.5 }}>
                Active
              </Button>

            </Typography.Link>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }}>
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
              onClick={() => edit(record)}
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
  return (
    <div className="manager-CbCoin">
      <LayoutHome>
        <Col style={{ marginBottom: 30 }}>
          <Card
            headStyle={{
              fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
            }}
            title="Quản lý tích điểm"
            bordered={true}
            style={{ backgroundColor: '#FFFFFF' }}>
            <Col span={48} >
              {/* function tìm kiếm */}
            </Col>
          </Card>
          <div style={{ marginTop: 20 }} />
          <Card>
            <Col span={48} style={{ marginTop: 10 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  onClick={handleAdd}
                  type="primary"
                  style={{
                    marginBottom: 16,
                    background: "green"
                  }}
                >
                  Thêm mới
                </Button>
              </div>
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


