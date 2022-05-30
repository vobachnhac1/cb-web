import BurgerIcon from '@/components/BurgerIcon';
require("./styles.less");
const classNames = require("classnames");
import { useState } from 'react'
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default function PopupMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 'reward-list', */}
      <BurgerIcon onClick={() => setOpen(!open)} open={open} />
      <div className={classNames({ 'reward-list': true }, { 'show': open },)} >

        {/* tabs info */}
        <div className={'items'}>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Lịch sử trúng" key="1">
              <ul className={'items-subs'}>
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
              <ul className={'items-subs'}>
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
              <ul className={'items-subs'}>
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


      </div >
    </>


  )


}