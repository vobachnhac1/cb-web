/* --------------------------------------------------------
 * Author Võ Bách Nhạc
 * Email vonhac.20394@gmail.com
 * Phone 0906.918.738
 * Created: 2022-05-24
 *------------------------------------------------------- */

import React, { useEffect, useRef } from "react";
require("./styles.less");
import __ from "lodash";

export default function ModalComfirmReward(props) {
	const { data, callback } = props;
	/// url mẫu http://localhost:3000/wheel/000001000012-0000000001
	useEffect(() => {
		if (props.data) {
			setTimeout(async () => {
				onPress();
			}, 4000);
		}
	}, [data]);
	const id_modal = useRef(null);
	const onPress = () => {
		id_modal.current.classList.add("four");
	};

	const onPressOut = () => {
		id_modal.current.classList.add("out");
		id_modal.current.classList.remove("four");
		callback();
	};
	if (!data) {
		return <></>;
	}

	return (
		<div className="root">
			<div ref={id_modal} id="modal-container">
				<div className="modal-background">
					<div className="modal">
						<h1>
							{data && data.segment_value != 0
								? "Thông báo"
								: "HÃY THỬ LẠI"}
						</h1>
						<h2>{data ? data.segment_name : ""}</h2>
						<p>
							{data
								? "Số lượt còn lại: " + data.numTimes
								: "Số lượt còn lại: 0"}
						</p>
						{/* <button className='btn-comfirm' onClick={onPressOut} >Chơi tiếp</button> */}
						<button className="btn-comfirm" onClick={onPressOut}>
							Đóng
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
