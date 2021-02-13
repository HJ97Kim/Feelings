import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import withReduxSaga from 'next-redux-saga';

import wrapper from '../store/configureStore';
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

export default wrapper.withRedux(withReduxSaga(Feelings));
