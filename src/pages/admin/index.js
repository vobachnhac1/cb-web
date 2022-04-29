/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import * as styles from './style.module.less';
import * as classnames from 'classnames';
import LayoutHome from '@/containers/Home';
import DisplayWheel from '@/pages/wheel/[wheel-info]';

export default function HomeWheel() {

  return (
    <LayoutHome />
    // <DisplayWheel manager={true} arrItem={[]} />
  )
}

