import React, { useEffect } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import Calendar from '../components/Calendar';
import MainHeader from '../components/MainHeader';

const Global = createGlobalStyle`
  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    min-height: 100vh;
  }
`;

const BackgroundImg = styled.div`
  border: 0;
  padding: 0; 
  background-image: url('https://t1.daumcdn.net/cfile/tistory/26AEB633597644FE1E');
  height: 100%;
  background-position: center;
  background-size: cover;
`;

const Main = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);

  // 로그인 안한 사용자 -> 로그인 페이지 이동(/)
  useEffect(() => {
    if (!me) {
      router.push('/');
    }
  }, [me]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Feelings</title>
      </Head>
      <BackgroundImg>
        <Global />
        <MainHeader me={me} />
        <Row justify="space-around" align="middle">
          <Col xs={24} md={16}>
            <Calendar />
          </Col>
        </Row>
      </BackgroundImg>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Main;
