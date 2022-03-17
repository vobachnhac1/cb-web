import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter } from '@/stores/global/actions';
import Link from 'next/link';
import { getStateLoadPage } from '@/stores/global/getter';
// import { Button, Space, DatePicker, Card } from 'antd';
// import { CiCircleFilled } from '@ant-design/icons';
// import styles from '@/styles/Home.module.css';

const Counter = () => {
  const globalState = useSelector(getStateLoadPage);
  const dispatch = useDispatch();

  return (
    <>
      <h1>GLOBAL COUNTER {globalState}</h1>
      <button onClick={() => dispatch(incrementCounter(globalState))}>
        Increment +
      </button>
      {'  '}
      <button onClick={() => dispatch(decrementCounter(globalState))}>
        Decrement -
      </button>
      <br />
      <br />
      <p>
        Try to reload this page or open a new tab
        <br />
        or view this page another time.
        <br />
        You will see the same value everytime.
        <br />
        Because the global state is persistent
        <br />
        and saved in the localstorage!
      </p>

      <Link href='/home'>
        <a>Go to Counter Page</a>
      </Link>
      <br />
      <Link href='/ssg'>
        <a>Go to a getStaticProps used page</a>
      </Link>
      <br />
      <Link href='/ssr'>
        <a>Go to a getServerSideProps used Page</a>
      </Link>
    </>
  );
  // const onChange = () => {};
  // return (
  //   <div style={{ padding: 100 }}>
  //     <Space direction='vertical'>
  //       <Button type='primary'>Primary Button</Button>
  //       <Button type='ghost'>Ghost Button</Button>
  //       <DatePicker onChange={onChange} />
  //       <CiCircleFilled />
  //     </Space>
  //   </div>
  // );
};

export default Counter;
