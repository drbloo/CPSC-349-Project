import './guestNav.css';

import { useNavigate } from 'react-router-dom';

const GuestNav = ({ loginState }) => {
  const navigate = useNavigate();

  const onRegisterClick = () => {
    navigate('/register', { state: { loginState } });
  };

  const onLoginClick = () => {
    navigate('/login', { state: { loginState } });
  };

  return (
    <nav className='nav-link-container-guest'>
      <button className='btn-register' onClick={onRegisterClick}>
        Register
      </button>
      <button className='btn-login' onClick={onLoginClick}>
        Log In
      </button>
    </nav>
  );
};

export default GuestNav;
