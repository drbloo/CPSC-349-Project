import './header.css';
import logo from '../../data/images/logos/logo.png';
import Config from '../../config';
import GuestNav from './guest_nav/guestNav';
import UserNav from './user_nav/userNav';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = ({ loginState, setLandingLoginState }) => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(loginState);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (setLandingLoginState) setLandingLoginState(login);

    if (!login.loggedIn) return;

    const getUser = async () => {
      try {
        const res = await fetch(`${Config.URL_ACCOUNTS}/${login.userId}`);

        if (!res.ok) throw new Error('Error fetching user data');

        const data = await res.json();

        setUser(data.data.user);
      } catch (err) {
        console.error(err.message);
      }
    };

    getUser();
  }, [login]);

  return (
    <div className='header-container'>
      <div className='header-img-container'>
        <img
          src={logo}
          className='header-logo-img'
          alt='website logo'
          onClick={() => navigate('/', { state: { loginState: login } })}
        />
      </div>
      {login.loggedIn ? (
        <UserNav user={user} setLogin={setLogin} />
      ) : (
        <GuestNav loginState={login} />
      )}
    </div>
  );
};

export default Header;
