import React from 'react';
import { Layout } from 'antd';
import HeaderCustom from './header';
import ContentCustom from './content';
import SliderCustom from './slider';


const LayoutCustom = (props) => {
  return (
    <Layout style={{ flex: 1, height: '100vh' }}>
      <HeaderCustom />
      <Layout >
        <SliderCustom />
        <ContentCustom />
      </Layout>
    </Layout>
  );
};

export default LayoutCustom;