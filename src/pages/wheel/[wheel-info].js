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
import __ from 'lodash';
import * as Message from '@/components/message';

export default function DisplayWheel(props) {
  /// url mẫu http://localhost:3000/wheel/000001000012-0000000001
  const { manager = null, arrItem = [] } = props;
  const [selectedItem, setSelectedItem] = useState(null);
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
  }, []);

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
      {invalid ? <div /> : <WheelChild arrItem={arrItem} onSelectItem={onSelectItem} itemNumber={selectedItem} roles={manager} />}
    </div>
  )
}

