/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07 
*------------------------------------------------------- */
import { useEffect, useState } from 'react';
require("./styles.less");
import { Row, Col, Select, Button, DatePicker } from 'antd';
import * as styles from './styles.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { Line, Pie } from '@ant-design/plots';
const { Option } = Select;

// store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsDashboard } from '@/redux/dashboard';
import { getters as gettersDashboard } from '@/redux/dashboard';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

export default function Monitor() {
  const dispatch = useDispatch();
  const [isInit, setIsInit] = useState('init');
  const [isRecievedPercent, setIsRecievedPercent] = useState('percent');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('2022');
  const [theWheel, setTheWheel] = useState(null);
  const list_dwm = useSelector(gettersDashboard.getStateMonitorRealtime);
  const list_init = useSelector(gettersDashboard.getStateMonitorDWM);
  const recieved_total = useSelector(gettersDashboard.getStateMonitorRewardRecievedStateTotal);
  const list_recieved = useSelector(gettersDashboard.getStateMonitorRewardRecieved);
  const listWheelRule = useSelector(gettersRules.getListWheelRule) || [];


  useEffect(() => {
    initPage()
  }, []);

  const initPage = async () => {
    await dispatch(actionsRules.getWheelScreenRules());
    const date = new Date();
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    await dispatch(actionsDashboard.getRewardWithDWM({
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }));
    await dispatch(actionsDashboard.getRewardbyWheelId({
      wheel_id: null
    }));
    await dispatch(actionsDashboard.getRewardRecievedBytime({
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      wheel_id: null
    }));
  }

  // Chức năng hiển thị cơ cấu giải thưởng/ tỉ lệ giải thưởng
  const handleChange = (value) => {
    setIsInit(value);
  }
  
  const renderOption = () => {
    return (
      <Select defaultValue={isInit} value={isInit} style={{ width: 150 }} onChange={handleChange}>
        <Option value="init">Khởi tạo</Option>
        <Option value="generate">Áp dụng quy tắc</Option>
      </Select>
    )
  };

  // Chức năng hiển thị lịch sử trúng thưởng
  const handleChangeModeViewRecieved = (value) => {
    setIsRecievedPercent(value)
  }
  const renderModeViewRecieved = () => {
    return (
      <Select defaultValue={isRecievedPercent} value={isRecievedPercent} style={{ width: 150 }} onChange={handleChangeModeViewRecieved}>
        <Option value="percent">Phần trăm</Option>
        <Option value="normal">Số</Option>
      </Select>
    )
  }

  // function of Line
  const renderMonth = () => {
    return (
      <Select defaultValue={month} value={month} style={{ width: 75 }} onChange={handleChangeMonth}>
        <Option value="1">01</Option>
        <Option value="2">02</Option>
        <Option value="3">03</Option>
        <Option value="4">04</Option>
        <Option value="5">05</Option>
        <Option value="6">06</Option>
        <Option value="7">07</Option>
        <Option value="8">08</Option>
        <Option value="9">09</Option>
        <Option value="10">10</Option>
        <Option value="11">11</Option>
        <Option value="12">12</Option>
      </Select>
    )
  }
  const handleChangeMonth = (value) => {
    setMonth(value);
  }
  const renderYear = () => {
    return (
      <Select defaultValue={year} value={year} style={{ width: 75 }} onChange={handleChangeYear}>
        <Option value="2020">2020</Option>
        <Option value="2021">2021</Option>
        <Option value="2022">2022</Option>
        <Option value="2023">2023</Option>
        <Option value="2024">2024</Option>
        <Option value="2025">2025</Option>
        <Option value="2026">2026</Option>
        <Option value="2027">2027</Option>
        <Option value="2028">2028</Option>
        <Option value="2029">2029</Option>
        <Option value="2030">2030</Option>
      </Select>
    )
  }
  const handleChangeYear = (value) => {
    setYear(value);
  }
  const onSearch = async () => {
    const param = {
      wheel_id: theWheel ? theWheel : listWheelRule[0].wheel_id,
      month: month,
      year: year,
    }

    await dispatch(actionsDashboard.getRewardbyWheelId(param));
    await dispatch(actionsDashboard.getRewardWithDWM(param));
    await dispatch(actionsDashboard.getRewardRecievedBytime(param));
  }
  const onChangeSelectWheel = (value) => {
    setTheWheel(value)
  }

  // config hiển thị monitor
  const configLine = {
    data: list_dwm,
    height: 300,
    xField: 'created_date',
    yField: 'total_record',
    label: {},
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    point: {
      size: 3,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 1,
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  const configWithWheelId = {
    appendPadding: 20,
    data: list_init,
    angleField: isInit == 'init' ? 'percent_init' : 'percent_after_generate',
    colorField: 'segemnt_name',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}%',
      color: 'black',
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'black',
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 16
        },
        content: isInit == 'init' ? 'Cơ cấu giải thưởng' : 'Tỉ lệ trúng thưởng',
      },
    },
  };

  const configWithTime = {
    appendPadding: 20,
    data: list_recieved,
    angleField: isRecievedPercent == 'percent' ? 'percent' : 'total',
    colorField: 'status',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: isRecievedPercent == 'percent' ? '{value}%' : '{value}',
      color: 'black',
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'black',
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 16
        },
        content: 'Tổng số giải\nđã trao\n' + recieved_total.total,
      },
    },
  };

  return (
    <LayoutHome >
      <Row>
        <Row style={{ marginRight: 10 }}>
          <div style={{ marginRight: 10, width: 100 }}>
            <p style={{ fontWeight: 'bold' }}>Tên vòng quay: </p>
          </div>
          <Select
            // allowClear
            placeholder="Tên vòng quay"
            style={{ width: 200 }}
            defaultValue={null}
            value={theWheel}
            onChange={onChangeSelectWheel}
          >
            {listWheelRule.map((item, key) => (
              <Select.Option value={item.wheel_id} key={key}> {item.wheel_name}</Select.Option>
            ))}
          </Select>
        </Row>
        <Row style={{ marginRight: 10 }}>
          <div style={{ marginRight: 10, width: 40 }}>
            <p style={{ fontWeight: 'bold' }}>Tháng: </p>
          </div>
          {renderMonth()}
        </Row>
        <Row style={{ marginRight: 10 }}>
          <div style={{ marginRight: 10, width: 40 }}>
            <p style={{ fontWeight: 'bold' }}>Năm: </p>
          </div>
          {renderYear()}
        </Row>
        <Button style={{ marginLeft: 20 }} type='primary' onClick={onSearch}>Tìm kiếm</Button>
      </Row >
      <Line {...configLine} />
      <Row style={{ marginTop: 20 }}>

        <Col span={12}>
          <Row>
            <div style={{ marginRight: 10 }}>
              <p style={{ fontWeight: 'bold' }}>Chế độ hiển thị lịch sử trúng giải: </p>
            </div>
            {renderModeViewRecieved()}
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <div style={{ marginRight: 10 }}>
              <p style={{ fontWeight: 'bold' }}>Chế độ hiển thị cơ cấu giải thưởng: </p>
            </div>
            {renderOption()}
          </Row>
        </Col>
      </Row>
      <Row span={24} >
        <Col span={12}>
          <Pie {...configWithTime} />
        </Col>
        <Col span={12}>
          <Pie {...configWithWheelId} />
        </Col>
      </Row>
    </LayoutHome >
  )
}

