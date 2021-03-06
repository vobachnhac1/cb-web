/* --------------------------------------------------------
* Author Lê Quý Nam
* Email lqn1604.dev@gmail.com
* Phone 036.847.5269
* Created: 2022-04-07
*------------------------------------------------------- */
require("./styles.less");
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Popconfirm, Select, Typography, Input } from 'antd';
const { Text } = Typography;
import * as Message from '@/components/message';
import ModalSegment from '@/containers/modal-segment';
import ModalWheel from '@/containers/modal-wheel'

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionSegment } from '@/redux/segment';
import { getters as gettersSegment } from '@/redux/segment';
import { actions as actionWheel } from '@/redux/wheel';
import { getters as gettersWheel } from '@/redux/wheel';

import moment from 'moment';
import __ from 'lodash';

export default function Wheel(props) {
  const [dataSearch, setDataSearch] = useState('')
  const dispatch = useDispatch();
  const listWheel = useSelector(gettersWheel.getStateLoadPageWheel) || [];
  const [filter, setFilter] = useState({
    wheel_name: null,
  });

  // gọi 1 function rồi theo dõi nhưng thay đổi của param đó
  useEffect(() => {
    initPage(); // chjay 1 lần duy nhất
  }, [])


  const initPage = async () => {
    const paramsInit = {
      "wheel_id": 0,
      "num_segments": 0,
      "wheel_name": "string",
      "account_nbr": "string",
      "total_value": 0,
      "remain_value": 0,
      "outer_radius": 0,
      "text_fontsize": 0,
      "rotation_angle": 0,
      "inactived_date": "2022-04-09T07:38:05.782Z",
      "created_date": "2022-04-09T07:38:05.782Z",
      "datelastmaint": "2022-04-09T07:38:05.782Z",
      "is_approve": true
    }
    await dispatch(actionWheel.searchWheel(paramsInit));

  }

  const onSearch = async () => {
    const { wheel_name } = filter;
    if (__.isNil(wheel_name)) {
      initPage();
    } else {
      const result = await dispatch(actionWheel.filterWheel(filter));
      return;
    }
  }



  const handleDelete = async (record) => {
    let dataRecord = { ...record }
    const result = await dispatch(actionWheel.deleteWheelById(dataRecord));
    if (result) {
      initPage();
      Message.Success("NOTYFICATON", "DELETE WHEEL SUCCESS");
      return
    }
    Message.Error("NOTYFICATON", "DELETE WHEEL FAIL");
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'wheel_id',
      key: 'wheel_id',
      fixed: 'left',
      width: 50
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Tên vòng quay',
      dataIndex: 'wheel_name',
      key: 'wheel_name',
      fixed: 'left',
      width: 250
    },
    {
      title: 'Số kết quả',
      dataIndex: 'num_segments',
      key: 'num_segments',
      fixed: 'center',
      width: 100,

    },
    {
      title: 'Tổng giá trị giải',
      dataIndex: 'total_value',
      key: 'total_value',
      width: 250,
    },
    {
      title: 'Giá trị còn lại',
      dataIndex: 'remain_value',
      key: 'remain_value',
      width: 250,
    },
    {
      title: 'Ngày hết hiệu lực',
      dataIndex: 'inactived_date',
      key: 'inactived_date',
      width: 170,
      render: (text, record) => {
        return <p>
          {moment(text).format('YYYY-MM-DD, hh:mm:ss')}
        </p>
      }
    },

    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (text, record) => (

        <Space size="middle">
          <Button style={{ color: 'blue', borderColor: 'blue', borderWidth: 0.5 }} onClick={() => updateWheel(record)} >Edit</Button>

          {listWheel.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)} >
              <Button style={{ color: 'red', borderColor: 'red', borderWidth: 0.5 }} >Delete</Button>
            </Popconfirm>
          ) : null
          }
        </Space>
      ),
    },
  ];
  const pagination = {
    current: 1,
    pageSize: 10,
    total: 200,

  };


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


  const callbackModal = (params) => {
    setVisible(params.visible);
    initPage();
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
              <Col className="gutter-row" span={12}>
                <Input placeholder="Tên vòng quay cần tìm" value={filter.wheel_name} onChange={(event) => setFilter({ ...filter, wheel_name: event.target.value })} />
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
              columns={columns}
              dataSource={listWheel}
              size='large'
              pagination={pagination}
              loading={false}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Card>
      </Col>
    </LayoutHome>
  )
}

