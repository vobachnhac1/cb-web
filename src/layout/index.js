import React from 'react';
import { Layout } from 'antd';
import HeaderCustom from './header';
import SliderCustom from './slider';


const LayoutCustom = (props) => {
  const { children } = props;

  return (
    <Layout style={{ flex: 1, height: '100vh' }}>
      <HeaderCustom />
      <Layout >
        <SliderCustom />
        {children}
      </Layout>
    </Layout>
  );
};

export default LayoutCustom;