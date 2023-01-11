/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-10-07
*------------------------------------------------------- */
require("./styles.less");
import { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Table, DatePicker, Typography, Popconfirm } from 'antd';
import moment from 'moment';
import __ from 'lodash';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import * as Message from '@/components/message';

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import Text from 'antd/lib/typography/Text';
import { actions, getters } from '@/redux/system';
import ModalSystemManagement from '@/containers/modal-system-management';

export default function SystemManagement(props) {
  const dispatch = useDispatch();
  const systemList = useSelector(getters.getSystemList);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [record, setRecord] = useState(null);
  useEffect(() => {
    initPage();
  }, []);
  const columns = [
    {
      align: 'center',
      title: 'STT',
      dataIndex: 'ord_numbers',
      key: 'ord_numbers',
      width: 50,
    }, {
      align: 'center',
      title: 'Mã hệ thống phòng ban',
      dataIndex: 'sysCode',
      key: 'sysCode',
      width: 100,
    }, {
      align: 'center',
      title: 'Tên hệ thống phòng ban',
      dataIndex: 'sysName',
      key: 'sysName',
      width: 180,
    }, {
      width: 100,
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    }, {
      align: 'center',
      width: 120,
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),
    }, {
      width: 100,
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
    }, {
      align: 'center',
      width: 120,
      title: 'Ngày cập nhật',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (text) => (
        <Text>{text ? moment(text).format('HH:mm:ss,  YYYY-MM-DD') : ''}</Text>
      ),

    }, {
      width: 100,
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    }, {
      align: 'center',
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateSystem(record)} >Cập nhật</Button>
          <Popconfirm title="Bạn có muốn?" onConfirm={() => deleteSystem(record)} okText="Xác nhận" cancelText="Thoát" placement="leftBottom" >
            <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Xóa</Button>
          </Popconfirm>
        </Space>

      ),
    },

  ];

  const initPage = async () => {
    const res = await dispatch(actions.setSystemList());
  }
  const onSearch = () => { initPage() }

  const insertSystem = () => {
    setUpdate(false)
    setOpen(true)
  }

  const updateSystem = (value) => {
    setRecord(value)
    setUpdate(true)
    setOpen(true)
  }

  const deleteSystem = async (value) => {
    // NẾU XÓA THÌ PHẢI CHECK TOÀN BỘ TABLE ĐANG DÙNG HỆ THỐNG ĐANG DÙNG NẾU EXIST THÌ KHÔNG ĐƯỢC XÓA
    // HIỆN TẠI THÌ CHƯA CÓ CHECK
    const param = `/${value.sysCode}/${true}/${value.id}`
    const result = await dispatch(actions.deleteSystem(param));
    if (result.success) {
      Message.Success("Thông Báo", result.message);
      initPage();
      return;
    }
    Message.Error("Thông Báo", result.message);
  }


  const callbackComfirm = async (value) => {
    if (!value.visible) {
      setOpen(false)
      return;
    }
    if (update) {
      const param = {
        sysCode: value.sysCode,
        sysName: value.sysName,
        description: value.description,
        id: value.id,
      }
      const result = await dispatch(actions.updateSystem(param));
      if (result.success) {
        setOpen(false)
        setUpdate(false)
        setRecord(null)
        Message.Success("Thông Báo", result.message);
        initPage();
        return;
      }
      Message.Error("Thông Báo", result.message);
      // call API update
    } else {
      const param = {
        sysCode: value.sysCode,
        sysName: value.sysName,
        description: value.description
      }
      const result = await dispatch(actions.insertSystem(param));
      if (result.success) {
        setOpen(false)
        setUpdate(false)
        setRecord(null)
        Message.Success("Thông Báo", result.message);
        initPage();
        return;
      }
      Message.Error("Thông Báo", result.message);
    }
  }

  return (
    <LayoutHome>
      {open && <ModalSystemManagement callback={callbackComfirm} visible={open} bodyModel={{
        record: record, update: update
      }} />}
      <Col style={{ marginBottom: 30 }}>
        <Card
          headStyle={{
            fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)"
          }}
          title="Quản lý Phòng ban"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF' }}>
          <Col span={48} >
            <Row gutter={[16, 24]} style={{ marginTop: 10 }}>
              {/* <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={onSearch} >Tìm kiếm</Button>
              </Col> */}
              <Col className="gutter-row" span={3}>
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={insertSystem}>Thêm</Button>
              </Col>
            </Row>
          </Col>
        </Card>

        <div style={{ marginTop: 20 }} />
        <Card>
          <Col span={48} style={{ marginTop: 10 }}>
            <Table
              columns={columns}
              dataSource={systemList}
              size='small'
              scroll={{ x: 1300, y: '45vh' }}
              loading={false}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome >
  )
}

