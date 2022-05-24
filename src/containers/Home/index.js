/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import Header from '@/components/Head';
import Layout from '@/layout';

export default function LayoutHome(props) {
  const { children } = props;
  return (
    <>
      <Header />
      <Layout>
        {children}
      </Layout>
    </>
  )
}

