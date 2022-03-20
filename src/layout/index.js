/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import React from 'react';
import { Layout } from 'antd';
import HeaderCustom from './header';
import SliderCustom from './slider';

const LayoutCustom = (props) => {
  const { children } = props;

  return (
    <Layout style={{ flex: 1, height: '100vh' }}>
      <HeaderCustom />
      <Layout>
        <SliderCustom />
        {children}
      </Layout>
    </Layout>
  );
};

export default LayoutCustom;
