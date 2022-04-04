/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-04
*------------------------------------------------------- */
import { useState } from 'react';
import WheelChild from '@/components/WheelChild';
require("./style.module.less");

import * as styles from './style.module.less';

export default function Wheel() {


  const [places, setPlaces] = useState(['Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas', 'Soup']);
  const onSelectItem = (value) => {
    console.log('Wheel value: ', value);
  }
  return (
    <div className={styles['App']}>
      <h1>What should you eat today?</h1>
      <WheelChild items={places} onSelectItem={onSelectItem} />
    </div>
  )

}

