import './register.css';
import Config from '../../config';
import Header from '../header/header';
import ErrorMsg from './components/errorMsg';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChangeHandler = (e) => {
    let { name, value } = e.target;
    value = name === 'agreement' ? e.target.checked : value;

    setFormValues({ ...formValues, [name]: value });
  };

  const getAllEmail = async () => {
    try {
      const res = await fetch(Config.URL_ACCOUNTS);

      if (!res.ok) return new Error('Error loading account data');

      const data = await res.json();

      return data.data.user;
    } catch (err) {
      console.error(err.meesage);
    }
  };

  const emailExists = async (email) => {
    const users = await getAllEmail();
    return users.some((user) => user.email === email);
  };

  const isEmpty = (value) => {
    return value.trim() === '';
  };

  const validEmail = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return String(email).toLowerCase().match(regex);
  };

  const validateForm = async (values) => {
    const errors = {};

    //Validate first name
    if (isEmpty(values.firstName)) errors.firstName = 'Cannot be empty';

    //Validate last name
    if (isEmpty(values.lastName)) errors.lastName = 'Cannot be empty';

    //Validate email
    if (isEmpty(values.email)) errors.email = 'Cannot be empty';
    else if (!validEmail(values.email)) errors.email = 'Invalid email format';
    else if (await emailExists(values.email))
      errors.email = 'Email already exist';

    //Validate password
    const passwordEmpty = isEmpty(values.password);
    if (passwordEmpty) errors.password = 'Cannot be empty';

    //Validate confirm password
    const confirmPasswordEmpty = isEmpty(values.confirmPassword);
    if (confirmPasswordEmpty) errors.confirmPassword = 'Cannot be empty';

    //validate passwords match
    if (!passwordEmpty && !confirmPasswordEmpty) {
      if (values.password !== values.confirmPassword) {
        errors.password = 'Passwords do not match';
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    //Validate agreement
    if (!values.agreement) errors.agreement = 'You must accept the agreements';

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

    const newUser = {
      email: formValues.email,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      password: formValues.password,
      dob: '2000-10-10',
    };

    const createAccount = async (user) => {
      try {
        const option = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        };

        const res = await fetch(Config.URL_ACCOUNTS, option);

        if (!res.ok) throw new Error('Error creating account');

        const data = await res.json();

        navigate('/', {
          state: {
            loginState: {
              loggedIn: true,
              userId: data.data.user._id,
            },
          },
        });
      } catch (err) {
        setIsSubmit(false);
        console.error(err.message);
      }
    };

    createAccount(newUser);
  }, [isSubmit]);

  return (
    <div>
      <Header loginState={location.state.loginState} />
      <div className='register-form-main-container'>
        <div className='register-form-title-container'>
          <div className='register-form-title-main-container'>
            <p className='register-form-title-dash'>
              &mdash;&mdash;&mdash;&mdash;
            </p>
            <p className='register-form-title-text'>Register</p>
            <p className='register-form-title-dash'>
              &mdash;&mdash;&mdash;&mdash;
            </p>
          </div>
          <p className='register-form-title-sentence'>
            Create an account and start shopping !
          </p>
        </div>

        <form className='register-form-container'>
          <div className='register-form-name-container'>
            <div className='register-form-input'>
              <label htmlFor='register-form-first-name'>First Name</label>
              <input
                id='register-form-first-name'
                className='register-form-first-name'
                placeholder='First Name'
                type='text'
                name='firstName'
                value={formValues.firstName}
                onChange={onChangeHandler}
              />
              <ErrorMsg
                message={formErrors.firstName}
                hidden={!formErrors.firstName}
              />
            </div>
            <div className='register-form-input'>
              <label htmlFor='register-form-last-name'>Last Name</label>
              <input
                id='register-form-last-name'
                className='register-form-last-name'
                placeholder='Last Name'
                type='text'
                name='lastName'
                value={formValues.lastName}
                onChange={onChangeHandler}
              />
              <ErrorMsg
                message={formErrors.lastName}
                hidden={!formErrors.lastName}
              />
            </div>
          </div>
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
          <div className='register-form-input'>
            <label htmlFor='register-form-password-confirm'>
              Confirm Password
            </label>
            <input
              id='register-form-password-confirm'
              className='register-form-password-confirm'
              placeholder='Confirm Password'
              type='password'
              name='confirmPassword'
              value={formValues.confirmPassword}
              onChange={onChangeHandler}
            />
            <ErrorMsg
              message={formErrors.confirmPassword}
              hidden={!formErrors.confirmPassword}
            />
          </div>
          <div
            className={`register-form-agreement-container ${
              formErrors.agreement
                ? 'register-form-agreement-container-error'
                : ''
            }`}
          >
            <input
              className='register-form-input-agreement'
              type='checkbox'
              name='agreement'
              value={formValues.agreement}
              onChange={onChangeHandler}
            />
            <div>
              <span>I accept the </span>
              <a href='#'>Terms of Use</a>
              <span> & </span>
              <a href='#'> Privacy Policy</a>
            </div>
          </div>
          <button className='btn-register-form-submit' onClick={submitHandler}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
