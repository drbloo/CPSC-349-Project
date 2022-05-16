import './userNav.css';

import { useRef } from 'react';

const UserNav = ({ user, setLogin }) => {
  const userInfoRef = useRef();

  const onNameClick = () => {
    let className = userInfoRef.current.className;
    className =
      className === 'nav-link-user-info-container'
        ? 'nav-link-user-info-container nav-link-user-info-container-open'
        : 'nav-link-user-info-container';

    userInfoRef.current.className = className;
  };

  const logOutHandler = () => {
    setLogin({
      loggedIn: false,
      userId: '',
    });
  };

  return (
    <nav className='nav-link-container-user'>
      <div className='nav-link-name-container-main' onClick={onNameClick}>
        <div className='nav-link-name-container'>
          <p className='nav-link-user-name-text'>{`Hello, ${user.first_name}`}</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='nav-link-user-icon-small'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>

        <div ref={userInfoRef} className='nav-link-user-info-container'>
          <div className='user-info-list'>
            <div className='user-info-list-btn'>
              <p className='noselect'>Account</p>
            </div>
            <div className='user-info-list-btn'>
              <p className='noselect'>Orders</p>
            </div>
            <div className='user-info-list-btn'>
              <p className='noselect'>Listing</p>
            </div>
            <div className='user-info-list-btn' onClick={logOutHandler}>
              <p className='noselect'>Log Out</p>
            </div>
          </div>
        </div>
      </div>
      <div className='nav-link-cart-container'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='nav-link-user-icon-cart'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      </div>
    </nav>
  );
};

export default UserNav;
