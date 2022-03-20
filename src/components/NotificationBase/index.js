/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import { Badge, Avatar } from 'antd';
import { MailOutlined } from '@ant-design/icons';
const Notification = () => {
  return (
    <Badge count={5}>
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde300' }} shape='circle' size={38} icon={<MailOutlined style={{ color: '#000000' }} />} />
    </Badge>
  );
};

export default Notification;