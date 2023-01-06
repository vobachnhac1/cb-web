/* --------------------------------------------------------
 * Author Võ Bách Nhạc
 * Email vonhac.20394@gmail.com
 * Phone 0906.918.738
 * Created: 2022-04-04
 *------------------------------------------------------- */
import { useEffect, useState } from "react";
// import WheelChild from '@/components/wheel-child';
import WheelChild from "@/components/wheel-child";
require("./styles.less");
// require('./tabsStyle.less');
const classNames = require("classnames");
// khai báo store
import { useSelector, useDispatch } from "react-redux";
import { actions as actionsEventWheel } from "@/redux/event-wheel";
import { getters as gettersEventWheel } from "@/redux/event-wheel";
import __ from "lodash";
import * as Message from "@/components/message";
import { useRouter } from "next/router";
import { PathTitle } from "@/constants/url-name";
import Header from "@/components/Head";
// pop up menu
// import PopupMenu from "@/containers/popup-menu-wheel";
import PopupMenuCopy from "@/containers/popup-menu-wheel-copy";
import { Row, Col, Typography, Button } from "antd";
const { Text } = Typography;
// img
export default function DisplayWheel(props) {
	/// url mẫu http://localhost:3000/wheel2/000001000012-0000000001
	const router = useRouter();
	const { manager = null, arrItem = [] } = props;
	const [selectedItem, setSelectedItem] = useState(null);
	const [path, setPath] = useState(router.pathname);
	const [invalid, setInvalid] = useState(false);
	const places = !manager
		? useSelector(gettersEventWheel.getContentReward)
		: arrItem || [];
	const [wheelId, setWheelId] = useState("");
	const [userInfo, setUserInfo] = useState({});
	const [flagOpenPopupMenu, setFlagOpenPopupMenu] = useState(false);
	const [btnNameClick, setBtnNameClick] = useState({});
	const [flagOpenBtnStart, setFlagOpenBtnStart] = useState(true);
	const getCustomerInfo = useSelector(gettersEventWheel.getCustomerInfo);

	useEffect(() => {
		checkWheelDetail();
	}, [places]);

	const checkWheelDetail = () => {
		if (!manager && (!places || places.length == 0)) {
			// Message.Warning("THÔNG BÁO", "Vòng quay chưa có giải thưởng")
			setInvalid(true);
		}
	};
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
		if (path.includes("/wheel2/", 0)) {
			setPath("/wheel2/");
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
	}, [statePage]);

	const initPage = async () => {
		const locationUrl = window.location;
		const params = locationUrl.pathname;
		const data = params.split("/");
		if (data && data.length > 2) {
			if (__.last(data).length == 23 && data[1] == "wheel2") {
				const tempInfo = __.last(data);
				const arrInfo = tempInfo.split("-");
				const wheel_info = _.head(arrInfo);
				await dispatch(
					actionsEventWheel.getContentWheel({
						wheel_id: parseInt(wheel_info.substring(6, 12)),
						rules_id: null,
						usr_info: {
							user_id: _.last(arrInfo),
							num: parseInt(wheel_info.substring(0, 6)),
						},
					})
				);
				setWheelId(parseInt(wheel_info.substring(6, 12)));
				setUserInfo({
					user_id: _.last(arrInfo),
					num: parseInt(wheel_info.substring(0, 6)),
				});

				setInvalid(false);
			} else {
				Message.Warning("THÔNG BÁO", "Đường dẫn không đúng");
				setInvalid(true);
			}
		} else {
			Message.Warning("THÔNG BÁO", "Đường dẫn không đúng");
			setInvalid(true);
		}
	};

	const onSelectItem = (value) => {
		setSelectedItem(value);
	};
	const onCangeFlagOpenPopupMenu = (btnName, vnsbName) => {
		setBtnNameClick({
			btnName: btnName,
			vnsbName: vnsbName,
		});
		setFlagOpenPopupMenu(true);
	};

	const callbackModel = (params) => {
		const { flagOpen } = { ...params };
		setBtnNameClick("");
		setFlagOpenPopupMenu(flagOpen);
	};

	return (
		<div
			className={"App"}
			style={{
				backgroundImage: null,
			}}
		>
			<Header title={PathTitle[`${path}`]} />
			{!manager && (
				<Row
					style={{
						position: "absolute",
						paddingTop: "2vh",
						height: "10vh",
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						width: "100%",
						justifyContent: "flex-end",
					}}
				>
					<Col style={{ flex: 1 }}>
						{/* <PopupMenu wheelId={wheelId} userInfo={userInfo} /> */}
						<PopupMenuCopy
							wheelId={wheelId}
							userInfo={userInfo}
							flagOpen={flagOpenPopupMenu}
							btnNameClick={btnNameClick}
							callback={callbackModel}
						/>
						<span className={"icon_LeftCircleTwoTone_custom"}>
							<img src="/images/wheel/icon_wheel_vector.png" />
						</span>
					</Col>
					<Col style={{ marginRight: "10px" }}>
						<Text className={"wheel__value"}>
							{getCustomerInfo?.totalPoint
								.toString()
								.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
						</Text>
						<Text
							className={"wheel__numbertimes"}
							style={{
								fontSize: 14,
								fontWeight: "bold",
								color: "lavender",
							}}
						>
							{getCustomerInfo?.numTimes
								.toString()
								.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
						</Text>
					</Col>
				</Row>
			)}
			{!invalid && (
				<>
					<Row
						style={{
							paddingTop: "2vh",
							height: "10vh",
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
							width: "100%",
							justifyContent: "center",
						}}
					>
						<WheelChild
							arrItem={arrItem}
							onSelectItem={onSelectItem}
							selectedItem={selectedItem}
							roles={manager}
							flagOpenWheelBanner={flagOpenBtnStart}
						/>
					</Row>
				</>
			)}
			{!manager && (
				<Row
					style={{
						// paddingTop: "2vh",
						// height: "10vh",
						// flex: 1,
						// flexDirection: "row",
						// alignItems: "center",
						// width: "100%",
						justifyContent: "center",
					}}
				>
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
										className="wheeld__btn"
										src="/images/wheel/icon_btn_start.png"
									></img>
								</button>
							) : (
								<button>
									<img
										className="wheeld__btn"
										src="/images/wheel/icon_btn_spin.png"
									></img>
								</button>
							)}
						</span>
					</Col>
					<Col
						span={24}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<span className="content_wheel__btn">
							<button
								onClick={() =>
									onCangeFlagOpenPopupMenu("Rules", "Thể lệ")
								}
							>
								<img
									className="wheeld__btn"
									src="/images/wheel/icon_btn_thele.png"
								></img>
							</button>
						</span>
						<span className="content_wheel__btn">
							<button
								onClick={() =>
									onCangeFlagOpenPopupMenu(
										"listReward",
										"Danh sách quà tặng"
									)
								}
							>
								<img
									className="wheel__btn"
									src="/images/wheel/icon_btn_dsqt.png"
								></img>
							</button>
						</span>
					</Col>
					<Col
						span={24}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
						className="footer_wheel__btn"
					>
						<span className="content_wheel__btn">
							<button
								onClick={() =>
									onCangeFlagOpenPopupMenu(
										"listWinner",
										"Lịch sử trúng thưởng"
									)
								}
							>
								<img
									className="wheel__btn"
									src="/images/wheel/icon_btn_lstt.png"
								></img>
							</button>
						</span>
						<span className="content_wheel__btn">
							<button
								onClick={() =>
									onCangeFlagOpenPopupMenu(
										"listScore",
										"Danh sách tích điểm"
									)
								}
							>
								<img
									className="wheel__btn"
									src="/images/wheel/icon_btn_lstd.png"
								></img>
							</button>
						</span>
					</Col>
				</Row>
			)}
		</div>
	);
}
