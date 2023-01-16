/* --------------------------------------------------------
 * Author Võ Bách Nhạc
 * Email vonhac.20394@gmail.com
 * Phone 0906.918.738
 * Created: 2022-04-04
 *------------------------------------------------------- */
import { useEffect, useState } from "react";
require("./styles.less");
const classNames = require("classnames");
import { Row, Col } from "antd";
// khai báo store
import { useSelector, useDispatch } from "react-redux";
import { actions as actionsEventWheel } from "@/redux/event-wheel";
import { getters as gettersEventWheel } from "@/redux/event-wheel";
import * as Message from "@/components/message";
import ModalComfirmReward from "@/containers/modal-comfirm-reward";
import WheelBanner from "./wheel-banner";
import { STATE_WHEEL } from "@/constants/common";

const WheelChild = (props) => {
	const { roles = null, arrItem = [], selectedItem = null } = props;
	const dispatch = useDispatch();
	const places = !roles
		// eslint-disable-next-line react-hooks/rules-of-hooks
		? useSelector(gettersEventWheel.getContentReward)
		: arrItem || [];
	const isProcessing = useSelector(gettersEventWheel.getProccessing);
	const eventInfo = useSelector(gettersEventWheel.getEventInfo);
	const [rewardBody, setRewardBody] = useState(null);
	// test 8/1/2022
	const [flagOpenBtnStart, setFlagOpenBtnStart] = useState(true);
  const stateWheel = useSelector(gettersEventWheel.getStateWheel);
	const wheelVars = {
		"--nb-item": places.length,
		"--selected-item": selectedItem,
	};
	useEffect(() => {
		dispatch(actionsEventWheel.setProcessing(false));
	}, [roles]);

	const spinning = selectedItem !== null ? true : false;

	const setup = () => {
		setRewardBody(null);
		props.onSelectItem(null);
	};

  const activeEvent = () => {
    if (!roles && isProcessing.status) {
      Message.Warning("Thông Báo", "Đang lấy kết quả vòng quay");
      return;
    };
    if(!roles && STATE_WHEEL.START != stateWheel ) {
      Message.Warning("Thông Báo", "Vòng quay đã quá hạn hoặc chưa được áp dụng");
      return
    };
    if (selectedItem != null) {
      setup();
    }

    setTimeout(async () => {
      selectItem();
    }, 50);
  }

	const selectItem = async () => {
    let keyHost = 0;
    Message.Info("Thông Báo", "Bắt đầu quay");
    await dispatch(actionsEventWheel.setProcessing(true));
    let rsReward = null;
    if (!roles) {
			console.log('!roles: ', !roles);
      if (eventInfo) {
        rsReward = await dispatch(actionsEventWheel.getRewardOfWheel());
				console.log('rsReward: ', rsReward);
        setRewardBody(rsReward);
        if (rsReward?.success) {
          if (props.onSelectItem) {
            props.onSelectItem(places.length - (parseInt(rsReward.no)));
          } else {
            setup();
          }
        } else {
          Message.Warning("Thông Báo", rsReward?.message);
          setup(); 
        }
      }
    } else {
      const randomItem = Math.floor(Math.random() * places.length);
      if (props.onSelectItem) {
        props.onSelectItem(places[randomItem].key);
        keyHost = places[randomItem].key
      } else {
        setup();
      }
    }
    setTimeout(async () => {
      if (!roles) {
        if (rsReward) {
          console.log('rsReward: ', rsReward);
          Message.Info("Thông Báo", `Bạn nhận được kết quả: ${rsReward.segment_name} `);
					await dispatch(actionsEventWheel.setProcessing(false));

        } else {
          Message.Info("Thông Báo", `Chúc bạn may mắn lần sau!`);
					await dispatch(actionsEventWheel.setProcessing(false));
        }
        await dispatch(actionsEventWheel.setProcessing(false));
        return
      }
      if (selectedItem && places && places.length > 0) {
        Message.Info("Thông Báo", `Bạn nhận được kết quả: ${arrItem.find(item => item.key == keyHost).segment_name} `);
      }
      // dispatch(actionsEventWheel.setProcessing(false));      
    }, 4000);
  }

	const stringToColour = (str) => {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = "#";
		for (var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xff;
			colour += ("00" + value.toString(16)).substr(-2);
		}
		return colour;
	};
	const onReset = () => {
		setRewardBody(null);
		props.onSelectItem(null);
	};

	return (
		<>
			<Row className={"wheel-container"}>
				{/* flagOpenBtnStart */}
				<WheelBanner flagShow={flagOpenBtnStart}></WheelBanner>
				<Row className="wheel-container_btnstart">
					<Col
						span={24}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<span className="content_wheel__btn">
							{flagOpenBtnStart ? (
								<button
									onClick={() => setFlagOpenBtnStart(false)}
								>
									<img
										className="wheel__btnstart"
										src="/images/wheel/icon_btn_start.png"
									></img>
								</button>
							) : (
								<button onClick={activeEvent}>
									<img
										className="wheel__btnstart"
										src="/images/wheel/icon_btn_spin.png"
									></img>
								</button>
							)}
						</span>
					</Col>
				</Row>
				{spinning && (
					<ModalComfirmReward
						onInit={spinning}
						data={rewardBody}
						callback={onReset}
					/>
				)}
				{/* <div className={classNames({ "wheel-viewbox-border": true })} />
			<div
				className={classNames({ "wheel-viewbox": true })}
				onClick={activeEvent}
			/> */}

				<div
					className={classNames(
						{ wheel: true },
						{ spinning: spinning }
					)} //chỗ import
					style={wheelVars}
				>
					<div className={"wheel-viewbox-content"}>
						<div className={"wheel-viewbox-border1"}>
							<div className={"wheel-viewbox1"}></div>
						</div>
					</div>
					{places.map((item, index) => {
						return (
							<div
								className={classNames({ "wheel-item": true })}
								key={item.no}
								style={{
									"--item-nb": index,
									"--item-reward-url": `url("${item.imgBase64}")`,
									"--neutral-color": item.wheel_color,
									"--background-color": item.wheel_color,
								}}
							>
								<div
									className={classNames({
										"wheel-item-icon": true,
									})}
								/>
								{/* {item.segment_name} */}
							</div>
						);
					})}
				</div>
			</Row>
		</>
	);
};

export default WheelChild;
