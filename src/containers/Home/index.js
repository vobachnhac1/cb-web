/* --------------------------------------------------------
* Author Võ Bách Nhạc
* Email vonhac.20394@gmail.com
* Phone 0906.918.738
* Created: 2022-04-07
*------------------------------------------------------- */
import React,{useEffect} from 'react'
require("./style.module.less");
import Header from '@/components/Head';
import Layout from '@/layout';
import { useRouter } from 'next/router';
import { PathTitle } from "@/constants/url-name";
import { getters } from '@/redux/global';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

export default function LayoutHome(props) {
  const { children } = props;
  const router = useRouter()
  let path = router.pathname;
  if (path.includes("/admin/wheel-detail/", 0)) {
    path = '/admin/wheel-detail/';
  }
  const isAuth=  useSelector(getters.getAccessToken)
	useEffect(() => {
		if (!isAuth) {
			router.replace('/');
		}
	}, [isAuth]);
  if(!isAuth){
    return (
      <div>
      <Spin tip="Loading..." style={{flex: 1, justifyContent:'center',paddingTop:'20%', alignSelf:'center', flexDirection:'column', height:'100vh', width:'100vw'}}>
        </Spin>
    </div>
    ) 
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

