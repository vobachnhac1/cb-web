/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-04
*------------------------------------------------------- */
import { useEffect, useState } from 'react';
import WheelChild from '@/components/WheelChild';
require("./style.module.less");
require('./tabsStyle.less');
const classNames = require("classnames");
// khai báo store
import { useSelector, useDispatch } from 'react-redux';
import { actions as actionsEventWheel } from '@/redux/event-wheel';
import { getters as gettersEventWheel } from '@/redux/event-wheel';
import * as styles from './style.module.less';
import __ from 'lodash';
import * as Message from '@/components/message';
import { useRouter } from 'next/router';
import { PathTitle } from "@/constants/url-name";
import Header from '@/components/Head';
// pop up menu
import BurgerIcon from '@/components/BurgerIcon';
import Menu from '@/components/Menu'
import Popup from "reactjs-popup";
import PopupMenu from '@/containers/popup-menu-wheel'
import { Tabs } from "antd";
const { TabPane } = Tabs;


const stylesCpx = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "40px"
};


const contentStyle = {
  // backgroundImage:`url(${car})` url("/images/happynewyear.jpg")
  backgroundImage: `url(${"/images/reward_bg.jpg"})`,
  backgroundSize: `100% 100%`,
  backgroundRepeat: `no-repeat`,
  // width: "80%",
  border: "none",
  width: `500px`,
  height: `70vh`,
  overflow: `auto`,
  padding: `2rem`,
  opacity: `0.9`,
};

export default function DisplayWheel(props) {
  /// url mẫu http://localhost:3000/wheel/000001000012-0000000001
  const router = useRouter()
  const { manager = null, arrItem = [] } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [path, setPath] = useState(router.pathname);
  const [invalid, setInvalid] = useState(false);
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
  // const [userInfo, setUserInfo] = useState({
  //   wheel_type: null,
  //   wheel_id: null,
  //   rules_id: null,
  //   usr_info: {
  //     user_id: null,
  //     num: 0
  //   },
  // });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!manager) {
      initPage();
    }
    if (path.includes("/wheel/", 0)) {
      setPath('/wheel/')
    }
  }, []);


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

  const initPage = async () => {
    const locationUrl = window.location;
    const params = locationUrl.pathname;
    const data = params.split('/');
    if (data && data.length > 2) {
      if (__.last(data).length == 23 && data[1] == 'wheel') {
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
  }

  const onSelectItem = (value) => {
    setSelectedItem(value)
  }

  return (
    <div className={styles['App']} style={{
      backgroundImage: null
    }}>
      <Header title={PathTitle[`${path}`]} />

      {!manager&&<PopupMenu /> }





      {!invalid && <WheelChild arrItem={arrItem} onSelectItem={onSelectItem} selectedItem={selectedItem} roles={manager} />}

    </div>
  )
}

