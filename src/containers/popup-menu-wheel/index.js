import BurgerIcon from '@/components/BurgerIcon';
import Menu from '@/components/Menu'
import Popup from "reactjs-popup";
import { Tabs } from "antd";
const { TabPane } = Tabs;


//style
const stylesCpx = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "40px"
};


const contentStyle = {
  backgroundImage: `url(${"/images/reward_bg.jpg"})`,
  backgroundSize: `100% 100%`,
  backgroundRepeat: `no-repeat`,
  border: "none",
  width: `500px`,
  height: `70vh`,
  overflow: `auto`,
  padding: `2rem`,
  opacity: `0.9`,
};

export default function PopupMenu() {
  return (
    <div style={stylesCpx}>
      <Popup
        modal
        overlayStyle={{ background: "rgba(0, 0, 0, 0.3)" }}
        contentStyle={contentStyle}
        closeOnDocumentClick={false}
        trigger={open => <BurgerIcon open={open} />}
      >
        {close => <Menu close={close} />}

        {/* tabs info */}
        <div>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Lịch sử trúng" key="1">
              <ul>
                <li><span>22/05/2022</span> - <span>Trúng giải nhất 10 triệu</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhì 5 triệu</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải may mắn</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhất 10 triệu</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhì 5 triệu</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải may mắn</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhất 10 triệu</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhì 5 triệu</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải may mắn</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhất 10 triệu</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhì 5 triệu</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải may mắn</span></li>
              </ul>
            </TabPane>
            <TabPane tab="Danh sách giải" key="2">
              <ul>
                <li><span>01</span> - <span>Giải đặc biệt 200tr</span></li>
                <li><span>02</span> - <span>Giải đặc biệt 80tr</span></li>
                <li><span>03</span> - <span>Giải đặc biệt 20tr</span></li>
                <li><span>04</span> - <span>Giải đặc biệt 10tr</span></li>
                <li><span>05</span> - <span>Giải đặc biệt 5tr</span></li>
                <li><span>06</span> - <span>Giải đặc biệt 2tr</span></li>
                <li><span>07</span> - <span>Giải đặc biệt 1tr</span></li>
                <li><span>08</span> - <span>Giải Chúc may mắn</span></li>
                <li><span>09</span> - <span>Giải Thêm lượt quay</span></li>
              </ul>
            </TabPane>
            <TabPane tab="Xếp hạng tài khoản trúng" key="3">
              <ul>
                <li><span>01</span> - <span>STK: 022551232322</span></li>
                <li><span>02</span> - <span>STK: 055636456554</span></li>
                <li><span>03</span> - <span>STK: 015854751221</span></li>
                <li><span>04</span> - <span>STK: 025488552222</span></li>
                <li><span>05</span> - <span>STK: 025488552222</span></li>
                <li><span>06</span> - <span>STK: 25488552222</span></li>
                <li><span>07</span> - <span>STK: 025488552222</span></li>
                <li><span>09</span> - <span>STK: 025488552222</span></li>
                <li><span>10</span> - <span>STK: 025488552222</span></li>
                <li><span>11</span> - <span>STK: 025488552222</span></li>
                <li><span>12</span> - <span>STK: 025488552222</span></li>
                <li><span>13</span> - <span>STK: 025488552222</span></li>
                <li><span>14</span> - <span>STK: 025488552222</span></li>
              </ul>
            </TabPane>
          </Tabs>
        </div>
      </Popup>
    </div>

  )


}