/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-03-10
*------------------------------------------------------- */
import React, {useEffect } from 'react';
import LayoutHome from '@/containers/Home';
import { getters } from '@/redux/global';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
export default function Home() {
  const router = useRouter();
  const isAuth=  useSelector(getters.getAccessToken)
	React.useEffect(() => {
		if (!isAuth) {
			router.replace('/');
		}
	}, [isAuth]);

  return (
    <LayoutHome />
  )
}
