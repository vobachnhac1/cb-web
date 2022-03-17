import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter } from '@/stores/global/actions';
import Link from 'next/link';
import { getStateLoadPage } from '@/stores/global/getter';
import { Button, Space, DatePicker, Card } from 'antd';
import { CiCircleFilled } from '@ant-design/icons';
import styles from '@/styles/Home.module.css';
import LayoutCustom from '@/layout'

function Home() {
  // const onChange = () => { };
  return (
    <div style={{ flex: 1 }}>
      {/* <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker onChange={onChange} />
        <CiCircleFilled /> */}
      <LayoutCustom />
    </div>
  );
}

export default Home;
