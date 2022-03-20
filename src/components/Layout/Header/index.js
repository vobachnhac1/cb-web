/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';

import classes from './style.module.less';

const propTypes = {
	children: PropTypes.node,
	style: PropTypes.object,
};

const defaultProps = {
	children: null,
	style: {},
};

const Header = (props) => {
	const { children, style } = props;

	return (
		<div className={classes.headerWrapper}>
			<Layout.Header className={classes.header} style={style}>
				{children}
			</Layout.Header>
		</div>
	);
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
