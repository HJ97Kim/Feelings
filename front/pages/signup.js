import React from 'react';
import Head from 'next/head';

import StartLayout from '../components/StartLayout';

const Signup = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | Feelings</title>
      </Head>
      <StartLayout>
        <div>회원가입 페이지</div>
      </StartLayout>
    </>
  );
};

export default Signup;