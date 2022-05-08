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
  const { roles = null, arrItem = [], selectedItem = null } = props;
  const dispatch = useDispatch();
  const places = !roles ? useSelector(gettersEventWheel.getContentReward) : (arrItem || []);
  const isProcessing = useSelector(gettersEventWheel.getProccessing);
  const eventInfo = useSelector(gettersEventWheel.getEventInfo);
  const wheelVars = {
    '--nb-item': places.length,
    '--selected-item': selectedItem,
  };
  useEffect(() => {
    dispatch(actionsEventWheel.setProcessing(false));
  }, []);

  const spinning = selectedItem !== null ? true : false;

  const setup = () => {
    props.onSelectItem(null)
  }

  const activeEvent = () => {
    if (isProcessing.status) {
      Message.Warning("Thông Báo", "Đang lấy kết quả vòng quay");
      return;
    };
    if (selectedItem != null) {
      setup();
    }
    setTimeout(async () => {
      selectItem();
    }, 50);
  }

  const selectItem = async () => {
    let keyHost = 0;
    Message.Info("Thông Báo", "Bắt đầu quay");
    await dispatch(actionsEventWheel.setProcessing(true));
    let rsReward;
    if (!roles) {
      if (eventInfo) {
        rsReward = await dispatch(actionsEventWheel.getRewardOfWheel());
        if (rsReward) {
          if (props.onSelectItem) {
            props.onSelectItem(places.length - (parseInt(rsReward.no)));
          } else {
            setup();
          }
        }
      }
    } else {
      const randomItem = Math.floor(Math.random() * places.length);
      if (props.onSelectItem) {
        props.onSelectItem(places[randomItem].key);
        keyHost = places[randomItem].key
      } else {
        setup();
      }
    }

    setTimeout(async () => {
      if (!roles) {
        Message.Info("Thông Báo", `Bạn nhận được kết quả: ${rsReward.segment_name} `);
        await dispatch(actionsEventWheel.setProcessing(false));
        return
      }
      if (selectedItem && places && places.length > 0) {
        Message.Info("Thông Báo", `Bạn nhận được kết quả: ${arrItem.find(item => item.key == keyHost).segment_name} `);
      }
      await dispatch(actionsEventWheel.setProcessing(false));
    }, 4000);
  }

  var stringToColour = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  return (
    <div className={styles["wheel-container"]}>
      <div className={classNames({ [styles['wheel-viewbox-border']]: true })} />
      <div className={classNames({ [styles['wheel-viewbox']]: true })} onClick={activeEvent} />
      <div className={
        classNames({ [styles["wheel"]]: true }, { [styles["spinning"]]: spinning })} //chỗ import
        style={wheelVars}>
        {places.map((item, index) => (
          <div
            className={classNames({ [styles["wheel-item"]]: true })}
            key={item.no}
            style={{
              '--item-nb': index,
              '--item-reward-url': `url("${item.imgBase64}")`,
              // '--neutral-color': stringToColour(item.segment_color),
              // '--background-color': stringToColour('#a8cef0')
            }}>
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