import LayoutCustom from '@/layout';
import ContentCustom from '@/layout/content';
import Head from 'next/head';

const EventPage = () => {
  return (
    <div>
      <Head>
        <title>{'Event Page'}</title>
      </Head>
      <LayoutCustom>
        <ContentCustom type={'EventPage'} />
      </LayoutCustom>
    </div>
  );
};

export default EventPage;
