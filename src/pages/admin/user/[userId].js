import React from 'react';
import LayoutCustom from '@/layout';
import ContentCustom from '@/layout/content';
import { withRouter, useRouter } from 'next/router'
import Head from 'next/head';

const UserPage = (props) => {
  const router = useRouter();
  const userId = router?.query?.userId;
  console.log('router: ', router);
  return (
    <div>
      <Head>
        <title>{`Admin -> User Page -> ${userId}`}</title>
      </Head>
      <LayoutCustom >
        <ContentCustom type={`User Page -> ${userId}`} />
      </LayoutCustom>
    </div>
  );
}

export default withRouter(UserPage);
