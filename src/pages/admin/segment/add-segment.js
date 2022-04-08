/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import { useState } from 'react';

import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { useDispatch,useSelector } from 'react-redux';
import { actions,getters } from '@/redux/global'
import { Form,Input,Button,DatePicker,Layout,Col ,Card,Row } from 'antd';

const {  Content } = Layout;
export default function Segment() {
  return (
    <LayoutHome>
         <Col style={{ marginBottom: 30 }}>
          <Card
              headStyle={{ fontSize: 20, color: 'rgba(255, 255, 255, 1)', fontWeight: 'bold', textAlign: 'center', backgroundColor: "rgb(3, 77, 162)" }}
              title="Thêm giải kết quả vòng quay"
              bordered={true}
              style={{ backgroundColor: '#FFFFFF' }}>
          </Card>
          <div style={{ marginTop: 20 }} />
          <Card>
            <Col span={48} style={{ marginTop: 10 }}>
                <div style={{width: '100%' }}>
      
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                  <Form
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                      size: 'default',
                    }}
                     labelAlign='left'
                    size={'default'}
                  >
                  
                    <Form.Item label="Mã kết quả trúng thưởng">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Chủ đề">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Tên kết quả trúng thưởng">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Màu sắc hiển thị">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Ngày hết hiệu lực">
                      <DatePicker />
                    </Form.Item>
                  
                
                    <Form.Item>
                      <Button type="primary">Save</Button>

                      <Button style={{
                        margin: '0 8px',
                        }}>
                        cancle
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Content>

              <div>
          

          </div>
        </div>
            </Col>
          </Card>
        </Col>
     
    </LayoutHome>
  )
}

