/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-04
*------------------------------------------------------- */
import { useEffect, useState } from 'react'
import * as styles from './style.module.less';
require("./style.module.less");
const classNames = require("classnames");
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsEventWheel } from '@/redux/event-wheel';
import { getters as gettersEventWheel } from '@/redux/event-wheel';
import * as Message from '@/components/message';

const WheelChild = (props) => {
  const { itemNumber, roles = null, arrItem = [] } = props;
  const dispatch = useDispatch();
  const places = !roles ? useSelector(gettersEventWheel.getContentReward) : (arrItem || []);
  const isProcessing = useSelector(gettersEventWheel.getProccessing);
  const eventInfo = useSelector(gettersEventWheel.getEventInfo);
  const wheelVars = {
    '--nb-item': places.length,
    '--selected-item': itemNumber,
  };
  useEffect(() => {
    dispatch(actionsEventWheel.setProcessing(false));
  }, []);
  const spinning = itemNumber !== null ? true : false;
  const selectItem = async () => {
    if (isProcessing.status) {
      Message.Warning("Thông Báo", "Đang lấy kết quả vòng quay");
      return;
    };
    Message.Info("Thông Báo", "Bắt đầu quay");
    props.onSelectItem(null);
    await dispatch(actionsEventWheel.setProcessing(true));
    let rsReward;
    if (!roles) {
      if (eventInfo) {
        rsReward = await dispatch(actionsEventWheel.getRewardOfWheel());
        if (rsReward) {
          if (props.onSelectItem) {
            props.onSelectItem(places.length - (parseInt(rsReward.no)));
          }
        }
      }
    } else {
      if (props.onSelectItem) {
        const selectedItem = Math.floor(Math.random() * props.arrItem.length);
        props.onSelectItem(selectedItem);
      }
    }
    setTimeout(async () => {
      if (!roles) {
        Message.Info("Thông Báo", `Bạn nhận được kết quả: ${rsReward.segment_name} `);
      }
      await dispatch(actionsEventWheel.setProcessing(false));
    }, 4000);
  }

  return (
    <div className={styles["wheel-container"]}>
      <div className={classNames({ [styles['wheel-viewbox-border']]: true })} />
      <div className={classNames({ [styles['wheel-viewbox']]: true })} onClick={selectItem} />
      <div className={
        classNames({ [styles["wheel"]]: true }, { [styles["spinning"]]: spinning })} //chỗ import
        style={wheelVars}>
        {places.map((item, index) => (
          <div
            className={classNames({ [styles["wheel-item"]]: true })}
            key={item.no}
            style={{ '--item-nb': index, '--item-reward-url': `url('/images/reward/reward${index > 9 ? 2 : index}.png'` }}>
            <div
              className={classNames({ [styles["wheel-item-icon"]]: true })}
            />
            {item.segment_name}
          </div>
        )
        )}
      </div>
    </div>
  );
}

export default WheelChild;