/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import Header from '@/components/Head';
import Layout from '@/layout';
import ForgotPassword from '@/containers/Auth/ForgotPassword'
export default function Home() {
  return (
    <>
      <Header />
      <Layout>
        <ForgotPassword />
      </Layout>
    </>
  )
}
