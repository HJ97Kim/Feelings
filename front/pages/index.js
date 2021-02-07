import React, { useState } from 'react';
import Main from '../components/main';
import Login from '../components/login';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? <Main /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
};

export default Home;