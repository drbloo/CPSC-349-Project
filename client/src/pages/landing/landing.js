import './landing.css';

import Header from '../header/header';
import ItemGrid from './components/item-grid/itemGrid';
import Categories from './components/categories/categories';

import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Landing = () => {
  const location = useLocation();

  /* const defaultLogin = { loggedIn: false, userId: '' };

  const [loginState, setLoginState] = useState(defaultLogin);

  if (location.state) {
    setLoginState({
      loggedIn: location.state.loginState.loggedIn,
      userId: location.state.loginState.userId,
    });
  } */

  const defaultLogin = { loggedIn: false, userId: '' };

  if (location.state) {
    defaultLogin.loggedIn = location.state.loginState.loggedIn;
    defaultLogin.userId = location.state.loginState.userId;
  }

  const [loginState, setLoginState] = useState(defaultLogin);

  const onContainerClick = (e) => {
    const userNameContainerEl = e.target.closest(
      '.nav-link-name-container-main'
    );

    if (userNameContainerEl) return;

    const userInfoList = document.querySelector(
      '.nav-link-user-info-container'
    );

    if (!userInfoList) return;

    userInfoList.className = 'nav-link-user-info-container';
  };

  return (
    <div>
      <div className='landing-container' onClick={onContainerClick}>
        <Header loginState={loginState} setLandingLoginState={setLoginState} />
        <div className='landing-main-content-container'>
          <ItemGrid loginState={loginState} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
