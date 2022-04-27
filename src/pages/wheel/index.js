/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-04
*------------------------------------------------------- */
import { useEffect, useState } from 'react';
import WheelChild from '@/components/WheelChild';
require("./style.module.less");
const classNames = require("classnames");
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsEventWheel } from '@/redux/event-wheel';
import { getters as gettersEventWheel } from '@/redux/event-wheel';
import * as styles from './style.module.less';

export default function Wheel() {
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    await dispatch(actionsEventWheel.getContentWheel());
  }
  const onSelectItem = (value) => {
    setSelectedItem(value)
  }
  return (
    <div className={styles['App']}>
      <WheelChild onSelectItem={onSelectItem} itemNumber={selectedItem} />
    </div>
  )

}

