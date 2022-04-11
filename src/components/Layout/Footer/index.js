/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import * as classes from './style.module.less';

const Footer = (props) => {
	// const { } = props;

	return (
		<footer className={[classes.footer]}>
			<div>
				<strong className="text-primary">cb-demo</strong>
				<span> 2021 © All Rights Reserved.</span>
			</div>
			<div className="ml-auto">
				<span>Powered by </span>
				<strong className="text-primary">Nhac Vo</strong>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	// classes: PropTypes.object.isRequired,
};

Footer.defaultProps = {
	// classes: {},
};

export default Footer;
