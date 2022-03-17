import React from 'react';
import LayoutCustom from '@/layout';
import ContentCustom from '@/layout/content';
import { withRouter } from 'next/router'
import Head from 'next/head';

const UserPage = (props) => {
  return (
    <div>
      <Head>
        <title>{'Admin -> User Page'}</title>
      </Head>
      <LayoutCustom >
        <ContentCustom type={'UserPage'} />
      </LayoutCustom>
    </div>
  );
}

export default withRouter(UserPage);
