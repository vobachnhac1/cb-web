import React from 'react';
import LayoutCustom from '@/layout';
import ContentCustom from '@/layout/content';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <div>
      <Head>
        <title>{'Admin Page'}</title>
      </Head>
      <LayoutCustom>
        <ContentCustom type={'AdminPage'} />
      </LayoutCustom>
    </div>
  );
};

export default AdminPage;
