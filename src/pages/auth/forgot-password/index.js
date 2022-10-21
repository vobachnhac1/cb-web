/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import Header from '@/components/Head';
import ForgotPassword from '@/containers/Auth/ForgotPassword';
import { useRouter } from 'next/router';
import { PathTitle } from "@/constants/url-name";

export default function ForgotPasswordPage() {
  const router = useRouter()
  return (
    <>
      <Header title={PathTitle[`${router.pathname}`]} />
      <ForgotPassword />
    </>
  )
}
