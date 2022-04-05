/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-04
*------------------------------------------------------- */
import { useState } from 'react'
import * as styles from './style.module.less';
require("./style.module.less");
const classNames = require("classnames");

const WheelChild = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { items } = props;
  const wheelVars = {
    '--nb-item': items.length,
    '--selected-item': selectedItem,
  };
  const spinning = selectedItem !== null ? true : false;
  const selectItem = () => {
    if (selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * props.items.length);
      setSelectedItem(selectedItem);
      if (props.onSelectItem) {
        props.onSelectItem(selectedItem);
      }
    } else {
      setSelectedItem(null)
      setTimeout(props.onSelectItem, 500);
    }
  }
  return (
    <div className={styles["wheel-container"]}>
      <div className={
        classNames({ [styles["wheel"]]: true }, { [styles["spinning"]]: spinning })} //chỗ import
        style={wheelVars}
        onClick={selectItem}>
        {items.map((item, index) => (
          <div

            className={classNames({ [styles["wheel-item"]]: true })}
            key={index} style={{ '--item-nb': index }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
export default WheelChild;