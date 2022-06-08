import React, { useEffect, useState } from "react";
import MainWheel from "@/components/wheel-spin/MainWheel";
require("./styles.less");
const classNames = require("classnames");
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsEventWheel } from '@/redux/event-wheel';
import { getters as gettersEventWheel } from '@/redux/event-wheel';
import __ from 'lodash';
import * as Message from '@/components/message';
import { useRouter } from 'next/router';
import { PathTitle } from "@/constants/url-name";
import Header from '@/components/Head';
// pop up menu
import PopupMenu from '@/containers/popup-menu-wheel'

const WheelSpin = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  /// url mẫu http://localhost:3000/test/000001000012-0000000001
  const { manager = null, arrItem = [] } = props;
  const [path, setPath] = useState(router.pathname);
  const [invalid, setInvalid] = useState(false);
  const places = !manager ? useSelector(gettersEventWheel.getContentReward) : (arrItem || []);
  useEffect(() => {
    let arrItem = [];
    for (let i = 1; i <= length; i++) {
      if (i % 2 == 0) {
        arrItem.push({
          no: i + 1,
          key: i,
          wheel_color: "#337ab7",
          imgBase64: `/images/reward/reward${i}.png`,
          segment_name: "Giải thưởng" + i

        })
      } else {
        arrItem.push({
          no: i + 1,
          key: i,
          wheel_color: "white",
          imgBase64: `/images/reward/reward${i}.png`,
          segment_name: "Giải thưởng" + i

        })
      }
    }
    setList(arrItem);
    if (!manager) {
      initPage();
    }
    if (path.includes("/test/", 0)) {
      setPath('/test/')
    }
  }, []);

  const initPage = async () => {
    const locationUrl = window.location;
    const params = locationUrl.pathname;
    const data = params.split('/');
    if (data && data.length > 2) {
      if (__.last(data).length == 23 && data[1] == 'test') {
        const tempInfo = __.last(data)
        const arrInfo = tempInfo.split('-');
        const wheel_info = _.head(arrInfo);
        await dispatch(actionsEventWheel.getContentWheel({
          wheel_id: parseInt(wheel_info.substring(6, 12)),
          rules_id: null,
          usr_info: {
            user_id: _.last(arrInfo),
            num: parseInt(wheel_info.substring(0, 6)),
          }
        }));
        setInvalid(false)
      } else {
        Message.Warning("THÔNG BÁO", "Đường dẫn không đúng")
        setInvalid(true)
      }
    } else {
      Message.Warning("THÔNG BÁO", "Đường dẫn không đúng")
      setInvalid(true)
    }
  };

  const checkWheelDetail = () => {
    if (!manager && (!places || places.length == 0)) {
      // Message.Warning("THÔNG BÁO", "Vòng quay chưa có giải thưởng")
      setInvalid(true)
    }
  };

  useEffect(() => {
    checkWheelDetail();
  }, [places]);

  const [statePage, setStatePage] = useState(1);
  useEffect(() => {
    if (statePage == 1) {
      /// call chile
    } else if (statePage == 2) {
      // call  list 1
    } else if (statePage == 3) {
      // call  list 2
    }

  }, [statePage])



  return (
    <div className="App">
      <p>width: {window.innerWidth} height: {window.innerHeight}</p>
      <Header title={PathTitle[`${path}`]} />
      {!manager && <PopupMenu />}
      {!invalid && <MainWheel
        arrItem={list}
        roles={manager}
      />}
    </div>
  )
}
export default WheelSpin;