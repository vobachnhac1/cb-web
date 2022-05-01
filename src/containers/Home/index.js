/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
require("./style.module.less");
import Header from '@/components/Head';
import Layout from '@/layout';
import { useRouter } from 'next/router';
import { PathTitle } from "@/constants/url-name";

export default function LayoutHome(props) {
  const { children } = props;
  const router = useRouter()
  let path = router.pathname;
  if (path.includes("/admin/wheel-detail/", 0)) {
    path = '/admin/wheel-detail/';
  }
  return (
    <>
      <Header title={PathTitle[`${path}`]} />
      <Layout>
        {children}
      </Layout>
    </>
  )
}

