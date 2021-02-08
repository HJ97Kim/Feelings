import React, { useState } from 'react';
import Main from '../components/main';
import Login from '../components/login';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? <Main setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
};

export default Home;