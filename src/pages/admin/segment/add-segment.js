/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import { useState,useEffect } from 'react';

import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import { Form,Input,Button,DatePicker,Layout,Col ,Card,Select } from 'antd';
import moment from 'moment';


// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionTopic } from '@/redux/topic';
import { getters as gettersTopic} from '@/redux/topic';

const {  Content } = Layout;

export default function Segment() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const listTopic = useSelector(gettersTopic.getStateLoadPageTopic) || [];

  useEffect(() => {
      initPage(); // chjay 1 lần duy nhất
    }, [])

    // useEffect(() => {
    //   // chạy khi có sụ thay đổi của listTopic
    // }, [listSegment])

    const initPage = async () => {
      await dispatch(actionTopic.searchTopic()); 
    }

    const onsubmitSaveSegment = async(values)=>{
      try {
            setLoading(true);
            // const result = await dispatch(actions.loginAdmin(values));

            // if(result){
            //   Router.push('/home');
            // }
            console.log('value form Segment',values)
            
          } finally {
            setLoading(false);
          }
    }

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
                    onFinish={onsubmitSaveSegment}
                  >
                    
                    <Form.Item name="segment_id" label="Mã kết quả trúng thưởng">
                      <Input />
                    </Form.Item>
                    <Form.Item name="topic_id" label="Chủ đề">
                      <Select>
                        {listTopic.map((Item) => (
                          <Select.Option value={Item.topic_id}>{Item.topic_name}</Select.Option>
                          // <option value={option.value}>{option.label}</option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item  name="segment_name" label="Tên kết quả trúng thưởng">
                      <Input />
                    </Form.Item>
                    <Form.Item name="segment_color" label="Màu sắc hiển thị">
                      <Input />
                    </Form.Item>
                    <Form.Item name="inactived_date" label="Ngày hết hiệu lực">
                      <DatePicker />
                    </Form.Item>
                  
                
                    <Form.Item>
                      <Button type="primary"  htmlType="submit" loading={loading}>Save</Button>

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

