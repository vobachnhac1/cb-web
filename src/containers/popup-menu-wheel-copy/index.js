import BurgerIconcopy from "@/components/BurgerIconcopy";
require("./styles.less");
import * as Message from "@/components/message";
const classNames = require("classnames");
import { useState } from "react";
import moment from "moment";
import { Tabs, Card } from "antd";
const { TabPane } = Tabs;
import { useSelector, useDispatch } from "react-redux";
import { getters as gettersWheelPopupMenu } from "@/redux/wheel-popup-menu";
import { actions as actionWheelPopupMenu } from "@/redux/wheel-popup-menu";

export default function PopupMenu(props) {
	const {
		callback,
		wheelId = "",
		userInfo = {},
		flagOpen = false,
		btnNameClick = {},
	} = props;
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	// Lịch sử trúng của khách hàng của vòng quay hiện tại
	const listReward = useSelector(
		gettersWheelPopupMenu.getStateListReward
	) || [1];
	// // Danh sách giải trúng đã được cài không  có data hình ảnh của vòng quay hiện tại
	const listWheelDetailById =
		useSelector(gettersWheelPopupMenu.getStateListWheelDetailById) || [];
	// // Danh sách khách hàng đã trúng giải của quay vong hiện tại
	const listCustomer =
		useSelector(gettersWheelPopupMenu.getStateListCustomer) || [];

	const onClickBurgerIcon = async () => {
		const params = {
			wheelId: wheelId,
			systemCode: 1,
			userId: userInfo.user_id,
			numCustomer: 20,
			numReward: 20,
		};

		callback({ flagOpen: false });
		if (!open) {
			const result = await dispatch(
				actionWheelPopupMenu.getAllDataHistory(params)
			);
			if (!result) {
				Message.Error("Thông Báo", "Hiển thị lịch sử thất bại");
			}
		}

		setOpen(!open);
	};

	//setOpen(!open)
	return (
		<>
			{/* 'reward-list', */}

			<div
				className={classNames(
					{ "reward-list": true },
					{ "show": flagOpen }
				)}
			>
				{/* tabs info */}
				<div className={"items"}>
					<BurgerIconcopy
						onClick={onClickBurgerIcon}
						open={flagOpen}
					/>
					<Card className={"reward-list-card"} title={btnNameClick.vnsbName} bordered={false}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</div>
			</div>
		</>
	);
}
