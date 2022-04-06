/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-04
*------------------------------------------------------- */
import { useState } from 'react';
import WheelChild from '@/components/WheelChild';
require("./style.module.less");
const classNames = require("classnames");

import * as styles from './style.module.less';

const arrDisplay = [
  {
    value: 'Một',
    url: "/images/reward/reward0.png"
  }, {
    value: 'Hai',
    url: "/images/reward/reward1.png"
  }, {
    value: 'Ba',
    url: "/images/reward/reward2.png"
  }, {
    value: 'Bốn',
    url: "/images/reward/reward3.png"
  }, {
    value: 'Năm',
    url: "/images/reward/reward4.png"
  }, {
    value: 'Sáu',
    url: "/images/reward/reward5.png"
  }, {
    value: 'Bảy',
    url: "/images/reward/reward6.png"
  }, {
    value: 'Tám',
    url: "/images/reward/reward7.png"
  }, {
    value: 'Chín',
    url: "/images/reward/reward8.png"
  }, {
    value: 'Mười',
    url: "/images/reward/reward9.png"
  }, {
    value: 'Mười Một',
    url: "/images/reward/reward0.png"
  }, {
    value: 'Mười Hai',
    url: "/images/reward/reward1.png"
  }, {
    value: 'Mười Ba',
    url: "/images/reward/reward2.png"
  }, {
    value: 'Mười Bốn',
    url: "/images/reward/reward3.png"
  },

]
export default function Wheel() {
  const [places, setPlaces] = useState(arrDisplay);

  //'Mười Một', 'Mười Hai', 'Mười Ba', 'Mười Bốn', 'Mười Lăm', 'Mười Sáu', 'Mười Bảy', 'Mười Tám', 'Mười Chín', 'Hai Mươi']);
  const onSelectItem = (value) => {
    console.log('Wheel value: ', value);
  }
  return (
    <div className={styles['App']}>
      <WheelChild items={places} onSelectItem={onSelectItem} />
      {/* <div className={classNames({ [styles["wheel-shelf-head"]]: true })} />
      <div className={classNames({ [styles["wheel-shelf-midle"]]: true })} />
      <div className={classNames({ [styles["wheel-shelf-footer"]]: true })} /> */}
    </div>
  )

}

