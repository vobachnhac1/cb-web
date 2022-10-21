
import React, { useEffect } from "react";
// import styles from './style.module.less';
require("./style.less");
const classNames = require("classnames");

export default ({ open, ...props }) => {
  return (
    <div
      className={open ? ["burger-menu open"] : ["burger-menu"]} {...props}>
      <div
        className={'bar1'}
        key="b1" />
      <div
        className={'bar2'}
        key="b2" />
      <div
        className={'bar3'}
        key="b3"
      />
    </div>
  );
};
