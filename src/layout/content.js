import React from 'react';
import { Layout, Breadcrumb } from 'antd';
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
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Website created by CB Team
      </Footer>
    </Layout>
  );
};

export default ContentCustom;
