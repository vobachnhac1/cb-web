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
import { Footer } from 'antd/lib/layout/layout';

const LayoutCustom = (props) => {
  const { children } = props;

  return (
    <Layout style={{ flex: 1, height: '100vh' }}>
      <HeaderCustom />
      <Layout>
        <SliderCustom />
        <Layout style={{ padding: 16, flexDirection: 'column', justifyContent: 'space-between' }}>
          {children}
          <Footer style={{ textAlign: 'center', fontWeight: 'bold', height: 50 }}>
            <span>-----------  Website designed by CB Team -----------</span>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutCustom;
