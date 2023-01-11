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
					{ show: flagOpen }
				)}
			>
				{/* tabs info */}
				<div className={"items"}>
					<BurgerIconcopy
						onClick={onClickBurgerIcon}
						open={flagOpen}
					/>
					<Card
						className={"reward-list-card"}
						title={btnNameClick.vnsbName}
						bordered={false}
					>
						{btnNameClick.flagMinibaner ? (
							<img
								className={"reward-list-card__img-header"}
								src="/images/wheel/icon_wheel_popup_menu.png"
							/>
						) : (
							""
						)}

						<div className={"reward-list-card__content"}>
							{/* Nội dung thể lệ chương trình  Rules*/}
							{btnNameClick.btnName === "Rules" ? (
								<div
									className={
										"reward-list-card__content--rules"
									}
								>
									<h1
										style={{
											textAlign: "center",
										}}
									>
										Chương trình CBBank Vòng quay Loyalty
									</h1>
									<h3>1. Giới thiệu chung về chương trình</h3>
									<p>
										<span
											style={{
												fontWeight: "700",
											}}
										>
											“Vòng quay Loytalty”
										</span>{" "}
										là chương trình tích điểm quay thưởng để
										tri ân các khách hàng thân thiết của
										CBBank. Theo đó, từ ngày dd/mm/yyyy,
										khách hàng thực hiện giao dịch trên app
										CBWay sẽ được tự động tích lũy điểm
										thưởng (CBCoin) để đổi thành lượt quay
										sử dụng trong chương trình.
									</p>
									<h3>
										2. Giao dịch thỏa thích, tích điểm dễ
										dàng:
									</h3>
									<p
										style={{
											fontWeight: "700",
										}}
									>
										Các giao dịch/sản phẩm được tích điểm
										bao gồm: Tiền gửi, tiền vay, thẻ. thanh
										toán, các dịp sự kiện sinh nhật CBBank,
										sinh nhật khách hàng,..
									</p>
									<p>
										<span
											style={{
												fontWeight: "700",
											}}
										>
											Thời hạn hiệu lực điểm CB Coin:
										</span>
										CB Coin tích lũy năm Y sẽ có giá trị đổi
										lượt quay đến hết ngày 31/12 năm Y+1;
										Sau thời gian này, số điểm tích lũy
										trong năm Y mà khách hàng không dùng hết
										sẽ hết giá trị và bị thu hồi.
									</p>
									<p>
										Thời gian nhận điểm CB Coin:{" "}
										<span
											style={{
												fontWeight: "700",
											}}
										>
											Sau 01 ngày giao dịch
										</span>
										của khách hàng được ghi nhận vào hệ
										thống của CBBank.
									</p>
									<p>Cụ thể (*):</p>
									<p>
										<table>
											<tr>
												<th>
													Giao dịch/ Sản phẩm tích
													điểm
												</th>
												<th>Số điểm tích lũy</th>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Thanh toán Online bằng
														CBWay{" "}
													</span>
													(điện nước, truyền hình viễn
													thông, vé tàu, vé máy bay,
													nạp tiền điện thoại,...)
												</td>
												<td>
													100.000 VNĐ = 10 CB Coin
												</td>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Tiền gửi tiết kiệm
														Online{" "}
													</span>
													(Kỳ hạn 6-12 tháng, tối
													thiểu 10 triệu đồng)
												</td>
												<td>
													10.000.000 VNĐ = 1.000 CB
													Coin
												</td>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Tiền gửi tích lũy Online
													</span>
												</td>
												<td>
													Số dư bình quân 10.000.000
													VNĐ/Tháng = 1.000 CB Coin
												</td>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Chuyển tiền từ tài khoản
													</span>
													(trong nước và quốc tế)
												</td>
												<td>
													100.000 VNĐ = 1.000 CB Coin
												</td>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Giao dịch nhận tiền kiều
														hối
													</span>
												</td>
												<td>
													10.000.000 VNĐ = 1.000 CB
													Coin
												</td>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Mở tài khoản
													</span>
												</td>
												<td>1.000 CB Coin</td>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Giới Thiệu khách hàng
														CBWay mới
													</span>
												</td>
												<td>
													1 KH mới = 1.000 CB Coin
												</td>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Ưu đãi riêng dành cho
														khách hàng cao cấp của
														CBBank
													</span>
												</td>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Nhân đôi{" "}
													</span>
													số CB Coin áp dụng với giao
													dịch thanh toán hóa đơn,
													tiết kiệm online và chuyển
													tiền trong tháng sinh nhật
													của Khách hàng cao cấp
													CBBank
												</td>
											</tr>
											<tr>
												<td>
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Giao dịch trong tuần lễ
														sinh nhật CBBank
													</span>
												</td>
												<td>
													{" "}
													<span
														style={{
															fontWeight: "700",
														}}
													>
														Nhân đôi
													</span>{" "}
													số CB Coin áp dụng với giao
													dịch thanh toán hóa đơn,
													tiết kiệm online, và chuyển
													tiền trong tuần sinh nhật
													của CBBank
												</td>
											</tr>
										</table>
									</p>
									<p>
										(*) Danh mục các sản phầm/giao dịch được
										tích điểm năm 2022. CBBank sẽ thông báo
										danh mục tích điểm định kỳ vào Quý I
										hằng năm hoặc khi có sự thay đổi.
									</p>
									<h3>3. Quà tặng đa dạng:</h3>
									<p>
										Tham gia Vòng quay, khách hàng có cơ hội
										nhận được những{" "}
										<span style={{ fontWeight: "600" }}>
											phần quà hấp dẫn
										</span>{" "}
										như: Thẻ nạp điện thoại; Tiền mặt; Hoàn
										tiền hoặc mua sắm trực tuyến với hàng
										ngàn mặt hàng đến từ các thương hiệu uy
										tín. CBBank sẽ thường xuyên bổ sung kho
										quà để khách hàng có thêm nhiều lựa chọn
										và trải nghiệm mới mỗi ngày.
									</p>
									<p>
										<h4 style={{ fontWeight: "600" }}>
											Cơ chế đổi điểm:
										</h4>
										<p>1000 điểm CB Coin = 1 lượt quay</p>
										<h4>
											Chi tiết thể lệ chương trình Vòng
											quay Loytalty, quý khách xem{" "}
											<a href="#">tại đây.</a>
										</h4>
										<p>
											Kính chúc Quý khách có những trải
											nghiệm thú vị và nhận được những ưu
											đãi bất ngờ khi giao dịch tích điểm
											cùng Vòng quay Loyalty!
										</p>
										<p>
											Để được tư vấn, hỗ trợ Quý khách vui
											lòng liên hệ Tổng đài CSKH CBBank:
											19001816.
										</p>
									</p>
								</div>
							) : (
								""
							)}
							{/* Nội dung danh sách quà tặng listReward */}
							{btnNameClick.btnName === "listReward" ? (
								<div
									className={
										"reward-list-card__content--list-reward"
									}
								>
									<p>
										Với tổng giải thưởng lên đến hơn{" "}
										<span style={{ fontWeight: "600" }}>
											150 triệu đồng. {""}
										</span>{" "}
										Khách hàng tham gia chương trình Vòng
										quay Loyalty có cơ hội nhận các giải
										thưởng sau:
									</p>
									<ul>
										<li>
											<img src="/images/popup/icon_wheel_WrappedGift.png" />{" "}
											04 Giải đặc biệt:{" "}
											<span style={{ fontWeight: "600" }}>
												{" "}
												1.000.000 ₫
											</span>{" "}
											/ giải
										</li>
										<li>
											<img src="/images/popup/icon_wheel_WrappedGift.png" />{" "}
											56 Giải nhất:{" "}
											<span style={{ fontWeight: "600" }}>
												500.000 ₫
											</span>
											/ giải
										</li>
										<li>
											<img src="/images/popup/icon_wheel_WrappedGift.png" />{" "}
											280 Giải nhì:{" "}
											<span style={{ fontWeight: "600" }}>
												200.000 ₫
											</span>
											/ giải
										</li>
										<li>
											<img src="/images/popup/icon_wheel_WrappedGift.png" />{" "}
											560 Giải ba:{" "}
											<span style={{ fontWeight: "600" }}>
												100.000 ₫
											</span>
											/ giải
										</li>
										<li>
											<img src="/images/popup/icon_wheel_WrappedGift.png" />{" "}
											1120 Giải tư:{" "}
											<span style={{ fontWeight: "600" }}>
												10.000 ₫
											</span>
											/ giải
										</li>
										<li>
											<img src="/images/popup/icon_wheel_WrappedGift.png" />{" "}
											Thêm lượt quay
										</li>
										<li>
											<img src="/images/popup/icon_wheel_WrappedGift.png" />{" "}
											Chúc bạn may mắn lần sau
										</li>
									</ul>
								</div>
							) : (
								""
							)}
							{/* Nội dung Lịch sử trúng thưởng listWinner */}
							{btnNameClick.btnName === "listWinner" ? (
								<div
									className={
										"reward-list-card__content--list-winner"
									}
								>
									<ul>
										<li>
											<p>
												<span>+1.000 coin</span>
											</p>
										</li>
									</ul>
								</div>
							) : (
								""
							)}
							{/* Nội dung Lịch sử tích điểm listScore*/}
							{btnNameClick.btnName === "listScore" ? (
								<div
									className={
										"reward-list-card__content--rules"
									}
								></div>
							) : (
								""
							)}
						</div>
					</Card>
				</div>
			</div>
		</>
	);
}
