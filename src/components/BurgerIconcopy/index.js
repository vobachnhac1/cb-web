import React, { useEffect } from "react";
// import styles from './style.module.less';
require("./style.less");
const classNames = require("classnames");

export default ({ open, ...props }) => {
	return (
		<div
			className={open ? ["burger-menu open"] : ["burger-menu"]}
			{...props}
		>
			<img className="burger-menu-icon" src="/images/wheel/icon_wheel_vector.png" />
		</div>
	);
};
