/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

import METADATA from '@/constants/metadata';

import Meta from './Meta';

const propTypes = {
	title: PropTypes.string.isRequired,
};

const defaultProps = {
	title: '',
};

const HeadShare = (props) => {
	const { title, ...attr } = props;

	return (
		<Head>
			<title>{(title ? title + ' | ' : '') + METADATA.APP_NAME}</title>
			<Meta {...attr} />
		</Head>
	);
};

HeadShare.propTypes = propTypes;

HeadShare.defaultProps = defaultProps;

export default HeadShare;
