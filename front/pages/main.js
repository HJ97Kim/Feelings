import React, { useEffect } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

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

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);
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
        <MainHeader />
        <Row justify="space-around" align="middle">
          <Col xs={24} md={16}>
            <Calendar />
          </Col>
        </Row>
      </BackgroundImg>
    </>
  );
};

export default Main;
