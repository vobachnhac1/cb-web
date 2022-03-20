/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */

import React from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import ButtonBase from '@/components/button';
const { Content, Footer } = Layout;

const ContentCustom = (props) => {
  const { type = '' } = props;
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{type}</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className='site-layout-background'
        style={{
          backgroundColor: '#FFFFFF',
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {type}
        <ButtonBase >Nhấn thử 2</ButtonBase>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Website created by CB Team
      </Footer>
    </Layout>
  );
};

export default ContentCustom;
