import React, { useCallback } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { Calendar } from 'antd';

const Global = createGlobalStyle`
  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    height: 100%;
  }
`;

const BackgroundImg = styled.div`
  border: 0;
  padding: 0; 
  background-image: url('https://t1.daumcdn.net/cfile/tistory/26AEB633597644FE1E');
  min-height: 100%;
  background-position: center;
  background-size: cover;
`;

const Main = () => {
  const onPanelChange = useCallback((value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Feelings</title>
      </Head>
      <BackgroundImg>
        <Global />
        <Calendar onPanelChange={onPanelChange} />
      </BackgroundImg>
    </>
  );
};

export default Main;