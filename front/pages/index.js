import React from 'react';
import { useSelector } from 'react-redux';

import Main from '../components/main';
import Login from '../components/login';


const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  
  return (
    <>
      {isLoggedIn ? <Main /> : <Login />}
    </>
  );
};

export default Home;