/* eslint-disable import/no-extraneous-dependencies */
/* --------------------------------------------------------
* Author Nhac Vo
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
*
* Created: 2022-03-10 12:29:42
*------------------------------------------------------- */
const path = require('path');
const webpack = require('webpack');

const withAntdLess = require('next-plugin-antd-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const loadEnvConfig = require('./bin/env');
loadEnvConfig();

const antdVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, 'src/styles/variables.less'), 'utf8'));

module.exports = withBundleAnalyzer(withAntdLess({
	// modifyVars: {
	// 	'hack': 'true;@import "~antd/lib/style/themes/compact.less";',
	// 	...antdVariables,
	// },
	lessVarsFilePath: './src/styles/variables.less',
	lessVarsFilePathAppendToEndOfContent: true,
	// optional https://github.com/webpack-contrib/css-loader#object
	cssLoaderOptions: {
		modules: {
			localIdentName: process.env.NODE_ENV !== 'production' ? '[folder]__[local]__[hash:4]' : '[hash:8]',
		},
	},

	// Other Config Here...

	webpack(config) {
		config.module.rules.push({
			test: /\.md$/,
			use: 'frontmatter-markdown-loader',
		});

		config.plugins.push(
			new webpack.EnvironmentPlugin({ ...process.env, 'THEME': { ...antdVariables } }),
		);
		config.infrastructureLogging = { debug: /PackFileCache/ }

		return config;
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
}));
