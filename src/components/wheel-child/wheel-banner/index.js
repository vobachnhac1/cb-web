import React from "react";
require("./styles.less");
// require("../styles.less");
const classNames = require("classnames");

const WheelBanner = (props) => {
	const { flagShow = true } = props;
	return (
		<div
			className={classNames(
				{ "wheel-banner": true },
				{ "wheel-banner-show": !flagShow }
			)}
		>
			<div>
				<img
					className={"wheel-banner__img banner_loyalty"}
					src="/images/wheel/icon_wheel_banner_roll_loyalty.png"
				></img>
			</div>
		</div>
	);
};

export default WheelBanner;
