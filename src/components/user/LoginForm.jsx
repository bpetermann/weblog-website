import React, { useState } from 'react';
import classes from './LoginForm.module.css';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';

const LoginForm = ({ setFormData, onSubmit, email, password }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <h1>Login</h1>
      <main>
        <form className={classes['form']} onSubmit={onSubmit}>
          <input
            type='email'
            className={classes['emailInput']}
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChangeHandler}
          />

          <div className={classes['passwordInputDiv']}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={classes['passwordInput']}
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChangeHandler}
            />
            <AiOutlineEye
              onClick={() => setShowPassword((prevState) => !prevState)}
              size={32}
              className={classes['showPassword']}
            />
          </div>
          <div className={classes['button-container']}>
            <Button>Login</Button>
            <Link to='/register' className={classes['register-link']}>
              Sign Up
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;
