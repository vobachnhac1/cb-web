
import { Badge, Avatar } from 'antd';
import { MailOutlined } from '@ant-design/icons';
const Notification = () => {
  return (
    <Badge count={5}>
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde300' }} shape="circle" size={38} icon={<MailOutlined style={{ color: "#000000" }} />} />
    </Badge>
  )
}

export default Notification;