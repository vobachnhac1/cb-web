/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import Header from '@/components/Head';
import Login from '@/containers/Auth/Login';
import { useRouter } from 'next/router';
import { PathTitle } from "@/constants/url-name";
import { useDispatch, useSelector } from 'react-redux';
import { getters } from '@/redux/global';

export default function LoginPage() {
  const router = useRouter();
	const dispatch = useDispatch();
	const isAuth=  useSelector(getters.getAccessToken)
	React.useEffect(() => {
		if (isAuth) {
				Router.push('/home');
		}
	}, [isAuth]);

  return (
    <>
      <Header title={PathTitle[`${router.pathname}`]} />
      <Login />
    </>
  )
}
