/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-04
*------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import WheelChild from "@/components/wheel-spin";
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
const URL ='/wheel1/';
const URL_NAME ='wheel1';
const DisplayWheel = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  /// url mẫu http://localhost:3000/wheel1/000001000012-0000000001
  const { manager = null, arrItem = [] } = props;
  const [path, setPath] = useState(router.pathname);
  const [invalid, setInvalid] = useState(false);
  const [wheelId, setWheelId] = useState("")
  const [userInfo, setUserInfo] = useState({})
  const [selectedItem, setSelectedItem] = useState(null);

  const places = !manager ? useSelector(gettersEventWheel.getContentReward) : (arrItem || []);
  useEffect(() => {
    checkWheelDetail();
  }, [places]);

  const checkWheelDetail = () => {
    if (!manager && (!places || places.length == 0)) {
      // Message.Warning("THÔNG BÁO", "Vòng quay chưa có giải thưởng")
      setInvalid(true)
    }
  }
  useEffect(() => {
    // let arrItem = [];
    // let length = 14;
    // for (let i = 1; i <= length; i++) {
    //   if (i % 2 == 0) {
    //     arrItem.push({
    //       no: i + 1,
    //       key: i,
    //       wheel_color: "#337ab7",
    //       imgBase64: `/images/reward/reward${i}.png`,
    //       segment_name: "Giải thưởng thứ " + i

    //     })
    //   } else {
    //     arrItem.push({
    //       no: i + 1,
    //       key: i,
    //       wheel_color: "white",
    //       imgBase64: `/images/reward/reward${i}.png`,
    //       segment_name: "Giải thưởng thứ " + i

    //     })
    //   }
    // }
    // console.log('arrItem: ', arrItem);
    setList(arrItem);
    if (!manager) {
      initPage();
    }
    if (path.includes(URL, 0)) {
      setPath(URL)
    }
  }, []);

  const initPage = async () => {
    const locationUrl = window.location;
    const params = locationUrl.pathname;
    const data = params.split('/');
    if (data && data.length > 2) {
      if (__.last(data).length == 23 && data[1] == URL_NAME) {
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
        setWheelId(parseInt(wheel_info.substring(6, 12)))
        setUserInfo({
          user_id: _.last(arrInfo),
          num: parseInt(wheel_info.substring(0, 6)),
        })
      
        setInvalid(false)
      } else {
        Message.Warning("THÔNG BÁO", "Đường dẫn không đúng")
        setInvalid(true)
      }
    } else {
      Message.Warning("THÔNG BÁO", "Đường dẫn không đúng")
      setInvalid(true)
    }
  }

  const onSelectItem = (value) => {
    setSelectedItem(value)
  }

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
    <div className={'App'} style={{
      backgroundImage: null,
    }}>
      <Header title={PathTitle[`${path}`]} />
      {!manager && <PopupMenu 
        wheelId={wheelId}
        userInfo={userInfo}
      />}
      {!invalid && <WheelChild
        arrItem={arrItem}
        onSelectItem={onSelectItem}
        selectedItem={selectedItem}
        roles={manager}
      />}
    </div>
  )
}
export default DisplayWheel;