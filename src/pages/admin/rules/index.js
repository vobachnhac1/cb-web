/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-22
*------------------------------------------------------- */
require("./style.module.less");
import LayoutHome from '@/containers/Home';
import { Button, Card, Col, Row, Space, Table, Typography, Input, Tag, DatePicker } from 'antd';
import * as Message from '@/components/message';
import ModalRules from '@/containers/modal-rules'
const { Text } = Typography;
const { RangePicker } = DatePicker;

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsRules } from '@/redux/rules';
import { getters as gettersRules } from '@/redux/rules';

import moment from 'moment';
import __ from 'lodash';
import Link from 'next/link';

export default function Rules(props) {

  return (
    <LayoutHome>
      <Col style={{ marginBottom: 30 }}>
        <ModalRules visible={visible} bodyModel={bodyModel} callback={callbackModal} />
        <Card
          headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'start', backgroundColor: "rgb(3, 77, 162)" }}
          title="PHÂN BỐ TỈ LỆ TRÚNG THƯỞNG"
          bordered={true}
          style={{ backgroundColor: '#FFFFFF', padding: 0 }}>
          <Col span={48}>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={4}>
                <Input
                  placeholder='Tên quy tắc'
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
                <Button type='primary' size='middle' style={{ width: '100%' }} onClick={addRules}>Thêm</Button>
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
              className="table_layout"
              columns={columns}
              dataSource={listRules}
              size='smalls'
              loading={loading}
              scroll={{ x: 1300, y: '48vh' }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => { }, // click row
                  onDoubleClick: event => {
                    onDoubleClick(record, rowIndex)
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

