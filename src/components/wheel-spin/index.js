import { Button } from "antd";
import React, { useEffect, useState } from "react";
// require("./styles.less");
const classNames = require("classnames");

// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsEventWheel } from '@/redux/event-wheel';
import { getters as gettersEventWheel } from '@/redux/event-wheel';
import * as Message from '@/components/message';
import ModalComfirmReward from '@/containers/modal-comfirm-reward';
import { STATE_WHEEL } from "@/constants/common";

const MainWheel = (props) => {
  const { arrItem = [], roles = null } = props;
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const places = !roles ? useSelector(gettersEventWheel.getContentReward) : (arrItem || []);
  const isProcessing = useSelector(gettersEventWheel.getProccessing);
  const eventInfo = useSelector(gettersEventWheel.getEventInfo);
  const [rewardBody, setRewardBody] = useState(null);
  const stateWheel = useSelector(gettersEventWheel.getStateWheel);

  const onPress = async () => {
    let keyHost = 0;
    Message.Info("Thông Báo", "Bắt đầu quay");
    await dispatch(actionsEventWheel.setProcessing(true));
    let rsReward = null;
    if (!roles) {
      if (eventInfo) {
        rsReward = await dispatch(actionsEventWheel.getRewardOfWheel());
        setRewardBody(rsReward);
        if (rsReward?.success) {
          if (selectedItem === 0) {
            setAnimation(true)
            setSelectedItem(places.length - (parseInt(rsReward.no)));
            // props.onSelectItem(places.length - (parseInt(rsReward.no)));
            let myAudio = new Audio('/sound/demo3s.wav');
            myAudio.load();
            myAudio.play();
          } else {
            setup();
          }
        } else {
          Message.Warning("Thông Báo", rsReward?.message);
          setup();
        }
      }
    } else {
      const randomItem = Math.floor(Math.random() * places.length);
      if (selectedItem === 0) {
        setAnimation(true)
        setSelectedItem(places[randomItem].key);
        keyHost = places[randomItem].key
        let myAudio = new Audio('/sound/demo3s.wav');
        myAudio.load();
        myAudio.play();
      } else {
        setup();
      }
    }
    setTimeout(async () => {
      await dispatch(actionsEventWheel.setProcessing(false));
    }, 3000);
  }
  ///
  useEffect(() => {
    dispatch(actionsEventWheel.setProcessing(false));
  }, []);

  const activeEvent = () => {
    if (isProcessing.status) {
      Message.Warning("Thông Báo", "Đang lấy kết quả vòng quay");
      return;
    };
    if(STATE_WHEEL.START != stateWheel) {
      Message.Warning("Thông Báo", "Vòng quay đã quá hạn hoặc chưa được áp dụng");
      return;
    };

    if (selectedItem != null) {
      setup();
    }
    setTimeout(async () => {
      onPress();
    }, 50);
  }

  const onReset = () => {
    setRewardBody(null);
    setAnimation(false);
    setSelectedItem(0);
  }
  const setup = () => {
    setRewardBody(null);
    setAnimation(false);
    setSelectedItem(0);
  }
  const returnPositionInit = () => {
    if (places.length == 6) {
      const rs = 0;
      return rs;
    } else if (places.length == 8) {
      const rs = (360 / places.length) - (360 / places.length) / 2;
      return rs;
    } else if (places.length == 10) {
      const rs = (360 / places.length);
      return rs;
    } else if (places.length == 12) {
      const rs = (360 / places.length) + (360 / places.length) / 2;
      return rs;
    } else if (places.length == 14) {
      const rs = (360 / places.length) + (360 / places.length);
      return rs;
    } else {
      return 0;
    }
  }

  return (
    <>
      {animation && <ModalComfirmReward onInit={animation} data={rewardBody} callback={onReset} />}
      <div className="colContainer"
        style={{
          '--set-margin-left': !roles ? 2 : 6,
          '--position-init': `${returnPositionInit()}deg`,
        }}>
        {/* <div className="rowContainer"> */}
        <div className="containerSpin">
          <div className={classNames({ 'active-spin': animation }, { 'arrow': true })} >
            <div className="image-border" />
            <div className="image-row" />
          </div> 
          <div
            className={classNames({ 'spinning': animation }, { 'pieContainer': true })}
            style={{
              '--selected': selectedItem,
              '--num-item': places.length
            }}>
            <div className="pieBackground" />
            <div className="pieBackground1" />
            {
              places.map((item, index) => {
                const rotate = 360 / places.length;
                const position = ((index + 1) * rotate) + 'deg';
                return (
                  <div key={item.no}
                    className="hold"
                    style={{ transform: `rotate(${position})` }}
                  >
                    <div
                      className="pie"
                      style={{
                        '--wheel-color': item.wheel_color,
                        "--rotate": rotate + 'deg',
                      }}>
                      <div className={classNames({ [`content${places.length}`]: true })}>{item.segment_name}</div>
                      <div className={classNames({ "pie-image": true }, { [`pie-img${places.length}`]: true })}
                        style={{ '--url': `url(${item.imgBase64})` }} />
                    </div>
                  </div>);
              })
            }
          </div>
          <div className="button-custom">
            <Button
              onClick={activeEvent}
              type="primary">
              Nhấn Quay
            </Button>
          </div>
        </div>
      </div>

    </>
  )
}


export default MainWheel 