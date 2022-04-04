/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-04
*------------------------------------------------------- */
import { useState } from 'react'
import * as styles from './style.module.less';
require("./style.module.less");

const WheelChild = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { items } = props;
  const wheelVars = {
    '--nb-item': items.length,
    '--selected-item': selectedItem,
  };
  const spinning = selectedItem !== null ? '.spinning' : '';
  const selectItem = () => {
    if (selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * props.items.length);
      if (props.onSelectItem) {
        props.onSelectItem(selectedItem);
      }
      setSelectedItem(selectedItem);
    } else {
      setSelectedItem(null)
      setTimeout(selectItem, 500);
    }
  }
  return (
    <div className={styles["wheel-container"]}>
      <div className={styles[`wheel${spinning}`]} style={wheelVars} onClick={selectItem}>
        {items.map((item, index) => (
          <div className={styles["wheel-item"]} key={index} style={{ '--item-nb': index }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
export default WheelChild;