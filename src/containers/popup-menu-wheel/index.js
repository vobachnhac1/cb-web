import BurgerIcon from '@/components/BurgerIcon';
require("./styles.less");
import * as Message from '@/components/message';
const classNames = require("classnames");
import { useState } from 'react'
import { Tabs } from "antd";
const { TabPane } = Tabs;
import { useSelector, useDispatch } from 'react-redux';
import { getters as gettersWheelPopupMenu } from '@/redux/wheel-popup-menu';
import { actions as actionWheelPopupMenu } from '@/redux/wheel-popup-menu';

export default function PopupMenu(props) {
  const { wheelId = '', userInfo = {} } = props
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // Lịch sử trúng của khách hàng của vòng quay hiện tại
  const listReward = useSelector(gettersWheelPopupMenu.getStateListReward) || [1];
  // // Danh sách giải trúng đã được cài không  có data hình ảnh của vòng quay hiện tại
  const listWheelDetailById = useSelector(gettersWheelPopupMenu.getStateListWheelDetailById) || [];
  // // Danh sách khách hàng đã trúng giải của quay vong hiện tại
  const listCustomer = useSelector(gettersWheelPopupMenu.getStateListCustomer) || [];

  // useEffect(() => {
  //   initPage();
  // }, [])

  const onClickBurgerIcon = async () => {

    const params = {
      wheelId: wheelId,
      systemCode: 1,
      userId: userInfo.user_id,
      numCustomer: 20,
      numReward: 20,
    }

    if (!open) {
      const result = await dispatch(actionWheelPopupMenu.getAllDataHistory(params));
      if (result) {

        Message.Success("Thông Báo", "Hiển thị lịch sử thành công");
      } else {
        Message.Error("Thông Báo", "Hiển thị lịch sử thất bại");
      }

    }
    setOpen(!open)
  }

  //setOpen(!open)
  return (
    <>
      {/* 'reward-list', */}
      <BurgerIcon onClick={onClickBurgerIcon} open={open} />
      <div className={classNames({ 'reward-list': true }, { 'show': open },)} >

        {/* tabs info */}
        <div className={'items'}>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Lịch sử trúng" key="1">
              <ul className={'items-subs'}>
                <li><span>22/05/2022</span> - <span>Trúng giải nhất 10 triệu</span> - <span className={'items-subs__noti'}>Đang chờ trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhì 5 triệu</span> - <span className={'items-subs__noti'}>Đã trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải may mắn</span> - <span className={'items-subs__noti'}>Đang chờ trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhất 10 triệu</span> - <span className={'items-subs__noti'}>Đã trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhì 5 triệu</span> - <span className={'items-subs__noti'}>Đang chờ trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải may mắn</span> - <span className={'items-subs__noti'}>Đã trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhất 10 triệu</span> - <span className={'items-subs__noti'}>Đang chờ trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhì 5 triệu</span> - <span className={'items-subs__noti'}>Đã trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải may mắn</span> - <span className={'items-subs__noti'}>Đang chờ trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhất 10 triệu</span> - <span className={'items-subs__noti'}>Đã trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải nhì 5 triệu</span> - <span className={'items-subs__noti'}>Đang chờ trả thưởng</span></li>
                <li><span>22/05/2022</span> - <span>Trúng giải may mắn</span> - <span className={'items-subs__noti'}>Đang chờ trả thưởng</span></li>
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