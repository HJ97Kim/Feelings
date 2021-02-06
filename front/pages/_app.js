import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
// 공통 부분
const Feelings = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Feelings</title>
      </Head>
      <Component />
    </>
  );
};

Feelings.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default Feelings;