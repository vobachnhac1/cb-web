
const withAntdLess = require('next-plugin-antd-less');
// import withAntdLess from 'next-plugin-antd-less';
module.exports = {
  // i18n,
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
};


module.exports = withAntdLess({
  reactStrictMode: true,
  // You can directly change the antd less variables here
  // modifyVars: { '@primary-color': '#f200ff' },
  // Or better still you can specify a path to a file
  lessVarsFilePath: './src/styles/variables.less',
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return config;
  },
});
