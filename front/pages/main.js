import React, { useEffect } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);

  // 로그인 안한 사용자 -> 로그인 페이지 이동(/)
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
      return;
    }
  }, [isLoggedIn]);

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
