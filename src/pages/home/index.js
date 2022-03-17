import LayoutCustom from '@/layout';
import ContentCustom from '@/layout/content';
import Head from 'next/head';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>{'Home Page'}</title>
      </Head>
      <LayoutCustom>
        <ContentCustom type={'HomePage'} />
      </LayoutCustom>
    </div>
  );
};

export default HomePage;
