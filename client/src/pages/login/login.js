import './login.css';
import Config from '../../config';
import Header from '../header/header';
import ErrorMsg from '../register/components/errorMsg';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFormValues = {
    email: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userId, setUserId] = useState('');

  const onChangeHandler = (e) => {
    let { name, value } = e.target;
    value = name === 'agreement' ? e.target.checked : value;

    setFormValues({ ...formValues, [name]: value });
  };

  const getAllUser = async () => {
    try {
      const res = await fetch(Config.URL_ACCOUNTS);

      if (!res.ok) return new Error('Error loading account data');

      const data = await res.json();

      return data.data.user;
    } catch (err) {
      console.error(err.meesage);
    }
  };

  const isEmpty = (value) => {
    return value.trim() === '';
  };

  const validEmail = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return String(email).toLowerCase().match(regex);
  };

  const hasUser = async (email, password) => {
    const users = await getAllUser();

    const user = users.find((user) => {
      if (user.email === email && user.password === password) return user;
    });

    if (user) {
      setUserId(user._id);
      return true;
    }

    return false;
  };

  const validateForm = async (values) => {
    const errors = {};

    //Validate email
    if (isEmpty(values.email)) errors.email = 'Cannot be empty';
    else if (!validEmail(values.email)) errors.email = 'Invalid email format';

    //Validate password
    const passwordEmpty = isEmpty(values.password);
    if (passwordEmpty) errors.password = 'Cannot be empty';

    //Validate login credential
    if (Object.keys(errors).length === 0) {
      const user = await hasUser(values.email, values.password);
      if (!user) {
        errors.email = 'Incorrect email or password';
        errors.password = 'Incorrect email or password';
      }
    }

    return errors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormErrors(await validateForm(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (!isSubmit || Object.keys(formErrors).length !== 0) {
      setIsSubmit(false);
      return;
    }

    navigate('/', {
      state: {
        loginState: {
          loggedIn: true,
          userId,
        },
      },
    });
  }, [isSubmit]);

  return (
    <div>
      <Header loginState={location.state.loginState} />
      <div className='login-form-main-container'>
        <div className='login-form-title-container'>
          <div className='login-form-title-main-container'>
            <p className='register-form-title-dash'>
              &mdash;&mdash;&mdash;&mdash;
            </p>
            <p className='register-form-title-text'>Login</p>
            <p className='register-form-title-dash'>
              &mdash;&mdash;&mdash;&mdash;
            </p>
          </div>
          <p className='register-form-title-sentence'>
            Log in and start shopping !
          </p>
        </div>

        <form className='login-form-container'>
          <div className='register-form-input'>
            <label htmlFor='register-form-email'>Email</label>
            <input
              id='register-form-first-email'
              className='register-form-email'
              placeholder='me@example.com'
              type='text'
              name='email'
              value={formValues.email}
              onChange={onChangeHandler}
            />
            <ErrorMsg message={formErrors.email} hidden={!formErrors.email} />
          </div>
          <div className='register-form-input'>
            <label htmlFor='register-form-password'>Password</label>
            <input
              id='register-form-password'
              className='register-form-password'
              placeholder='Password'
              type='password'
              name='password'
              value={formValues.password}
              onChange={onChangeHandler}
            />
            <ErrorMsg
              message={formErrors.password}
              hidden={!formErrors.password}
            />
          </div>
          <button className='btn-register-form-submit' onClick={submitHandler}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
