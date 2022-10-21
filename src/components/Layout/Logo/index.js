/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import Image from 'next/image';

const propTypes = {
	// className: PropTypes.string,
};

const defaultProps = {
	// className: {},
};

const Logo = (props) => {
	const { ...attrs } = props;

	return (
		<Image
			width={120}
			height={120}
			{...attrs}
			src="/images/logo_cbbank.jpg"
			alt="Logo"
		/>
	);
};

Logo.propTypes = propTypes;

Logo.defaultProps = defaultProps;

export default Logo;
